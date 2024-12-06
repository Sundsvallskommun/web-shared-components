const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png', 'image/tiff', 'image/bmp'];

const documentMimeTypes = [
  'htm',
  'html',
  'pdf',
  'rtf',
  'docx',
  'doc',
  'txt',
  'xlsx',
  'xls',
  'odt',
  'ods',
  'msg',
  'text/plain',
  'text/html',
  'application/pdf',
  'application/rtf',
  'application/msword',
  'application/pdf',
  'application/rtf',
  'application/msword',
  'application/octet-stream',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const acceptedMimeTypes = [...imageMimeTypes, ...documentMimeTypes];

const fileNameValidationFunctions = {
  notEmpty: (value: string) => (!value ? 'Filnamn får inte vara tomt' : true),
  noSpacialCharacters: (value: string) => {
    if (!value?.match(/^[A-Za-z0-9 _-]+$/)) {
      return 'Specialtecken är inte tillåtna';
    }
    return true;
  },
};

export const defaults = {
  imageMimeTypes,
  documentMimeTypes,
  acceptedMimeTypes,
  fileNameValidationFunctions,
};
