const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('qs');
const {stringify} = require("qs");


let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    // //get the path

    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
});
//server start
server.listen(8000, function () {
    console.log("the server is listening on localhost:8000 ");
})

let handlers = {};
// products page

handlers.notFound = function (req, res) {
    fs.readFile('./views/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
};


handlers.cal = function (req, res) {
    if(req.method === 'GET'){
        fs.readFile('./views/calculator.html','utf-8', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let dataForm = qs.parse(data);
            console.log(dataForm);
            fs.readFile('./views/result.html', 'utf-8', function (err, data1) {
                if (err) {
                    console.log(err);
                }

                let result = eval(dataForm.num1 + dataForm.cal + dataForm.num2);
                data1 = data1.replace('{result}', result);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data1);
                res.end();
            });
        });
    }
}

handlers.result = function (req, res) {
        fs.readFile('./views/result.html', 'utf-8', function (err, data1) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data1);
            res.end();
        });
}

let router = {
    'calculator': handlers.cal,
    'result': handlers.result
}
