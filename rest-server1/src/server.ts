import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Database } from './database';
import { Value } from './value';

export class Server {

    private _port: number;
    private _server: express.Express;

    constructor (port: number) {
        this._port = port;
        this._server = express();

        // Entschlüsseln der Parameter der URL
        // Attribut query
        this._server.use(bodyParser.urlencoded());

        // Entschlüsseln der Daten im Body
        // im JSON Format
        this._server.use(bodyParser.json());

        // this._server.get('/data', this.handleGetData.bind(this));
        this._server.get('/data',
            (req, res) => this.handleGetData(req, res));
        this._server.put('/data',
            (req, res) => this.handlePutData(req, res));
        this._server.delete('/data',
            (req, res) => this.handleDeleteData(req, res));
        this._server.post('/data',
            (req, res) => this.handlePostData(req, res));
        this._server.get('/dataset',
            (req, res) => this.handleGetDataSet(req, res));
    }

    start () {
        this._server.listen(this._port);
        console.log('Server auf Port ' + this._port + ' gestartet');
    }

    private handleGetData(req: express.Request, res: express.Response) {
        console.log('Server ' + this._port);
        const index = +req.query.id;
        if (index >= 0 && index < Database.getInstance().size()) {
            res.json(Database.getInstance().get(index));
        } else {
            res.status(400).send('invalid index');
        }
    }

    private handlePutData(req: express.Request, res: express.Response) {
        try {
            const m = new Value(req.body.temp, req.body.power);
            try {
                Database.getInstance().add(m);
                // Status 200
                res.send({id: Database.getInstance().size() - 1});
            } catch (err) {
                res.status(500).send('500 Server Error');
            }
        } catch (err) {
            res.status(400).send('400 Bad Request');
        }
    }

    private handlePostData(req: express.Request, res: express.Response) {
        try {
            const id = +req.query.id;
            const power = req.body.power;
            const temp = req.body.temp;
            if (id >= 0 && id < Database.getInstance().size()) {
                try {
                    Database.getInstance().edit(id, temp, power);
                    res.status(200).end();
                } catch (err) {
                    res.status(500).send('500 Server Error');
                }
            } else {
                throw new Error('invalid index ' + id);
            }
        } catch {
            res.status(400).send('400 Bad request');
        }
    }

    private handleDeleteData(req: express.Request, res: express.Response) {
        try {
            const id = +req.query.id;
            if (id >= 0 && id < Database.getInstance().size()) {
                Database.getInstance().remove(id);
                res.status(200).end();
            } else {
                throw new Error('invalid index ' + id);
            }
        } catch (err) {
            res.status(400).send('400 Bad Request');
        }
    }

    private handleGetDataSet(req: express.Request, res: express.Response) {
        res.json(Database.getInstance().getAll());
    }
}
