const Jwt = require('@hapi/jwt');
const ClientError = require('../exceptions/ClientError');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const {payload} = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new ClientError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
