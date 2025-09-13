import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {createUser,findUser, readJsonFile, writeJsonFile } from './fetchData.js';


const app = express();
app.use(cors());

// app.use(cors({
//     origin: "*", // 允许的来源
//     methods: ['GET', 'POST'], // 允许的请求方法
//     allowedHeaders: ['Content-Type'], // 允许的请求头
//     credentials: true // 允许发送凭证
// }));
// app.use(cors({
//     origin: ['https://galaxy-city.vercel.app', 'http://127.0.0.1:51516'], // 允许的来源
//     methods: ['GET', 'POST', 'OPTIONS'], // 允许的请求方法
//     allowedHeaders: ['Content-Type'], // 允许的请求头
//     credentials: true // 允许发送凭证
// }));


app.use(express.json());

const userDataPath = "./user.json";
const productDataPath = "./product.json"
const buyHistoryDataPath = "./buyHistory.json"


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.stauts === 400 && "body" in err) {
        return res.stauts(400).json({ err: "Invalid JSON input" });
    }
    next(err);
});

app.get("/testing", async (req, res) => {
    console.log("hello")
    res.json({ name: "hello" });
})
app.post("/addproducthistroy", async (req, res) => {
    const newData = req.body;
    const data = await readJsonFile(buyHistoryDataPath);
    data.push(newData);
    //console.log(data);
    await writeJsonFile(buyHistoryDataPath, JSON.stringify(data));
    res.json({ message: "save success" })

})
//reg user
app.post("/reg", async (req, res) => {
    const newData = req.body;
    const data = await findUser();
    
    if (data.findIndex(d => d.name.toLowerCase() === newData.name.toLowerCase()) === -1) {
        data.push(newData);
       // console.log(data);
        await createUser(data);
        res.json({ message: "save success" })
    } else {
        console.log("exist")
        res.json({ message: "existing user" })
    }

})
//login
app.post("/login", async (req, res) => {
    const user = req.body;
    const userData = await findUser();
    const existUser = userData.find(u => u.name === user.name);
    if (existUser && existUser.password == existUser.password) {
        res.json({"message":"login success"})

    }
    else {
        res.send("login failed");
    }
})

app.listen(8080, () => {
    console.log("server is starting on 8080");
})