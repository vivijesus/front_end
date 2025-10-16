const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next)=> {
    
    
mysql.getConnection((error, conn) =>{
    if (error) {return res.status(500).send({error: error})}
})
});


router.post('/', (req, res, next)=>{
    const RH ={
        id_candidato: req.body.id_RH,
        quantidade:req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'O candidato foi criado',
        candidatocriado: candidato
    })
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o POST dentro da rota do Candidato'
    })

if (id === 'especial') {
    res.status(200).send ({
            mensagem: 'voce descobriu o ID especial',
            id_candidato: id
        });

    }

});




router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem:'usando o PATH dentro da rota do Candidato'

    })
});

router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o DELETE dentro da rota do Candidato'
    })
});



module.exports = router;