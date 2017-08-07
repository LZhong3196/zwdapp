var Path = require('path');

exports.CWD                    = process.cwd(); 
exports.SOURCE_DIR             = Path.join(exports.CWD, 'src');
exports.OUTPUT_DIR             = Path.join(exports.CWD, 'dist');
exports.CACHE_DIR              = Path.join(exports.CWD, '.cache');
exports.DEVTOOLS_DIR           = Path.join(exports.CWD, 'devtools');
exports.FRAMEWORK_DIR          = Path.join(exports.CWD, 'framework');
exports.NODE_MODULES_DIR       = Path.join(exports.CWD, 'node_modules');
exports.SUMMER_TYPINGS_DIR     = Path.join(exports.CWD, '/typings/summer');
exports.APP_ENTRY              = Path.join(exports.SOURCE_DIR, 'app.json');
exports.DTS_OUTPUT_DIR         = Path.join(exports.NODE_MODULES_DIR, 'typings');
exports.FRAMEWORK_OUTPUT_DIR   = Path.join(exports.NODE_MODULES_DIR, 'summer');
exports.ANDROID_SRC_DIR        = Path.join(exports.CWD, 'android/app/src/main');


exports.CLASS_REGEXP = /(?:(\/\*\*\s*(?:\s*\*[^\r\n]*)*\s*\*\/)\s*[^\r\n]*)?class\s+(\S+)\s+extends\s+.*ActionHandlers\s*{/g;
exports.ACTION_REGEXP = /(?:(\/\*\*\s*(?:\s*\*[^\r\n]*|[^\r\n])*\s*\*\/)\s*)?@.*\baction\s*\([\s\S]*?\)\s*static\s+(?:async\s+)?([^\s\(]+)\((.*)\)\s*{/g;
exports.M_COMMENT_REGEXP = /\/\*[^*][\s\S]*?\*\//g;
exports.S_COMMENT_REGEXP = /(\n?)\s*\/\/[^\r\n]*/g;