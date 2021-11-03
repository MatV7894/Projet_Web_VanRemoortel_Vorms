const express = require('express')
const router = express.Router()
const {checkAdmin} = require("../admin");
const {DBConfig} = require("../data/config");
const {Client} = require('pg')


const client = new Client(DBConfig)

client.connect()

/**
 * Cette route rajouter une réservation pour l'utilisateur qui l'utilise.
 */
router.post('/', async (req, res) => {

    let date = new Date()
    let car = req.body.car

    date = new Date(req.body.date)
    let user_id = 1
    if (!req.session || typeof req.session.userId === 'undefined') {
        res.status(401).json({message: 'not connected'})
        return
    } else {
        user_id = req.session.userId
    }

    // vérification de la validité des données d'entrée
    /*       if (typeof name !== 'string' || name === '' ||
               typeof description !== 'string' || description === '' ||
               typeof image !== 'string' || image === '' ||
               isNaN(price) || price <= 0) {
             res.status(400).json({ message: 'bad request' })
             return
           }*/

    try {
        const text = 'INSERT INTO reservation(car_id, user_id, date) VALUES ($1, $2, $3) RETURNING *'
        const result = await client.query(text, [car, user_id, date])

        res.json(result.rows[0])
    } catch (err) {
        res.status(500).send(err);
    }
})

/**
 * Cette route d'admin renvoie toutes les réservations et les clients associés
 */
router.route('/').get(checkAdmin, async (req, res) => {
    const result = await client.query({
        text: `SELECT reservation.date,
                      reservation.car_id,
                      reservation.user_id,
                      reservation.id,
                      users.email,
                      cars.name,
                      cars.price
               FROM reservation
                        JOIN users ON reservation.user_id = users.id
                        JOIN cars ON reservation.car_id = cars.id`
    })
    res.json(result.rows)
})

/**
 * Cette route permet de modifier une réservation.
 */
router.route('/:reservationId').put(checkAdmin, async (req, res) => {
    const date = req.body.date
    const car_id = req.body.car_id
    const user_id = req.body.user_id
    const id = req.body.id

    await client.query({
        text: `UPDATE reservation
               SET date=$1,
                   car_id=$2,
                   user_id=$3
               WHERE id = $4`,
        values: [date, car_id, user_id, id],
    })
    res.send()
})

/**
 * Cette route permet de supprimer une réservation
 */
router.route('/:reservationId').delete(checkAdmin, async (req, res) => {
    await client.query({
        text: 'DELETE FROM reservation WHERE id=$1',
        values: [req.params.reservationId]
    })
    res.send()
})

module.exports = router
