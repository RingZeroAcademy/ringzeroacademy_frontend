#!/bin/bash

# This script assumes that its executed from the repository root.
git clone --depth 1 --branch main --single-branch git@github.com:RingZeroAcademy/tutorials.git scripts/tutorials
node scripts/process_tutorials.js
rm -r scripts/tutorials
