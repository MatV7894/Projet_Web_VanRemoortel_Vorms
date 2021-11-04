const {DBConfig} = require("./data/config");
const {Client} = require('pg')

const client = new Client(DBConfig)
client.connect()

async function checkAdmin(req, res, next) {
    console.log(req)
    if (req.session.userId) {
        const result = await client.query({
            text: 'SELECT admin FROM users WHERE id=$1',
            values: [req.session.userId]
        })
        if (result.rows[0].admin) {
            next()
        } else {
            res.status(403).json({
                message: 'You are not admin!'
            })
        }
    } else {
        res.status(403).json({
            message: 'You are not admin!'
        })
    }
}

module.exports.checkAdmin = checkAdmin;
