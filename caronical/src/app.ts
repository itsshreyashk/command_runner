import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config()
const app: Application = express();
const server: http.Server = http.createServer(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;


function getFileContent(file_path : string) : string {
    const contents = fs.readFileSync(file_path, 'utf-8');
    return contents;
}
function getFilePath(file_name : string) : string {
    const file_path = path.join('static', file_name)
    return file_path;
}



app.use('/public', express.static(path.join('public')));
app.use(express.json())
app.use(cors({
    origin : "*"
}));

app.get('/', (req : Request, res : Response)=> {
    try {
        const file_path : string = getFilePath("index.html"); 
        res.send(getFileContent(file_path))
    } catch (err : any) {
        res.send(`Error : ${err}`)
    }
})


app.post('/command', (req : Request, res : Response)=> {
    const body : any = req.body;
    const command = body.command;
    res.send("lol")
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});