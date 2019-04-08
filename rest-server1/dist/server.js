"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const database_1 = require("./database");
const value_1 = require("./value");
class Server {
    constructor(port) {
        this._port = port;
        this._server = express();
        this._server.use(bodyParser.urlencoded());
        this._server.use(bodyParser.json());
        this._server.get('/data', (req, res) => this.handleGetData(req, res));
        this._server.put('/data', (req, res) => this.handlePutData(req, res));
        this._server.delete('/data', (req, res) => this.handleDeleteData(req, res));
        this._server.post('/data', (req, res) => this.handlePostData(req, res));
        this._server.get('/dataset', (req, res) => this.handleGetDataSet(req, res));
    }
    start() {
        this._server.listen(this._port);
        console.log('Server auf Port ' + this._port + ' gestartet');
    }
    handleGetData(req, res) {
        console.log('Server ' + this._port);
        const index = +req.query.id;
        if (index >= 0 && index < database_1.Database.getInstance().size()) {
            res.json(database_1.Database.getInstance().get(index));
        }
        else {
            res.status(400).send('invalid index');
        }
    }
    handlePutData(req, res) {
        try {
            const m = new value_1.Value(req.body.temp, req.body.power);
            try {
                database_1.Database.getInstance().add(m);
                res.send({ id: database_1.Database.getInstance().size() - 1 });
            }
            catch (err) {
                res.status(500).send('500 Server Error');
            }
        }
        catch (err) {
            res.status(400).send('400 Bad Request');
        }
    }
    handlePostData(req, res) {
        try {
            const id = +req.query.id;
            const power = req.body.power;
            const temp = req.body.temp;
            if (id >= 0 && id < database_1.Database.getInstance().size()) {
                try {
                    database_1.Database.getInstance().edit(id, temp, power);
                    res.status(200).end();
                }
                catch (err) {
                    res.status(500).send('500 Server Error');
                }
            }
            else {
                throw new Error('invalid index ' + id);
            }
        }
        catch (_a) {
            res.status(400).send('400 Bad request');
        }
    }
    handleDeleteData(req, res) {
        try {
            const id = +req.query.id;
            if (id >= 0 && id < database_1.Database.getInstance().size()) {
                database_1.Database.getInstance().remove(id);
                res.status(200).end();
            }
            else {
                throw new Error('invalid index ' + id);
            }
        }
        catch (err) {
            res.status(400).send('400 Bad Request');
        }
    }
    handleGetDataSet(req, res) {
        res.json(database_1.Database.getInstance().getAll());
    }
}
exports.Server = Server;

//# sourceMappingURL=server.js.map
