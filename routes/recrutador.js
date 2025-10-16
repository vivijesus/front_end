const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM recrutador;", (error, resultado, field) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ ressponse: resultado });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO recrutador (titulo, salario, descricao) VALUES (?,?,?)",
      [req.body.titulo, req.body.salario, req.body.descricao],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "vaga cadastrada com sucessso",
          id_recrutador: resultado.insertId,
        });
      }
    );
  });
});

router.post("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "usando o POST dentro da rota do RH",
    rhCriado: RH,
  });

  if (id === "especial") {
    res.status(200).send({
      mensagem: "voce descobriu o ID especial",
      id_rh: id,
    });
  }
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE recrutador
        SET titulo = ?,
            descricao = ?,
            salario = ?
      WHERE id_recrutador = ?`,
      [
        req.body.titulo,
        req.body.descricao,
        req.body.salario,
        req.body.id_recrutador,
      ],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(201).send({
          mensagem: "vagas alteradas com sucesso",
        });
      }
    );
  });
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn)=> {
if (error) { return res.status(500).send({error: error})}
conn.query(
  `DELETE FROM recrutador WHERE id_recrutador = ?`, [req.body.id_recrutador],
  (error, resultado, field) => {
    conn.release();
    if(error) {return res.status(500).send({ error: error})}
    
    res.status(202).send({
      mensagem: 'Vagas removidas com sucesso'
    })
  }
)
  });
});

module.exports = router;
