/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  04_animating.ts: This file contains the code to animate a square.
 *
 */

import { BufferInformation, ProgramInformation } from './types.js';
import initBuffers from './init_buffers';
import drawScene from './draw_scene';

/**
 * @description Initialize a shader program, so WebGL knows how to draw our data.
 *
 * @param gl The WebGL Context.
 * @param vsSource Vertex shader source.
 * @param fsSource Fragment shader source.
 * @returns The shader program. If it fails, it returns null.
 */
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string,
  fsSource: string): WebGLProgram | null {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource) as WebGLShader;
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource) as WebGLShader;

  // Create the shader program
  const shaderProgram = gl.createProgram() as WebGLProgram;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

/**
 * @description Creates a shader of the given type, uploads the source and
 * compiles it.
 *
 * @param gl The WebGL Context.
 * @param type The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
 * @param source The source code for the shader.
 * @returns The shader. If it fails, it returns null.
 */
function loadShader(gl: WebGLRenderingContext, type: GLenum,
  source: string): WebGLShader | null {
  const shader = gl.createShader(type) as WebGLShader;

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

async function main(): Promise<void> {
  let squareRotation: number = 0.0;
  let deltaTime: number = 0;

  const canvas: HTMLCanvasElement = document.getElementById('glcanvas') as HTMLCanvasElement;

  // Initialize the GL context
  const gl: WebGLRenderingContext = canvas.getContext('webgl') as WebGLRenderingContext;

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      'Unable to initialize WebGL. Your browser or machine may not support it.'
    );
    return;
  }

  // Set clear color to black, fully opaque (rgba)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // ------------------------ Second part of the tutorial ------------------------
  const vsSource = await fetch("shaders/vertex.glsl").then((res) => res.text());
  const fsSource = await fetch("shaders/fragment.glsl").then((res) => res.text());

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource) as WebGLProgram;

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo: ProgramInformation = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix') as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix') as WebGLUniformLocation,
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers: BufferInformation = initBuffers(gl);

  let then = 0;
  // Draw the scene repeatedly
  function render(now: number): void {
    now *= 0.001; // convert to seconds
    deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, squareRotation);
    squareRotation += deltaTime;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();