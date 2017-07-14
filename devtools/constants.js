/**
 * 常量表
 * Powered by @author lion
 */
var Path = require('path');

exports.CWD                    = process.cwd(); 
exports.NODE_MODULES_DIR       = Path.join(exports.CWD, 'node_modules');
exports.CACHE_DIR              = Path.join(exports.CWD, '.cache');
exports.DEVTOOLS_DIR           = Path.join(exports.CWD, 'devtools');
exports.SUMMER_TYPINGS_DIR     = Path.join(exports.CWD, '/typings/summer');
exports.SOURCE_DIR             = Path.join(exports.CWD, 'src');
exports.OUTPUT_DIR             = Path.join(exports.CWD, 'dist');

exports.APP_ENTRY              = Path.join(exports.SOURCE_DIR, 'app.json');

exports.FRAMEWORK_DIR          = Path.join(exports.CWD, 'framework');
exports.FRAMEWORK_OUTPUT_DIR   = Path.join(exports.NODE_MODULES_DIR, 'summer');


exports.DTS_OUTPUT_DIR         = Path.join(exports.NODE_MODULES_DIR, 'typings');

exports.CLASS_REGEXP = /(?:(\/\*\*\s*(?:\s*\*[^\r\n]*)*\s*\*\/)\s*[^\r\n]*)?class\s+(\S+)\s+extends\s+.*ActionHandlers\s*{/g;
exports.ACTION_REGEXP = /(?:(\/\*\*\s*(?:\s*\*[^\r\n]*|[^\r\n])*\s*\*\/)\s*)?@.*\baction\s*\([\s\S]*?\)\s*static\s+(?:async\s+)?([^\s\(]+)\((.*)\)\s*{/g;
exports.M_COMMENT_REGEXP = /\/\*[^*][\s\S]*?\*\//g;
exports.S_COMMENT_REGEXP = /(\n?)\s*\/\/[^\r\n]*/g;