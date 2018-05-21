const path = require('path');
const mimeTypes = {
  'txt': 'text/plain',
  'css': 'text/css',
  'git': 'image/gif',
  'html': 'text/html',
  'aac' :   'audio/aac',
  'abw' :   'application/x-abiword',
  'arc' :   'application/octet-stream',
  'avi' :   'video/x-msvideo',
  'azw'  :  'application/vnd.amazon.ebook',
  'bin' :   'application/octet-stream',
  'bz'  :   'application/x-bzip',
  'bz2' :   'application/x-bzip2',
  'csh' :   'application/x-csh',
  'css' :   'text/css',
  'csv' :   'text/csv',
  'doc' :   'application/msword',
  'docx' :  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'gif' :   'image/gif',
  'htm' :   'text/html',
  'html'    :   'text/html',
  'jar' :   'application/java-archive',
  'jpeg' : 'image/jpeg',
  'jpg' : 'image/jpeg',
  'js'  :   'application/javascript',
  'json'    :'application/json',
  'png' :   'image/png',
  'pdf' :   'application/pdf',
  'xhtml'   :   'application/xhtml+xml',
  'xls' :   'application/vnd.ms-excel',
  'xlsx' :  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xml' :   'application/xml',
  'xul' :   'application/vnd.mozilla.xul+xml',
  'zip' :   'application/zip',
  '7z' :    'application/x-7z-compressed',
};

module.exports = (filePath) => {
  let ext = path.extname(filePath)
      .split('.')
      .pop()
      .toLowerCase();
  if(!ext) {
    ext = filePath;
  }
   return mimeTypes[ext] || mimeTypes['txt']

};