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
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const CryptoCurrenciesRouter_1 = __importDefault(require("./router/CryptoCurrenciesRouter"));
require("./jobs/updatePrice");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const db = new database_1.default();
            yield ((_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync());
            yield db.importData();
        });
    }
    routes() {
        this.app
            .route("/")
            .get((req, res) => res.send("hello worldss"));
        this.app.use("/api/v1/cryptocurrencies", CryptoCurrenciesRouter_1.default);
    }
}
const app = new App().app;
const port = 8000;
app.listen(port, () => {
    console.log("✅ Server started successfully!");
});
