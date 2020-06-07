//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();//o verbose serve para mostrar mensagens no terminal quadno aconter alguma coisa
//criar o objeto que ira fazer operaçoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db //para exportar esse arquivo

// utilizar o objeto que ira fazer operacoes no banco ded dados
/*db.serialize(() => {
   //criar uma tabela com comandos sql
   db.run(`
      CREATE TABLE IF NOT EXISTS places (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         image TEXT,
         address TEXT,
         address2 TEXT,
         state TEXT,
         city TEXT,
         items TEXT
      );
   `)

   //insirir dados na tabela
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
         return console.log(err)
      }

      console.log("cadastrado com sucesso")
      console.log(this)

   });


   //consultar os dados da tabela
   db.all('SELECT * FROM places', function(err, rows) {
      if(err) {
         return console.log(err)
      }

      console.log("aqui estao seus registros")
      console.log(rows)
   });

   
   //deletar um dado da tabela
   db.run('DELETE FROM places WHERE id = ?', [8], function(err) {
      if(err) {
         return console.log(err)
      }

      console.log("registro deletado com sucesso")
   });

   
});*/