const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require('bcrypt');

 router.get('/', (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) {return res.status(500).send({ error: error})}
            conn.query(
                `SELECT * FROM usuarios;`,
                (error, result, field) => {
                    if (error) {return res.status(500).send({ error: error })}
                    const response = {
                        quantidade: result.lengt,
                        usuarios: result.map(usua => {
                            return {
                                id_usuario: usua.id_usuario,
                                nome: usua.email,
                                senha: usua.senha,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os usuarios',
                                    url: 'http://localhost:3000/usuarios/'
                                }
                            }
                        })
                    }
                    return res.status(200).send(response);
                }) 
        })
});


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: err }) }
        bcrypt.hash(req.body.senha, 10, ((errBcrypt, hash) => {
            if(errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
            conn.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)',
                [req.body.email, hash],
                (error, results) => {
                    if(error) { return res.status(500).send({ error: error }) }
                    response = {
                        mensagem: "Usuário criado com sucesso",
                        usuarioCriado: {
                            id_usuario: results.insertId,
                            email: req.body.email
                            
                        }
                    }
                    return res.status(201).send(response)
                    
                }
            )
        }));
    })
})




/*
router.post('/', (req, res, next) => {
   mysql.getConnection ((error, conn) => {
        if (error) {return res.status(500).send({error: error}) }
            conn.query(
                'INSERT INTO usuarios (email, senha) VALUES (?, ?);',
                [req.body.email, req.body.senha],
                (error, resultado, fields) => {
                conn.realease();
                if (error) { return res.status(500).send({error: error}) }

                const response = {
                    usuario: {
                    usuarioCriado: {
                        id_usuario: resultado.id_usuario,
                        nome: resultado[0].nome,
                        idade: resultado[0].idade,
                        request: {
                            tipo: 'POST',
                            descricao: 'Retorna todos os usuarios',
                            url: 'http://localhost:3000/usuarios/',  
                            id: prod.id_usuario
                        }
                    
                    }
                }
        }
        
         res.status(201).send({
            mensagem: 'Usuario inserido com sucesso',
            id_usuario: resultado.insertId
        })
            return res.status(200).send({response: response})
        
        });
    });
});

*/    


module.exports = router;