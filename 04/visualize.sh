#!/bin/bash
# Convert all txt to png
for f in 04/output-*.txt; do
  magick -font "04/font.ttf" \
    -pointsize 12 \
    -interline-spacing -9 \
    -background "#181926" \
    -fill white \
    label:@"$f" \
    -bordercolor "#181926" \
    -border 20 \
    "${f%.txt}.png"
done

# Create ping-pong GIF
magick -delay 20 04/output-*.png -coalesce \
  \( -clone 1--2 -reverse \) \
  -loop 0 04/animation.gif

echo "Done! GIF created: 04/animation.gif"