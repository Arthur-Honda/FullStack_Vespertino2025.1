let bodyParser = require('body-parser');

require("colors");
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);   
server.listen(80);

console.log("Servidor rodando...".rainbow);

// Métodos e actions

app.get('/inicio', function(req, res) {
    res.redirect('/index.html');
});


app.post("/inicio", function(req, res) {
    res.redirect('/index.html');
});
 

// app.get('/cadastrar', function(req, res) {
//     let nome = req.query.Nome;
//     let login = req.query.Login;
//     let senha = req.query.Senha;
//     let nasc = req.query.Nascimento;
//     console.log(nome, login, senha, nasc);
//     res.redirect('/index.html');
// });

app.post('/cadastrar', function(req, res) {
    let nome = req.body.Nome;
    let login = req.body.Login;
    let senha = req.body.Senha;
    let nasc = req.body.Nascimento;
    console.log(nome, login, senha, nasc);
    res.render("res", {nome, login, senha, nasc})
});


app.get("/for_ejs", function(req, res) {
    let valor = req.query.valor;
    res.render("exemplo_for", {valor});
});




