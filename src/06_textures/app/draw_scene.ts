/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  draw_scene.ts: This file contains the code to draw the scene.
 *
 */

import { BufferInformation, ProgramInformation } from './types';
import { mat4 } from 'gl-matrix';

/**
 * @desc The projection matrix. This matrix is used to simulate the distortion of perspective in a camera.
 * @param gl The WebGL context.
 * @returns The projection matrix.
 */
function defineProjectionMatrix(gl: WebGLRenderingContext): mat4 {

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.width / gl.canvas.height;
  const zNear = 0.1;      // minimum distance from camera to visualized objects
  const zFar = 100.0;     // maximum distance from camera to visualized objects
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  return projectionMatrix;
}

/**
 * @desc The model view matrix. This matrix is used to simulate the position and orientation of the camera.
 * @param gl The WebGL context.
 * @returns The model view matrix.
 */
function defineModelViewMatrix(cameraRotation: number): mat4 {
  const modelViewMatrix = mat4.create();

  mat4.translate(
    modelViewMatrix,    // destination matrix
    modelViewMatrix,    // matrix to translate
    [-0.0, 0.0, -6.0]   // amount to translate. (x, y, z)
  );

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cameraRotation, // amount to rotate in radians
    [0, 0, 1]
  ); // axis to rotate around (Z)
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cameraRotation * 0.7, // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (Y)
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cameraRotation * 0.3, // amount to rotate in radians
    [1, 0, 0]
  ); // axis to rotate around (X)
  return modelViewMatrix;
}

/**
 * @description Tell WebGL how to pull out the attribute from the buffer
 *  into the attribute given by the index.
 *
 * @param gl The WebGL context
 * @param buffer  The buffer information
 * @param vertexIndex The index of the attribute
 * @param numComponents How many values are pulled out per iteration
 */
function setPositionAttribute(gl: WebGLRenderingContext, buffer: WebGLBuffer,
  vertexIndex: number, numComponents: number): void {
  const type = gl.FLOAT;      // the data in the buffer is 32bit floats
  const normalize = false;    // don't normalize
  const stride = 0;           // how many bytes to get from one set of values to the next

  // 0 -> use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    vertexIndex,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(vertexIndex);
}

/**
 * @description Draw the scene.
 * @param gl The WebGL context.
 * @param programInfo The program information.
 * @param buffers The buffer information.
 * @param texture The texture.
 * @param cameraRotation The camera rotation.
 */
export default function drawScene(gl: WebGLRenderingContext,
  programInfo: ProgramInformation, buffers: BufferInformation, texture: WebGLTexture ,cameraRotation: number) {
    
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque. (r, g, b, a)
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Get matrixs used for the camera position
  const projectionMatrix = defineProjectionMatrix(gl);
  const modelViewMatrix = defineModelViewMatrix(cameraRotation);

  // Tell WebGL how to pull out the positions and colors from the buffers
  setPositionAttribute(gl, buffers.vertex, programInfo.attribLocations.vertexPosition, 3);
  setPositionAttribute(gl, buffers.textureCoord as WebGLBuffer, programInfo.attribLocations.textureCoord as number, 2);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix as Float32List
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix as Float32List
  );

  // Tell WebGL we want to add a texture to a texture unit
  gl.activeTexture(gl.TEXTURE0);

   // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);
 
  // Bound all texture units to the texture in unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler as WebGLUniformLocation, 0);

  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
}