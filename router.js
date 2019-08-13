const express= require('express');
const db = require('./data/dbConfig.js');
const router= express.Router();

//get all accounts
router.get('/accounts', async(req, res)=>{
    try {
const accounts= await db('accounts')
res.json(accounts);
}catch (error){
    res.status(500).json({ message: "Failed to get accounts" });
}
})

//get specified account
router.get("/accounts/:id", (req, res) => {
  db("accounts")
    .where({
      id: req.params.id
    })
    //takes first occurrence
    .first()
    .then(result => res.json(result))
});

//create new account
router.post('/accounts', (req, res) =>
  db('accounts')
    .insert({
      "name": req.body.name,
      "budget": req.body.budget
    })
    .then(result => res.json(result))
);

//update account
router.put('/accounts/:id', (req, res) =>
  db('accounts')
    .where( {
          "id": req.params.id
        })
    .update( 
        {
        "name": req.body.name,
        "budget": req.body.budget
      }
    )
    .then(result => res.json(result))
);

//delete account
router.delete("/accounts/:id", (req, res) =>
  db("accounts")
    .delete()
    .where({
      id: req.params.id
    })
    .then(result => res.json(result))
);



module.exports = router;