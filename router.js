const express= require('express');
const db = require('./data/dbConfig.js');
const router= express.Router();

router.get('/accounts', async(req, res)=>{
    try {
const accounts= await db('accounts')
res.json(accounts);
}catch (error){
    res.status(500).json({ message: "Failed to get accounts" });
}
})

router.get('/accounts/:id', async (req, res)=>{
    const {id} = req.params;
    try {
    const accounts = await db('accounts').where({ id });

    if (accounts.length) {
      res.json(accounts);
    } else {
      res.status(404).json({ message: 'Could not find account with given id.' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get account' });
  }
})

router.post('/accounts', (req, res) =>
  db('accounts')
    .insert({
      "name": req.body.name,
      "budget": req.body.budget
    })
    .then(result => res.json(result))
);


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


router.delete("/accounts/:id", (req, res) =>
  db("accounts")
    .delete()
    .where({
      id: req.params.id
    })
    .then(result => res.json(result))
);



module.exports = router;