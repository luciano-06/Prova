import express from 'express'

const app = express()
app.use(express.json())

const produtos = []
let idCounter = 1

app.get('/produtos', (req, res) => {
    res.status(200).json(produtos)
})


app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios." })
    }

    const novoProduto = {
        id: idCounter++,
        nome,
        preco
    }

    produtos.push(novoProduto)

    res.status(201).json(novoProduto)
})

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." })
    }

    produtos[index] = {
        ...produtos[index],
        ...req.body
    }

    res.status(200).json(produtos[index])
})

app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." })
    }

    const removido = produtos[index]
    produtos.splice(index, 1)

    res.status(200).json({
        mensagem: `Produto '${removido.nome}' removido com sucesso.`,
        removido
    })
})

app.listen(3000, () => {
    console.log("API rodando na porta 3000")
})























/*Questão 1 – (GET)
Desenvolva um endpoint GET /produtos que retorne todos os produtos cadastrados em formato JSON.
O endpoint deve responder com status HTTP adequado e permitir futuramente expansão para
paginação.
Critérios de avaliação:
● Funcionamento correto do método GET
● Estrutura de resposta JSON
● Boas práticas de organização do código
Questão 2 – (POST)
Desenvolva um endpoint POST /produtos que cadastre um novo produto.
Valide se o produto possui nome e preço antes de cadastrar.
Retorne o produto criado com seu id gerado automaticamente.
Critérios de avaliação:
● Uso correto do método POST e do corpo da requisição (JSON)
● Validação dos campos
● Retorno com status HTTP correto (ex.: 201 Created)
Questão 3 – (PUT)
Desenvolva um endpoint PUT /produtos/:id que atualize os dados de um produto existente.
Se o produto não for encontrado, retorne erro apropriado.
Critérios de avaliação:
● Utilização correta de parâmetros de rota
● Atualização apenas de produto existente
● Boas práticas de resposta, como uso de 404 quando aplicável
Questão 4 – (DELETE)
Desenvolva um endpoint DELETE /produtos/:id que remova o produto informado pela rota.
Confirme se realmente foi removido e retorne uma mensagem descritiva.
Critérios de avaliação:
● Funcionamento correto da remoção
● Comunica */

/*http://localhost:3000/produtos*/ /*http://localhost:3000/produtos/1*/
/* code npm --watch server.js */
/*test, erro 404 no post*/
/* reslvido, post funciando */
/* get funciando */
/* put funciando */
/*delete funciando */