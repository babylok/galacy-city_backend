
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
   
    data = await GalaxyUser.find();

    
    return data;
   
}


async function editUser(user,data){
    await GalaxyUser.findOneAndUpdate(user, data);
}   


async function readJsonFile(dataPath) {
    let getData = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(getData)
}

async function writeJsonFile(datapath, data) {
    return await fs.writeFile(datapath, data);
}

//const ty1=await readJsonFile("./beds/BEDS_VHCLCLASS_EXAMCODE_TY1.json");
//const ty2=await readJsonFile("./beds/BEDS_VHCLCLASS_EXAMCODE_TYG.json");
//console.log(JSON.stringify(ty1))
//await writeJsonFile("./beds/ty1.json",JSON.stringify(ty1));
//await writeJsonFile("./beds/ty2.json",JSON.stringify(ty2));

export {createUser,findUser,editUser, readJsonFile, writeJsonFile }
