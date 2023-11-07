const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Lidar com dados via URL
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Lidar com dados no formato JSON
app.use(express.json());

// ROTAS
app.get("/", (req, res) => {
  const query = "SELECT * FROM books";
  conn.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    let books = data;
    res.render("home", { books });
  });
});

app.get("/book/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM books where idbooks = ${id}`;

  let book;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    book = data[0];
    // console.log(book);
    // res.redirect("/");
    res.render("book", { book });
  });
});

app.post("/book/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM books WHERE idbooks = ${id}`;

  conn.query(sql, (err, _) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register/save", (req, res) => {
  const { title, pagesqty } = req.body;

  const query = `
    INSERT INTO books (title, pagesqty)
    VALUES ('${title}','${pagesqty}')
  `;

  conn.query(query, (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });

  res.redirect("/");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodemysql",
  port: 3306,
});

conn.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Conectou ao Meu Sicuol");

  app.listen(3000, () => {
    console.log("Servidor galopando na porteira 3000");
  });
});
