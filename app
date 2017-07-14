#!/bin/sh
basedir=`dirname "$0"`

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node" "--harmony" "./devtools/index.js" "$@"
  ret=$?
else 
  node "--harmony" "./devtools/index.js" "$@"
  ret=$?
fi
exit $ret
