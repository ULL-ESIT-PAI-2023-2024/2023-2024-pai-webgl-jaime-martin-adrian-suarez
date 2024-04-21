/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  01-the-beginning.ts: This file contains the code to initialize the WebGL context and clear the canvas.
 *
 */

/**
 * @description Creates a WebGL context
 * @param canvasName 
 * @returns an object containing the WebGL context 
 */
export default function createGLContext(canvasName: string): WebGLRenderingContext {
  const canvas: HTMLCanvasElement = document.getElementById(canvasName) as HTMLCanvasElement;
  const gl: WebGLRenderingContext = canvas.getContext('webgl') as WebGLRenderingContext;
  if (gl === null) {
    throw 'Unable to initialize WebGL. Your browser or machine may not support it.';
  }
  return gl;
}