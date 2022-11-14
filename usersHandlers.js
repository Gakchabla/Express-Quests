const database = require("./database");

const getUsers = (req, res) => {

    database
  
      .query("select * from users")
  
      .then(([users]) => {
  
        res.json(users);
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error retrieving data from database");
  
      });
  
  };

  const getUsersById = (req, res) => {

    const id = parseInt(req.params.id);
  
  
    database
  
      .query("select * from users where id = ?", [id])
  
      .then(([users]) => {
  
        if (users[0] != null) {
  
          res.json(users[0]);
  
        } else {
  
          res.status(404).send("Not Found");
  
        }
  
      })
  
      .catch((err) => {
  
        console.error(err);
  
        res.status(500).send("Error retrieving data from database");
  
      });
  
  };

const postUser = (req, res) =>{
    const {firstname, lastname, email, city, language} = req.body

database
.query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",[firstname,lastname, email, city,language])

.then(([result])=>{
    res.location(`/api/users/${result.insertId}`).sendStatus(200)
})
.catch((err)=>{console.error(err);
    res.status(500).Send("Error saving the movie");
})

}

const updateUser = (req, res) =>{
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language} = req.body;

  database
  .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
  [firstname,lastname, email, city,language, id])
  .then (([result])=>{
    if (result.affectedRows === 0){
      res.status(404).send('not found')
    }
    else {res.status(204)}
  })
  .catch((err) => {

    console.error(err);

    res.status(500).send("Error editing the movie");

  });
}

const deleteUser = (req, res) =>{
  const id = req.params.id;

  database
  .query("DELETE users WHERE id= ?", [id])
  .then(([result])=>{
    if (result.affectedRows) res.status(204)
    else res.status(404).send('not found')
  })
  .catch((err)=>{
  console.error(err);
  res.status(500).send("Error deleting the movie")})
}

  module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUser,
    deleteUser,
  };