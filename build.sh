#!/bin/sh
# Kept so a Cloudflare build still set to `sh build.sh` keeps working.
# The build itself is build.js — see the README.
exec node build.js "$@"
