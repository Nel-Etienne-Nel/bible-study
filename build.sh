#!/bin/sh
# Kept so a Cloudflare project still set to `sh build.sh` keeps deploying.
# The build itself is build.js — see the README.
exec node build.js "$@"
