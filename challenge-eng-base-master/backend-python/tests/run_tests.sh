#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"
for filename in ./*.test.py; do
    [ -e "$filename" ] || continue
    echo "===== Running $filename ====="
    python "$filename"
    echo ""
done

