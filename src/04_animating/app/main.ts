/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  04-animation.ts: This file contains the code to initialize the WebGL context, clear the canvas and draw a square.
 *
 */

import { BufferInformation, ProgramInformation, createProgramInfo } from './types';
import initBuffers from './init_buffers';
import createGLContext from './context';
import createShaderProgram from './shaders';
import { startAnimation } from './animation';

/**
 * @desc Main function that initializes the WebGL context, creates the shader program, initializes the buffers and starts the animation.
 * @returns Promise<void> cr
 */
async function main(): Promise<void> {
  let gl = createGLContext('WebGLCanvas');

  const shaderProgram: WebGLProgram = await createShaderProgram(gl);
  const programInfo: ProgramInformation = createProgramInfo(gl, shaderProgram);
  const buffers: BufferInformation = initBuffers(gl);

  startAnimation(gl, programInfo, buffers);
}

main();