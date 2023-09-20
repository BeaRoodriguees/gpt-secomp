import "dotenv/config.js";
import express from "express";
import { chat } from "./src/gpt.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

/* // req (request) -> requisição = o que o cliente enviou  || ras (response) -> resposta = o que vamos devolver ao cliente
app.get("/", (req, res) => {
    res.send("Oi");
}) */

const chats = [];

app.get("/chat", async (req, res) => {
    let { content, id } = req.query;
    
    if (!content){
        res.status(400).send("O parâmetro 'content' não foi passado.");
        return;
    }

    // Iniciando um novo chat
    if (!id){
        const length = chats.push([]);
        id = length - 1; 
    }

    // Adiciona mensagem da usuário no chat
    chats[id].push({ content: content, role: "user" });

    const result = await chat(chats[id]);
    const assistantMessage = result.choices[0].message;

    // Adiciona mensagem da IA no chat
    chats[id].push(assistantMessage);

    res.send({
        ...assistantMessage,
        id,
    });

});



app.use("/", express.static("public"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

