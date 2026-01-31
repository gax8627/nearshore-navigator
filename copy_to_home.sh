#!/bin/bash
TARGET_DIR="/Users/gax8627/nearshore-navigator"
echo "Moving project to $TARGET_DIR..."
mkdir -p "$TARGET_DIR"
cp -r . "$TARGET_DIR"
echo "Done! Project moved to $TARGET_DIR"
