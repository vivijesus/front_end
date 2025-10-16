const express = require('express');
const app = express();

const rotaUsuarios = require('./routes/usuarios');
const rotarh = require('./routes/recrutador.js');
const rotacandidato = require('./routes/candidato');
const morgan = require('morgan');
const bodyParser = require('body-parser')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header', 'Content-Type'),
    res.header('Origin, X-Requrested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    
    next();
});


app.use('/usuario', rotaUsuarios);
app.use('/rh', rotarh);
app.use('/candidato', rotacandidato);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.Status(404);
    next(erro);
});

app.use((error, req, res, next)=>{
res.status(error.status || 500);
return res.send({
    erro: {
        mensagem: error.message
    }
})
});

module.exports = app;

