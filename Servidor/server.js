const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('colors');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);

// MongoDB
const uri = 'mongodb+srv://arthurhonda:cfcULdNYwqFEhB8m@honda.owbcofv.mongodb.net/?retryWrites=true&w=majority&appName=Honda';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

let usuarios;
let posts;

client.connect()
  .then(() => {
    const db = client.db('Honda');
    usuarios = db.collection('usuarios');
    posts = db.collection('posts');
    server.listen(80, () => {
      console.log("Servidor rodando".rainbow);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Rotas
app.get('/', (req, res) => {
  res.redirect('projetos.html');
});

app.get('/cadastra', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro_login', 'cadastro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro_login', 'login.html'));
});

app.post('/cadastra', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const existe = await usuarios.findOne({ usuario });

    if (existe) {
      res.render('resposta_cadastro_n', { mensagem: 'Usuário já existe!' });
    } else {
      await usuarios.insertOne({ usuario, senha });
      res.render('resposta_cadastro_y', { mensagem: 'Cadastro realizado com sucesso!' });
    }
  } catch (err) {
    console.error(err);
    res.render('resposta_cadastro_n', { mensagem: 'Erro ao cadastrar!' });
  }
});

app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const encontrado = await usuarios.findOne({ usuario, senha });

    if (encontrado) {
      res.render('resposta_login_y', { mensagem: `Login bem-sucedido! Seja bem-vindo(a) ${usuario}!` });
    } else {
      res.render('resposta_login_n', { mensagem: 'Usuário ou senha incorretos!' });
    }
  } catch (err) {
    console.error(err);
    res.render('resposta_login_n', { mensagem: 'Erro ao realizar login!' });
  }
});

// Página do blog
app.get('/blog', async (req, res) => {
    const todosPosts = await posts.find().toArray();
    res.render('blog', { posts: todosPosts });
  });
  
  // Página de formulário
  app.get('/cadastrar_post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post', 'cadastrar_post.html'));
  });
  



  


  // Cadastrar post no banco

  app.post('/cadastrar_post', async (req, res) => {
    const { titulo, resumo, conteudo } = req.body;

    try {
        // Insere o post no banco de dados
        await posts.insertOne({ titulo, resumo, conteudo });

        // Renderiza a página "Post Cadastrado"
        res.render('cadastrado');
    } catch (err) {
        console.error('Erro ao cadastrar o post:', err);

        // Em caso de erro, retorna uma mensagem de erro
        res.status(500).send('Erro ao cadastrar o post.');
    }
});



app.post('/atualizar_senha', (req, res) => {
  let login = req.body.Login;
  let senha = req.body.Senha;
  let newSenha = req.body.Nova_senha;  
  let data = {db_login: login, db_senha: senha};
  let newData = { $set: {db_senha: newSenha}};

  usuarios.updateOne(data, newData, (err, result) => {
    console.log("Atualizando senha".yellow);
    console.log(result);
    if (result.modifiedCount == 0) {
      res.render('resposta', {status: "Usuário/senha não encontrado!"})
    }else if (err) {
      res.render('resposta', {status: "Erro ao atualizar usuário!"})
    }else {
      res.render('resposta', {status: "Usuário atualizado com sucesso!"})        
    };
  });
 
});


app.post('/remover_usuario', (req, res) => {
  let login = req.body.Login;
  let senha = req.body.Senha;
  let data = {db_login: login, db_senha: senha};

  usuarios.deleteOne(data, (err, result) => {
    console.log(result);
      if (result.deletedCount == 0) {
        res.render('resposta', {status: "Usuário/senha não encontrado!"})
      }else if (err) {
        res.render('resposta', {status: "Erro ao remover usuário!"})
      }else {
        res.render('resposta', {status: "Usuário removido com sucesso!"})        
      };
    });

  });



  // app.post('/cadastrar_post', async (req, res) => {
  //   const { titulo, resumo, conteudo } = req.body;
  //   await posts.insertOne({ titulo, resumo, conteudo });
  //   res.redirect('/blog');
  // });


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


app.post('/logar', (req, res) => {
    let log = req.body.Login;
    let passw = req.body.Senha;
    console.log(log, passw);

    var data = {db_login: log, db_senha: passw};

    usuarios.find(data).toArray(function(err, item) {
        console.log(item);
        if (item.length == 0) {
            res.render("resposta", {status: "usuario/senha não encontrados", log, passw});
        }else if(err) {
            res.render("resposta", {status: "Erro ao logar", log, passw});
        }else{
            res.render("resposta", {status: "Usuario logado", log, passw});
        }
            
            

    });
});