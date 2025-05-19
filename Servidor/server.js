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
let users;
let carros;

client.connect()
  .then(() => {
    const db = client.db('Honda');
    usuarios = db.collection('usuarios');
    posts = db.collection('posts');
    users = db.collection('users');
    carros = db.collection('carros');
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


// ------------- ATIVIDADE CARROS ------------- //
app.get('/catalogo', async (req, res) => {
  try {
    // Busca sem agrupar, já que você quer cada ano separado
    const carrosList = await carros.find().toArray();
    res.render('catalogo', { carros: carrosList });
  } catch (err) {
    console.error('Erro ao carregar o catálogo:', err);
    res.status(500).send('Erro ao carregar o catálogo.');
  }
});
  

app.post('/cadastrar', (req, res) => {
  let name = req.body.name;
  let user = req.body.user;
  let password = req.body.password;
  var data = {db_name: name, db_user: user, db_password: password,};
  
  users.insertOne(data, err => {
    if (err) {
      res.render("resposta_cadastro_n", {mensagem: "Erro", name, user, password});
    }else {
      res.render("resposta_cadastro_y", {mensagem: "Cadastro realizado com sucesso!", name, user, password})
    };
  });
});

app.get('/logar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carros', 'logar_user.html'));
});

app.post('/logar', (req, res) => {
  let user = req.body.user;
  let password = req.body.password;
  var data = {db_user: user, db_password: password};
  users.find(data).toArray(function(err, item) {
    if (item.length == 0) {
      res.render("resposta_login_n", {mensagem: "Usuário/senha não encontrados", user, password});
    }else if(err) {
      res.render("resposta_login_n", {mensagem: "Erro ao logar", user, password});
    }else{
      res.render("resposta_login_carro", {mensagem: "Usuário logado com sucesso!", user, password});
    }
  });
});

app.get('/cadastrar_carro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carros', 'cadastrar_carro.html'));
});

// Página de formulário
app.post('/cadastrar_carro', async (req, res) => {
  const { marca, modelo, ano, quantidade } = req.body;

  const filtro = {
    marca,
    modelo,
    ano: parseInt(ano)
  };

  try {
    const carroExistente = await carros.findOne(filtro);

    if (carroExistente) {
      // Carro já existe — apenas incrementa a quantidade
      await carros.updateOne(
        filtro,
        { $inc: { qtde_disponivel: parseInt(quantidade) } }
      );
      res.render('carro_cadastrado', { mensagem: 'Quantidade atualizada para carro existente.' });
    } else {
      // Carro novo — insere com a quantidade inicial
      await carros.insertOne({
        marca,
        modelo,
        ano: parseInt(ano),
        qtde_disponivel: parseInt(quantidade)
      });
      res.render('carro_cadastrado', { mensagem: 'Carro cadastrado com sucesso!' });
    }

  } catch (err) {
    console.error('Erro ao cadastrar o carro:', err);
    res.status(500).send('Erro ao cadastrar o carro.');
  }
});

app.post('/remover_carro', async (req, res) => {
  const { marca, modelo, ano } = req.body;

  try {
    const resultado = await carros.deleteOne({
      marca,
      modelo,
      ano: parseInt(ano)
    });

    if (resultado.deletedCount > 0) {
      res.render('remove_carro', { mensagem: 'Carro removido com sucesso!' });
    } else {
      res.render('remove_carro', { mensagem: 'Carro não encontrado!' });
    }

  } catch (err) {
    console.error('Erro ao remover o carro:', err);
    res.status(500).send('Erro ao remover o carro.');
  }
});
app.post('/atualizar_carro', async (req, res) => {
  const { marca, modelo, ano, nova_quantidade } = req.body;

  try {
    const resultado = await carros.updateOne(
      { marca, modelo, ano: parseInt(ano) },
      { $set: { qtde_disponivel: parseInt(nova_quantidade) } }
    );

    if (resultado.matchedCount > 0) {
      res.render('atualizar_carro', { mensagem: 'Quantidade atualizada com sucesso!' });
    } else {
      res.render('atualizar_carro', { mensagem: 'Carro não encontrado!' });
    }
  } catch (err) {
    console.error('Erro ao atualizar o carro:', err);
    res.status(500).send('Erro ao atualizar o carro.');
  }
});

app.post('/vender_carro', async (req, res) => {
  const { marca, modelo, ano } = req.body;

  try {
    const filtro = { marca, modelo, ano: parseInt(ano) };
    const carro = await carros.findOne(filtro);

    if (!carro) {
      return res.render('venda', { mensagem: 'Carro não encontrado!' });
    }

    if (carro.qtde_disponivel > 0) {
      await carros.updateOne(filtro, { $inc: { qtde_disponivel: -1 } });

      const novaQtde = carro.qtde_disponivel - 1;
      if (novaQtde === 0) {
        return res.render('venda', { mensagem: 'Carro vendido. Agora está esgotado!' });
      }

      res.render('venda', { mensagem: `Carro vendido com sucesso! Quantidade restante: ${novaQtde}` });
    } else {
      res.render('venda', { mensagem: 'Este carro já está esgotado!' });
    }
  } catch (err) {
    console.error('Erro ao vender o carro:', err);
    res.status(500).send('Erro ao vender o carro.');
  }
});



// app.post('/atualizar_senha', (req, res) => {
//   let login = req.body.Login;
//   let senha = req.body.Senha;
//   let newSenha = req.body.Nova_senha;  
//   let data = {db_login: login, db_senha: senha};
//   let newData = { $set: {db_senha: newSenha}};

//   usuarios.updateOne(data, newData, (err, result) => {
//     console.log("Atualizando senha".yellow);
//     console.log(result);
//     if (result.modifiedCount == 0) {
//       res.render('resposta', {status: "Usuário/senha não encontrado!"})
//     }else if (err) {
//       res.render('resposta', {status: "Erro ao atualizar usuário!"})
//     }else {
//       res.render('resposta', {status: "Usuário atualizado com sucesso!"})        
//     };
//   });
 
// });


// app.post('/remover_usuario', (req, res) => {
//   let login = req.body.Login;
//   let senha = req.body.Senha;
//   let data = {db_login: login, db_senha: senha};

//   usuarios.deleteOne(data, (err, result) => {
//     console.log(result);
//       if (result.deletedCount == 0) {
//         res.render('resposta', {status: "Usuário/senha não encontrado!"})
//       }else if (err) {
//         res.render('resposta', {status: "Erro ao remover usuário!"})
//       }else {
//         res.render('resposta', {status: "Usuário removido com sucesso!"})        
//       };
//     });

//   });



  // app.post('/cadastrar_post', async (req, res) => {
  //   const { titulo, resumo, conteudo } = req.body;
  //   await posts.insertOne({ titulo, resumo, conteudo });
  //   res.redirect('/blog');
  // });


// app.post('/cad', function(req, res) {
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


// app.post('/log', (req, res) => {
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