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

import { BufferInformation } from './types';

// <------------------------------ This is the new code ------------------------------>

export default function initBuffers(gl: WebGLRenderingContext): BufferInformation {
  const vertex = initVertexBuffer(gl);
  const textureCoord = initTextureBuffer(gl);
  const index = initIndexBuffer(gl);
  return {
    vertex,
    textureCoord,
    index,
  };
}

/**
 * @description Creates a js array with four vertices, one for each corner of the square.
 * Then creates a WebGLBuffer and fills it with the position data.
 *
 * @param gl The WebGL context to use
 * @returns A WebGLBuffer containing the position data
 */
function initVertexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  // Create a buffer for the square's positions.
  const vertexBuffer = gl.createBuffer() as WebGLBuffer;

  // Select the vertexBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Array with (x, y z) coordinates for each vertex
  const vertices = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  return vertexBuffer;
}

/**
 * @description Creates indexes arrays that define each face like a pair of
 *   triangles, specifying each triangle's vertices as an index into the cube's
 *   vertex arrays.
 * Thus the cube is described as a collection of 12 triangles.
 *
 * @param gl The WebGL context to use
 * @returns A WebGLBuffer containing the data for the indexes of the cube
 */
function initIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const indexBuffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indexes = [
    // front
    0, 1, 2,
    0, 2, 3,

    // back
    4, 5, 6,
    4, 6, 7,

    // top
    8, 9, 10,
    8, 10, 11,

    // bottom
    12, 13, 14,
    12, 14, 15,

    // right
    16, 17, 18,
    16, 18, 19,

    // left
    20, 21, 22,
    20, 22, 23,
  ];

  // Now send the element array to GL

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indexes),
    gl.STATIC_DRAW
  );

  return indexBuffer;
}

// -----------------------------> This is the new code <----------------------------- //

/**
 * @description Creates a WebGL buffer to store the coordinates for each face
 * and bind the buffer as the current ARRAY_BUFFER.
 *
 * @param gl The WebGL context to use
 * @returns A WebGLBuffer containing the texture coordinates for the cube
 */
function initTextureBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const textureCoordBuffer = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates: number[] = [
    // Front
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
  ];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoordinates),
    gl.STATIC_DRAW
  );

  return textureCoordBuffer;
}