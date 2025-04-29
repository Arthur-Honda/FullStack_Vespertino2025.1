let bodyParser = require('body-parser');
var path = require('path')
var http = require('http');
var express = require('express');
var app = express();
require("colors");

var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = 'mongodb+srv://arthurhonda:cfcULdNYwqFEhB8m@honda.owbcofv.mongodb.net/?retryWrites=true&w=majority&appName=Honda;'
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("Honda");
var usuarios = dbo.collection("usuarios");

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);   
server.listen(80);

console.log("Servidor rodando...".rainbow);

app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.redirect('projetos.html');
});



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

// app.post('/cadastrar', function(req, res) {
//     let nome = req.body.Nome;
//     let login = req.body.Login;
//     let senha = req.body.Senha;
//     let nasc = req.body.Nascimento;
//     console.log(nome, login, senha, nasc);
    
//     var data = {db_nome: nome, db_login: login, db_senha: senha, db_nasc: nasc};
//     usuarios.insertOne(data, function(err) {
//         if (err) {
//             res.render("res", {status: "Erro", nome, login, senha, nasc});
//         }else {
//             res.render("res", {status: "Cadastro realizado com sucesso!", nome, login, senha, nasc})
//         };
//     });
// });

// app.get('/inicio', function(req, res) {
//     res.redirect('/index.html');
// });


// app.post("/inicio", function(req, res) {
//     res.redirect('/index.html');
// });


// app.post('/logar', (req, res) => {
//     let log = req.body.Login;
//     let passw = req.body.Senha;
//     console.log(log, passw);

//     var data = {db_login: log, db_senha: passw};

//     usuarios.find(data).toArray(function(err, item) {
//         console.log(item);
//         if (item.length == 0) {
//             res.render("resposta", {status: "usuario/senha não encontrados", log, passw});
//         }else if(err) {
//             res.render("resposta", {status: "Erro ao logar", log, passw});
//         }else{
//             res.render("resposta", {status: "Usuario logado", log, passw});
//         }
            
            

//     });
// });