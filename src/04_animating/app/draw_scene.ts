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
 * @description Define the perspective matrix, a special matrix that is used to simulate the distortion of perspective in a camera.
 * @param gl The WebGL context
 */
function definePerspectiveMatrix(gl: WebGLRenderingContext): mat4 {
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
 * @description Define the model view matrix, a special matrix that is used to simulate the position and orientation of the camera.
 * @returns The model view matrix.
 */
function defineModelViewMatrix(): mat4 {
  const modelViewMatrix = mat4.create();
  mat4.translate(
    modelViewMatrix,    // destination matrix
    modelViewMatrix,    // matrix to translate
    [-0.0, 0.0, -6.0]   // amount to translate. (x, y, z)
  );
  return modelViewMatrix;
}

/**
 * @description Rotate the camera.
 * @param modelViewMatrix The model view matrix.
 * @param cameraRotation The amount to rotate in radians.
 */
function rotateCamera(modelViewMatrix: mat4, cameraRotation: number): void {
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cameraRotation, // amount to rotate in radians
    [0, 0, 1]
  ); // axis to rotate around
}

/**
 * @description Draw the scene with the specified WebGL context, program information, buffers and square rotation.
 * @param gl 
 * @param programInfo 
 * @param buffers 
 * @param cameraRotation 
 */
export default function drawScene(gl: WebGLRenderingContext, programInfo: ProgramInformation, buffers: BufferInformation, cameraRotation: number) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque. (r, g, b, a)
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 const projectionMatrix = definePerspectiveMatrix(gl);
 const modelViewMatrix = defineModelViewMatrix();
 
  rotateCamera(modelViewMatrix, cameraRotation);

  // Tell WebGL how to pull out the positions and colors from the buffers
  setAttribute(gl, buffers.vertex, programInfo.attribLocations.vertexPosition, 2);
  setAttribute(gl, buffers.color, programInfo.attribLocations.vertexColor, 4);

  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  // Draw the square, with offset 0, and 4 vertices
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
function setAttribute(gl: WebGLRenderingContext, buffer: WebGLBuffer,
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