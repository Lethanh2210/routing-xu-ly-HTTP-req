let http = require('http');

let url = require('url');

let fs = require('fs');
const qs = require("qs");

let StringDecoder = require('string_decoder').StringDecoder;
let users = [];

let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    //
    // //get the path

    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);

    res.end();
});
//server start
server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})

let handlers = {};
// products page


handlers.login = function (req, res) {
    fs.readFile('./view/login.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// handlers.users page


handlers.home = function (req, res) {
    fs.readFile('./view/home.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        let data1 = qs.parse(data);
        let user = {
            name: data1.name,
            email: data1.email,
        }
    });
};

// not found


handlers.notFound = function (req, res) {
    fs.readFile('./view/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

handlers.profile = function (req, res) {
    fs.readFile('./view/profile.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });

}

let router = {
    'home': handlers.home,
    'login': handlers.login,
    'profile': handlers.profile
}