#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

"$SCRIPT_DIR/backend-python/test.sh"
"$SCRIPT_DIR/frontend-react/test.sh"
