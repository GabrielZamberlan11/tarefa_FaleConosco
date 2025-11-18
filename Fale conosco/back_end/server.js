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

        const { nome, email, telefone, assunto, mensagem } = req.body
        if (nome == "" || email == "" || assunto == "" || mensagem == "") {
            return res.json({
                "resposta": "Algum campo não está preenchido"
            })
        }

        const sql = `INSERT INTO fale_conosco (nome,email,telefone,assunto,mensagem) VALUES (?,?,?,?,?)`
        const [resposta] = await conexao.query(sql, [nome, email, telefone, assunto, mensagem])



        if (resposta.affectedRows == 1) {
            return res.json({
                "resposta": "Cadastro efetuado com sucesso!"
            })
        } else {
            return res.json({
                "resposta": "Erro ao fazer cadastro!"
            })
        }

    } catch (error) {
        console.log(error)
    }
})