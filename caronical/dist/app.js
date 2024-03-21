"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
function getFileContent(file_path) {
    const contents = fs_1.default.readFileSync(file_path, 'utf-8');
    return contents;
}
function getFilePath(file_name) {
    const file_path = path_1.default.join('static', file_name);
    return file_path;
}
app.use('/public', express_1.default.static(path_1.default.join('public')));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.get('/', (req, res) => {
    try {
        const file_path = getFilePath("index.html");
        res.send(getFileContent(file_path));
    }
    catch (err) {
        res.send(`Error : ${err}`);
    }
});
app.post('/command', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const command = (body.command);
    console.log(command);
    const answer = yield (yield fetch("http://localhost:3000/run/command", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            command: command
        })
    })).text();
    res.send(answer);
}));
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
