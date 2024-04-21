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

import createGLContext from './context';

/**
 * Main function that initializes the WebGL context and clears the canvas
 */
function main(): void {
  let gl = createGLContext('WebGLCanvas');
  // Set clear color to black, fully opaque (rgba)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();