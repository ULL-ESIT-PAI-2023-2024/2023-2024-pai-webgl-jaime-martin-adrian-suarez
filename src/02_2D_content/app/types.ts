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
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
}

export interface BufferInformation {
  vertex: WebGLBuffer;
}

/**
 * @desc Creates a shader of the given type, uploads the source and compiles it.
 * @param gl WebGLRenderingContext
 * @param type Shader type (VERTEX_SHADER | FRAGMENT_SHADER)
 * @param source Shader source code
 * @returns Compiled shader
 */
export function createProgramInfo(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): ProgramInformation {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix') as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix') as WebGLUniformLocation,
    },
  };
}