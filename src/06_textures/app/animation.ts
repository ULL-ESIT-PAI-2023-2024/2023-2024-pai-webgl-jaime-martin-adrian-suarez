/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  Defines a function that starts the animation of the scene.
 *
 */

import { ProgramInformation, BufferInformation } from './types';
import drawScene from './draw_scene';

/**
 * @description Starts the animation of the scene.
 * @param gl WebGLRenderingContext to draw the scene.
 * @param programInfo Information about the program.
 * @param buffers Information about the buffers.
 * @param rotation Rotation of the object.
 * @param timeInterval Time interval to update the rotation.
 */
export function startAnimation(gl: WebGLRenderingContext, programInfo: ProgramInformation, buffers: BufferInformation, texture: WebGLTexture, increment: number = 0.001): void {
  let then = 0;
  let timeInterval = 0;
  let rotation = 0;
  function render(now: number): void {
    now *= increment;
    timeInterval = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, texture, rotation);
    rotation += timeInterval;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}