var pm2 = require('pm2');

pm2.connect(function() {
  pm2.start({
    script    : '/usr/local/bin/grunt',         // Script to be run
    args: 'prod --force',
  }, function(err, apps) {
    pm2.disconnect();
  });
});