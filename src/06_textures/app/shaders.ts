/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  This file contains the necesary functions to initialize a shader program.
 *
 */

/**
 * @description Creates a shader program.
 * @param gl The WebGL Context.
 * @returns The shader program.
 */
export default async function createShaderProgram(gl: WebGLRenderingContext): Promise<WebGLProgram> {
  // Fetch the vertex and fragment shaders 
  const vsSource = await fetch("shaders/vertex.glsl").then((res) => res.text());
  const fsSource = await fetch("shaders/fragment.glsl").then((res) => res.text());
  
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram: WebGLProgram = initShaderProgram(gl, vsSource, fsSource) as WebGLProgram;
  return shaderProgram;
}

/**
 * @description Initialize a shader program, so WebGL knows how to draw our data.
 *
 * @param gl The WebGL Context.
 * @param vsSource Vertex shader source.
 * @param fsSource Fragment shader source.
 * @returns The shader program. If it fails, it returns null.
 */
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource) as WebGLShader;
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource) as WebGLShader;

  // Create the shader program
  const shaderProgram = gl.createProgram() as WebGLProgram;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program threw an error, log it and return null
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
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
function loadShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}