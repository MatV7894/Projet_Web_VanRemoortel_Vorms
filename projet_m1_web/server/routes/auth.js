const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {DBConfig} = require("../data/config");
const {Client} = require('pg')

const client = new Client(DBConfig)

client.connect()

/**
 * Cette route connecte un utilisateur (création d'une session) et lui renvoie son utilisateur
 */
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
    })

    if (result.rows.length === 0) {
        res.status(401).json({
            message: 'user doesnt exist'
        })
        return
    }
    // si on a pas trouvé l'utilisateur
    // alors on le crée
    const user = result.rows[0]

    if (await bcrypt.compare(password, user.password)) {
        // alors connecter l'utilisateur
        req.session.userId = user.id
        res.json({
            id: user.id,
            email: user.email,
            admin: user.admin
        })
    } else {
        res.status(401).json({
            message: 'bad password'
        })

    }
})

/**
 * Cette route crée un nouvel utilisateur et le renvoie.
 */
router.post('/register', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
    })

    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'user already exists'
        })
        return
    }
    // si on a pas trouvé l'utilisateur
    // alors on le crée
    // TODO checker directement vu que email est unique dans la db

    const hash = await bcrypt.hash(password, 10)

    const resultLoggin = await client.query({
        text: `INSERT INTO users(email, password)
               VALUES ($1, $2)
               RETURNING id, email, admin
        `,
        values: [email, hash]
    })
    req.session.userId = resultLoggin.rows[0].id
    res.json(resultLoggin.rows[0])
})

/**
 * Cette route renvoie l'utilisateur connecté, pour vérifier la connexion
 */
router.get('/me', async (req, res) => {
    console.log('Get me')
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({message: 'not connected'})
        return
    }

    const result = await client.query({
        text: 'SELECT id, email, admin FROM users WHERE id=$1',
        values: [req.session.userId]
    })

    res.json(result.rows[0])
})

/**
 * Cette route déconnecte un utilisateur et supprime sa session
 */
router.delete('/', async (req, res) => {
    console.log('DELETE Auth')
    if (typeof req.session === 'undefined') {
        res.status(401).json({message: 'not connected'})
        return
    }
    req.session.destroy(err => {
        res.status(200).json({message: 'Logout success'})
    })

})

module.exports = router
