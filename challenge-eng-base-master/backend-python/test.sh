#!/bin/bash

echo "===== Running Backend (Flask) Tests ====="
docker exec challenge_backend /app/tests/run_tests.sh
