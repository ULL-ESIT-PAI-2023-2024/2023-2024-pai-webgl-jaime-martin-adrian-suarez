#!/bin/bash

# Obtiene la lista de carpetas adyacentes (excluyendo archivos)
directories=$(find . -maxdepth 1 -mindepth 1 -type d)

# Itera sobre cada carpeta y ejecuta npm run build si existe el archivo package.json
for dir in $directories; do
    if [ -f "$dir/package.json" ]; then
        echo "Entrando en la carpeta: $dir"
        cd "$dir" || exit
        if [ -f "package.json" ]; then
            echo "Ejecutando 'npm run build' en $dir"
            npm run build
        else
            echo "No se encontró package.json en $dir"
        fi
        cd ..
    fi
done
