var repl = require("repl");

var models = require('./server/models/index');

models.sequelize.sync().then(function() {
  var envName = process.env.NODE_ENV || "dev";

  // open the repl session
  var replServer = repl.start({
    prompt: "Crying (" + envName + ") > ",
  });

  replServer.context.User = models.User;
  replServer.context.Pin = models.Pin;
});
