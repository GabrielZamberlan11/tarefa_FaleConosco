const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const porta = 3000
const server = express()
const crypto = require('crypto')
const conexao = require('./db')

server.use(cors())
server.use(express.json())

server.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})

server.post("/contatenos", async (req, res) => {
    try {

        let { nome, email, telefone, assunto, mensagem } = req.body

        nome =nome.trim()
        email=email.trim()
        telefone=telefone.trim()
        assunto=assunto.trim()
        mensagem=mensagem.trim()

        email= email.replace(" ","")
        telefone=telefone.replace(" ","")
        

        if (nome == "" || email == "" || assunto == "" || mensagem == "") {
            return res.json({
                "resposta": "Algum campo essêncial não está preenchido"
            })
        }else if(nome.length < 6 || email.length < 10){
            return res.json({
                "resposta": "Esta faltando o seu sobrenome ou o email é pequeno demais"
            })
        }else if( telefone.length<11 & telefone !="" ){
            return res.json({
                "resposta": "Coloque um numero de telefone válido(DDD 99999-9999)"
            })
        }

        const sql = `INSERT INTO fale_conosco (nome,email,telefone,assunto,mensagem) VALUES (?,?,?,?,?)`
        const [resposta] = await conexao.query(sql, [nome, email, telefone, assunto, mensagem])



        if (resposta.affectedRows == 1) {
            return res.json({
                "resposta": "Cadastro efetuado com sucesso!",
                "sucesso":true
            })
        } else {
            return res.json({
                "resposta": "Erro ao fazer cadastro!",
                "sucesso":false

            })
        }

    } catch (error) {
        console.log(error)
    }
})