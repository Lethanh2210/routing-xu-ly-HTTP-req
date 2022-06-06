let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {

//get url and parse

    let parseUrl = url.parse(req.url, true);
    // //get the path
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    console.log(trimPath);
    res.end();

})

server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})


//definer the handler

let handlers = {};
//sample handlers
handlers.sample = function (data, callback) {
// call back
    callback(406, {'name': 'sample handle'})
};
//not found sample
handlers.notFound = function (data, callback) {
    callback(404);
};

//home
handlers.home = function (data, callback) {
// call back
    callback(200, 'home page');
};

let router = {
    'sample': handlers.sample,
    'home': handlers.home,
}