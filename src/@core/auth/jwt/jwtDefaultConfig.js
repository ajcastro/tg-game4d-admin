export default {
  // Endpoints
  loginEndpoint: '/api/admin/auth/login',
  registerEndpoint: '/api/admin/auth/register',
  refreshEndpoint: '/api/admin/auth/refresh-token',
  logoutEndpoint: '/api/admin/auth/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
