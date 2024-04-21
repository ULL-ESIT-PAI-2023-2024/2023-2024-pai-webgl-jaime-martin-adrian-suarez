/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  06_textures.ts: This file contains the main function of the project.
 *
 */

import { BufferInformation, ProgramInformation, createProgramInfo } from './types';
import initBuffers from './init_buffers';
import createGLContext from './context';
import createShaderProgram from './shaders';
import { startAnimation } from './animation';
import { loadTexture } from './texture';

async function  main(): Promise<void> {
  let gl = createGLContext('WebGLCanvas');

  const shaderProgram: WebGLProgram = await createShaderProgram(gl);
  const programInfo: ProgramInformation = createProgramInfo(gl, shaderProgram);
  const buffers: BufferInformation = initBuffers(gl);

  const texture: WebGLTexture = loadTexture(gl, "image/dog.png");

  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  startAnimation(gl, programInfo, buffers, texture);
}

main();