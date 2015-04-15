var site = require('./routes/index');
var ws = require('./routes/ws');

module.exports = function(app) {
    app.get('/', site.index);
    app.get('/ws', ws.getService);
    app.post('/ws', ws.getService);

    app.get("*", function(req, res) {
        res.end("404!");
    });
}