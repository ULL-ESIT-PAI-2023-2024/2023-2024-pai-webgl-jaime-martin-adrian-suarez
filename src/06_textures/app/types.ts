/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2023-2024
 *
 * @authors Jaime Martín González     alu0101476124@ull.edu.es
 *          Adrián Suárez Tabares     alu0101495439@ull.edu.es
 * @since April 16 2024
 * @desc  types.ts: This file contains the types used in the project.
 *
 */

export interface ProgramInformation {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor?: number;
    textureCoord?: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    uSampler?: WebGLUniformLocation;
  };
}

export interface BufferInformation {
  vertex: WebGLBuffer;
  color?: WebGLBuffer;
  textureCoord?: WebGLBuffer;
  index: WebGLBuffer;
}

/**
 * @desc Creates a program information object.
 * @param gl WebGL rendering context.
 * @param shaderProgram WebGL shader program.
 * @returns ProgramInformation object.
 */
export function createProgramInfo(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): ProgramInformation {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix') as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix') as WebGLUniformLocation,
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler") as WebGLUniformLocation,
    },
  };
}