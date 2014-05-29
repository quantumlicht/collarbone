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
  	mongohq_url:'mongodb://heroku:i05PaQ5XwgYcIHogtOWTdvsah4Z6Si6dV7CuMGLE1orno6EpFwqoo1-VqayM0uat48WKeVcXvgW39kfzBQfGnw@kahana.mongohq.com:10017/app25772746'
  },
};
