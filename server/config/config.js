// CONFIG
// ======
var winston = require('winston');
exports.config = {
  listenPort: "2000",
  sessionSecret: 'bb-login-secret',
  cookieSecret: 'bb-login-secret',
  cookieMaxAge: (1000 * 60 * 60 * 24 * 365),
  database: {
    IP: "localhost",
    name: "defaultDB",
    port: "27017",
  	db_connection:"mongodb://heroku:i05PaQ5XwgYcIHogtOWTdvsah4Z6Si6dV7CuMGLE1orno6EpFwqoo1-VqayM0uat48WKeVcXvgW39kfzBQfGnw@kahana.mongohq.com:10017/app25772746"
  },
  passport: {
    domain: 'app25772746.auth0.com',
    clientID: 'kJk7T528ulbkoiEHXt8GbM15DgegseXq',
    clientSecret: 'HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda',
    callbackURL: 'http://localhost:2000/',
    redirectUri: 'http://localhost:2000/'
  },
  auth0_api: {
    api_secret: 'iS0iTkQqMxm9zN9nWM1dm04eghgunf4ZpZ6FrGWycYv4DdrpM88m3scMHDrdNbSU',
    api_id: 'Y0T58gsOTMiApt0IMFtDw2Qg598vOCXN',
    token_uri: 'https://app25772746.auth0.com/oauth/token',
    users_uri: 'https://app25772746.auth0.com/api/users'
  }
};


exports.logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'access.log', colorize:false, json:false})
    ]
});

