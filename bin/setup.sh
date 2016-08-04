#!/bin/bash

if ! which gulp; then
  npm install -g gulp
fi

# Install all dependencies
npm install --ignore-scripts