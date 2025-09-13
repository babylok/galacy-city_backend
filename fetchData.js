
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const userDataPath = "./user.json";
const productDataPath = "./product.json"
const buyHistoryDataPath = "./buyHistory.json"

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


const galaxyUserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
});
const GalaxyUser = mongoose.model('GalaxyUser', galaxyUserSchema);

async function createUser(data) {
  
    await GalaxyUser.create(data);
   
}

async function findUser() {
  
    let data = [];
   
    data = await GalaxyUser.find().catch(error => console.error("Erro find data:", error));

    
    return data;
   
}


async function readJsonFile(dataPath) {
    let getData = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(getData)
}

async function writeJsonFile(datapath, data) {
    return await fs.writeFile(datapath, data);
}

export {createUser,findUser, readJsonFile, writeJsonFile }
