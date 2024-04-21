/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  05-3D-objects.ts: This file contains the code to render a 3D object.
 *
 */

import { BufferInformation, ProgramInformation, createProgramInfo } from './types';
import initBuffers from './init_buffers';
import createGLContext from './context';
import createShaderProgram from './shaders';
import { startAnimation } from './animation';

async function  main(): Promise<void> {
  let gl = createGLContext('WebGLCanvas');

  const shaderProgram: WebGLProgram = await createShaderProgram(gl);
  const programInfo: ProgramInformation = createProgramInfo(gl, shaderProgram);
  const buffers: BufferInformation = initBuffers(gl);

  startAnimation(gl, programInfo, buffers);
}

main();