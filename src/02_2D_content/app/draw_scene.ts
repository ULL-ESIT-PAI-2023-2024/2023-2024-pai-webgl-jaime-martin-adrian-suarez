/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc Draws the scene.
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
function defineModelViewMatrix(): mat4 {
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix,    // destination matrix
    modelViewMatrix,    // matrix to translate
    [-0.0, 0.0, -6.0]   // amount to translate. (x, y, z)
  );
  return modelViewMatrix;
}

/**
 * @description Draws the scene.
 *
 * @param gl The WebGL context.
 * @param programInfo The information about the program.
 * @param buffers The buffer information.
 */
export default function drawScene(gl: WebGLRenderingContext, programInfo: ProgramInformation, buffers: BufferInformation) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque. (r, g, b, a)
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Get matrixs used for the camera position
  const projectionMatrix = defineProjectionMatrix(gl);
  const modelViewMatrix = defineModelViewMatrix();

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(gl, buffers, programInfo);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix as Float32Array
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix as Float32Array
  );

  // Draw the square, with offset 0, and 4 vertices
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * @description Tell WebGL how to pull out the positions from the position
 * buffer into the vertexPosition attribute.
 *
 * @param gl The WebGL context
 * @param buffers  The buffer information
 * @param programInfo The information about the program
 */
function setPositionAttribute(gl: WebGLRenderingContext,
  buffers: BufferInformation, programInfo: ProgramInformation): void {
  const numComponents = 2;    // pull out 2 values per iteration
  const type = gl.FLOAT;      // the data in the buffer is 32bit floats
  const normalize = false;    // don't normalize
  const stride = 0;           // how many bytes to get from one set of values to the next

  // 0 -> use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}