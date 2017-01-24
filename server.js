const express = require('express');

var app = express();
var port = process.env.PORT || 8080;
var host = 'localhost';

app.enable('trust-proxy');
app.set('trust-proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.all('/api/whoami', function (request, response) {
    var whoAmI = {
        "ip" : (request.headers['x-forwarded-for'] ||
                 request.connection.remoteAddress ||
                 request.socket.remoteAddress ||
                 request.connection.socket.remoteAddress).split(",")[0],
        "lang" : request.headers['accept-language'].split(',')[0],
        "sw" : request.headers['user-agent']
    }; 

    response.json(whoAmI);
});

app.listen(port);
