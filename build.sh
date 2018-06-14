#!/bin/bash
# There are many way too optimize this script but I'm gonna refactoring that later

# Remove the old build
rm -rf build/
echo "Delete the actual build directory"

# Copy all the actual file used for the development version
cp -rn ./dev ./build
echo "Copy the development version into the production version"

# We delete some useless directory
rm -rf build/tests
rm -rf build/lib
rm -rf build/asm

# For all the HTML Files, we minimize them
find ./build -iname '*.html' | while read filename; do 
	echo "Minimize HTML : ${filename}";
	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype $filename -o $filename
done

# For all the CSS Files, we minimize them
find ./build -iname '*.css' | while read filename; do 
	echo "Minimize CSS :  ${filename}";
	npx postcss $filename --use autoprefixer -d $filename;
	cssnano $filename $filename
done

# For all the CSS Files, we minimize them
find ./build -iname '*.js' | while read filename; do 
	echo "Minimize JS :  ${filename}";
	uglifyjs --compress --mangle -o $filename -- $filename
done

echo "Minification done :p"
