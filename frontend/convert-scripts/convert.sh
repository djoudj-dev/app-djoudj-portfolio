#!/bin/bash
# Convertir tous les SVG en AVIF

SRC_DIR="frontend/public/icons/icons_stacks"
DEST_DIR="frontend/public/icons/icons-stackss"

mkdir -p "$DEST_DIR"

for file in "$SRC_DIR"/*.svg; do
  filename=$(basename "$file" .svg)
  echo "Conversion de $file → $DEST_DIR/$filename.avif"

  # Utilisation de sharp pour convertir l'image
  node -e "
    const sharp = require('sharp');
    sharp('$file')
      .resize(512)  // Redimensionner pour optimiser la taille
      .toFormat('avif')  // Convertir au format AVIF
      .toFile('$DEST_DIR/$filename.avif', (err, info) => {
        if (err) {
          console.error('Erreur de conversion:', err);
        } else {
          console.log('Conversion réussie:', info);
        }
      });
  "
done
