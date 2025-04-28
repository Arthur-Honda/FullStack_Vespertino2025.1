let bodyParser = require('body-parser');
var path = require('path')
var http = require('http');
var express = require('express');
var app = express();
require("colors");

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);   
server.listen(80);

console.log("Servidor rodando...".rainbow);

app.use(express.urlencoded({ extended: true}));

let usuarios = []

app.get('/', (req, res) => {
    res.redirect('public/projetos.html');
});

// app.get('/projetos', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'projetos.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'projetos.html'));
// });

app.get('/cadastra', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro_login', 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro_login', 'login.html'));
});


app.post('/cadastra', (req, res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        res.render('resposta_cadastro_n', { mensagem: 'Usuário já existe!' });
      } else {
        usuarios.push({ usuario, senha });
        res.render('resposta_cadastro_y', { mensagem: 'Cadastro realizado com sucesso!' });
      }
});

app.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (encontrado) {
        res.render('resposta_login_y', { mensagem: 'Login bem-sucedido! Seja bem-vindo(a) ' + usuario + '!' });
    } else {
        res.render('resposta_login_n', { mensagem: 'Usuário ou senha incorretos!' });
    }    
})