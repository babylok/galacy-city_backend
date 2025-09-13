import mongoose from "mongoose";
import { promises as fs } from 'fs';

const userDataPath = "./user.json";
const productDataPath = "./product.json"
const buyHistoryDataPath = "./buyHistory.json"


async function readJsonFile(dataPath){
   let getData= await fs.readFile(dataPath,'utf8');
   return JSON.parse(getData)
}

async function writeJsonFile(datapath, data) {
    return await fs.writeFile(datapath, data);
}

export {readJsonFile,writeJsonFile}
