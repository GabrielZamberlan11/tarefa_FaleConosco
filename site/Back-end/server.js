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

server.post("/login", async (req, res) => {
    try {
        let { email, senha } = req.body

        senha = senha.trim()
        senha = senha.replace(" ", "")
        email = email.trim()
        email = email.replace(" ", "")

        if (email == "") {
            return res.json({
                "resposta": "O campo E-mail está vazio"
            })
        } else if (email.length < 10) {
            return res.json({
                "resposta": "O E-mail deve ter mais que 10 caracteres"
            })
        }
        else if (senha == "") {
            return res.json({
                "resposta": "O campo senha está vazio"
            })
        } else if (senha.length < 8) {
            return res.json({
                "resposta": "A senha deve ter mais que 8 caracteres"
            })
        }
        const hash = crypto.createHash("sha256").update(senha).digest("hex")
        sql = `SELECT * FROM login WHERE email=? and senha=?`
        const [resposta] = await conexao.query(sql, [email, hash])
        if (resposta.length == 1) {
            res.json({
                "resposta": "O login foi efetuado com sucesso!"
            })
        } else {
            res.json({
                "resposta": "O E-mail ou Senha estao incorretos"
            })
        }
    } catch (error) {
        console.log(error)
    }
})



server.post("/cadastrar", async (req, res) => {
    try {
        let { email, senha } = req.body

        senha = senha.trim()
        senha = senha.replace(" ", "")
        email = email.trim()
        email = email.replace(" ", "")

        if (email == "") {
            return res.json({
                "resposta": "O campo E-mail está vazio"
            })
        } else if (email.length < 10) {
            return res.json({
                "resposta": "O E-mail deve ter mais que 10 caracteres"
            })
        }
        if (senha == "") {
            return res.json({
                "resposta": "O campo senha está vazio"
            })
        } else if (senha.length < 8) {
            return res.json({
                "resposta": "A senha deve ter mais que 8 caracteres"
            })
        }

        let sql = `SELECT * FROM login WHERE email=?`
        const [condicao] = await conexao.query(sql, [email])
        if (condicao.length == 1) {
            return res.json({
                "resposta": "Esse email ja esta cadastrado"
            })
        } else {
            const hash = crypto.createHash("sha256").update(senha).digest("hex")

            sql = `INSERT INTO login (email,senha) VALUES (?,?)`
            const [resposta] = await conexao.query(sql, [email, hash])

            if (resposta.affectedRows == 1) {
                res.json({
                    "resposta": "O Cadastro foi realizado com sucesso"
                })
            } else {
                res.json({
                    "resposta": "ocorreu um erro no cadastro"
                })
            }
        }


    } catch (error) {
        console.log(error)
    }
})

server.post("/contatenos", async (req, res) => {
    try {

        let { nome, email, telefone, assunto, mensagem } = req.body

        nome = nome.trim()
        email = email.trim()
        telefone = telefone.trim()
        assunto = assunto.trim()
        mensagem = mensagem.trim()

        email = email.replace(" ", "")
        telefone = telefone.replace(" ", "")


        if (nome == "" || email == "" || assunto == "" || mensagem == "") {
            return res.json({
                "resposta": "Algum campo essêncial não está preenchido"
            })
        } else if (nome.length < 6 || email.length < 10) {
            return res.json({
                "resposta": "Esta faltando o seu sobrenome ou o email é pequeno demais"
            })
        } else if (telefone.length < 11 & telefone != "") {
            return res.json({
                "resposta": "Coloque um numero de telefone válido(DDD 99999-9999)"
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