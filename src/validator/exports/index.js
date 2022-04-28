const ExportSongPayloadSchema = require('./schema');
const ClientError = require('../../exceptions/ClientError');

const ExportsValidator = {
  validateExportSongPayload: (payload) => {
    const validationResult = ExportSongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
