// CONFIG
// ======

exports.config = {
  listenPort: "2000",
  sessionSecret: 'bb-login-secret',
  cookieSecret: 'bb-login-secret',
  cookieMaxAge: (1000 * 60 * 60 * 24 * 365),
  database: {
    IP: "localhost",
    name: "defaultDB",
    port: "27017"
  }
};
