#!/bin/sh
# Assemble the servable site into dist/.
#
# Everything here is already static — this only picks out what should be
# public. index.html keeps working from the repo root, so you can still open
# it locally by double-clicking without building anything.
set -eu

rm -rf dist
mkdir -p dist

cp index.html dist/
cp -R assets dist/
cp -R data dist/
cp _headers dist/

echo "dist/ built:"
find dist -type f | sort | sed 's/^/  /'
