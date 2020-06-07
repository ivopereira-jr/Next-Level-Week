const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicaçao
server.use(express.urlencoded({ extended: true }))//o .use serve para fazar confi no express

//utilizando template engine nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
   express: server,
   noCache: true//o nocache true serve para tiver desenvolvemto nao ocorrer bugs
});



//configurar caminhos da minha aplicaçao
//pagina inicial
//req requisiçao
//res resposta
server.get("/", (req, res) => {
   res.render(__dirname + "/views/index.html")
   //return res.render("index.html", {title: "um titulo"})//o title faiz referecia ao title no index html  e deixa a apgina dinamica caso vc for pegar informaçoes de banco de dados para prenceecher ou alterar o html
});

server.get("/create-point", (req, res) => {
   //req.query query string da nossa url elementos que estao na url
      

   return res.render("create-point.html")
});

server.post("/savepoint", (req, res) => {
   //req.body o corpo do nosso formulario com as informaçoes
   //console.log(req.body)

   //inserir dados no banco de dados
   const query = `INSERT INTO places (
         name,
         image,
         address,
         address2,
         state,
         city,
         items
      ) VALUES (
         ?,?,?,?,?,?,?
      );
   `

   const values = [//akie e as informaçoes do formulario que sao vao ser aplicadas no banco de dados
      req.body.name,
      req.body.image,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.items
   ]

    db.run(query, values, function(err) {
      if(err) {
         console.log(err)
         return res.send("Erro no cadastro!")
      }

      console.log("cadastrado com sucesso")
      console.log(this)

      return res.render("create-point.html", {saved: true})
   });
   

})


server.get("/search", (req, res) => {

   const search = req.query.search

   if(search == "") {
      //pesquisa vazia
      return res.render("search-results.html", {total: 0})
   }

   //pegar os dados do banco de dados
   db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if(err) {
         return console.log(err)
      }
      const total = rows.length
      //mostrar a pagina html com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total})

   });


});


//ligar o servidor 
server.listen(3000)