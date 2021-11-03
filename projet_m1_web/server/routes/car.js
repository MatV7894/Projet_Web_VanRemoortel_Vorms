const express = require('express')
const {checkAdmin} = require("../admin");
const {DBConfig} = require("../data/config");
const router = express.Router()
const {Client} = require('pg')

const client = new Client(DBConfig)

client.connect()


/**
 * Cette route envoie l'intégralité des voitures du site
 */
router.get('/', async (req, res) => {
    const result = await client.query({
        text: 'SELECT * FROM cars'
    })
    res.json(result.rows)
})

/**
 * Cette route administrateur crée une voiture dans la BDD.
 */
router.route('/').post(checkAdmin, async (req, res) => {
    console.log('CREATE car')

    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    // Vérification de la validité des données d'entrée
    if (typeof name !== 'string' || name === '' ||
        typeof description !== 'string' || description === '' ||
        typeof image !== 'string' || image === '' ||
        isNaN(price) || price <= 0) {
        res.status(400).json({message: 'bad request'})
        return
    }

    const result = await client.query({
        text: `INSERT INTO cars(name, description, image, price)
               VALUES ($1, $2, $3, $4)
               RETURNING *
        `,
        values: [name, description, image, price]
    })

    // On renvoie la voiture ajoutée à l'utilisateur
    res.json(result.rows[0])
})


/**
 * Cette fonction fait en sorte de valider que la voiture demandée par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 */
async function parseCar(req, res, next) {
    const carId = parseInt(req.params.carId)

    // si carId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
    if (isNaN(carId)) {
        res.status(400).json({message: 'carId should be a number'})
        return
    }
    // on affecte req.carId pour l'exploiter dans toutes les routes qui en ont besoin
    req.carId = carId

    const result = await client.query({
        text: 'SELECT * FROM cars WHERE id=$1',
        values: [carId]
    })
    // const car = cars.find(a => a.id === req.carId)
    if (!result.rows.length) {
        res.status(404).json({message: 'car ' + carId + ' does not exist'})
        return
    }
    // on affecte req.car pour l'exploiter dans toutes les routes qui en ont besoin
    req.car = result.rows[0]
    next()
}

/**
 * Cette route renvoie une voiture demandée
 */
router.route('/:carId').get(parseCar, (req, res) => {
    // req.car existe grâce au middleware parseCar
    // res.status(500).send('testing');
    res.json(req.car)
})

/**
 * Cette route modifie une voiture.
 */
router.route('/:carId').put(parseCar, checkAdmin, async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    await client.query({
        text: `UPDATE cars
               SET name=$1,
                   description=$2,
                   image=$3,
                   price=$4
               WHERE id = $5`,
        values: [name, description, image, price, req.carId]
    })
    res.send()
})

/**
 * Cette route supprime une voiture.
 */
router.route('/:carId').delete(parseCar, checkAdmin, async (req, res) => {
    await client.query({
        text: 'DELETE FROM cars WHERE id=$1',
        values: [req.carId]
    })
    res.send()
})

module.exports = router
