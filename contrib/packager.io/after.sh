#!/bin/bash
#
# packager.io after script
#

PATH=$(pwd)/bin:$(pwd)/vendor/bundle/bin:$PATH

set -eux

# delete asset cache
rm -r tmp/cache

# delete node_modules folder - only required for building
<<<<<<< HEAD
rm -rf node_modules
=======
rm -rf node_modules
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
