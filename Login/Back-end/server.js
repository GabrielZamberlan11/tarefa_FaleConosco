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
        console.log(resposta.length)
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

        if (senha == "") {
            return res.json({
                "resposta": "O campo senha está vazio"
            })
        } else if (senha.length < 8) {
            return res.json({
                "resposta": "A senha deve ter mais que 8 caracteres"
            })
        } else if (email == "") {
            return res.json({
                "resposta": "O campo E-mail está vazio"
            })
        } else if (email.length < 10) {
            return res.json({
                "resposta": "O E-mail deve ter mais que 10 caracteres"
            })
        }

        let sql = `SELECT * FROM login WHERE email=?`
        const [condicao] = await conexao.query(sql, [email])
        console.log(condicao.length)
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
