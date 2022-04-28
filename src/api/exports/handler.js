class ExportsHandler {
  constructor(service, validator, playlistsService) {
    this._service = service;
    this._validator = validator;
    this._playlistsService = playlistsService;


    this.postExportSongHandler = this.postExportSongHandler.bind(this);
  }

  async postExportSongHandler(request, h) {
    this._validator.validateExportSongPayload(request.payload);

    const {playlistId} = request.params;
    const {id: userId} = request.auth.credentials;
    // console.log(playlistId);
    // console.log(userId);

    await this._playlistsService.verifyPlaylistOwner(playlistId, userId);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };

    await this._service.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
