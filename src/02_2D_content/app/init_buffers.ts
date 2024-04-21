/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  init_buffers.ts: This file contains the code to initialize the buffers.
 *
 */

import { BufferInformation } from './types';

/**
 * @desc Initializes the buffers.
 * @param gl WebGLRenderingContext to use.
 * @returns BufferInformation with the buffers.
 */
export default function initBuffers(gl: WebGLRenderingContext): BufferInformation {
  return {
    vertex: initVertexBuffer(gl),
  };
}

/**
 * @desc Initializes the vertex buffer.
 * @param gl WebGLRenderingContext to use.
 * @returns WebGLBuffer with the vertex buffer.
 */
function initVertexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  // Create a buffer for the square's positions.
  const vertexBuffer = gl.createBuffer() as WebGLBuffer;

  // Select the vertexBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Now create an array of positions for the square.
  const vertices: number[] = [ // x, y
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  return vertexBuffer;
}