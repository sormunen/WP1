/* const url = '/api/topics'; */
const Pool = require('pg').Pool;
const config = require('./config');

const pool = new Pool(config.conopts);

// Get all topics from database
function getAllTopics(callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('SELECT * FROM topic', (err, data) => {
                if (err) throw err;
                client.release();
                callback(data.rows);
            });
    });
}
// Get single topic from database
function getSingleTopic(req, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('SELECT * FROM topic where id = $1', [req.params.id], (err, data) => {
                if (err) throw err;
                client.release();
                callback(data.rows);
            });
    });
}
//Creating topic
function createTopic(req, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('INSERT INTO topic(title, detail, src, inprog) VALUES($1, $2, $3, $4)',
                [req.body.title, req.body.detail, req.body.src, req.body.inprog], (err, data) => {
            if (err) throw err;
            client.release();
            callback();
        });
    });
}
//Removing topic based on id
function removeTopic(req, res, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('DELETE FROM topic WHERE id = $1',
            [parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                // kerrotaan että onnistui
                res.status(202)
                    .json({
                        status: 'Onnistui',
                        message: 'Poistettiin topic.'
                    });
                callback();
            });
    });
}
// Updating topic based on id
function updateTopic(req, res, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('UPDATE topic SET title = $1, detail = $2, src = $3, inprog = $4 WHERE id = $5',
            [req.body.title, req.body.detail, req.body.src, req.body.inprog, parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                res.json(req.body)
                callback(res.body);
            });
    });
}

    module.exports = {getAllTopics, getSingleTopic, createTopic, removeTopic, updateTopic};