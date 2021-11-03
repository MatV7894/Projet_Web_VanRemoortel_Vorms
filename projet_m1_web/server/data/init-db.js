const cars = require('./cars.js')
const { hash } = require("bcrypt");
const { DBConfig } = require("./config");
const { Client } = require('pg')

const client = new Client(DBConfig)

/**
 * Crée les tables de la BDD
 */
async function createTables() {
    const tables = `create table if not exists users
                    (
                        email    varchar(255) not null,
                        password varchar(255) not null,
                        id       serial       not null
                            constraint users_pk
                                primary key,
                        admin    boolean default false
                    );
    create unique index if not exists users_id_uindex
        on users (id);
    create unique index if not exists users_email_uindex
        on users (email);
    create table if not exists cars
    (
        id          serial not null
            constraint cars_pk
                primary key,
        name        varchar,
        description varchar,
        image       varchar,
        price       integer
    );
    create unique index if not exists cars_id_uindex
        on cars (id);
    create table if not exists reservation
    (
        car_id  integer,
        id      serial not null
            constraint reservation_pk
                primary key,
        user_id integer,
        date    date
    );
    create unique index if not exists reservation_id_uindex
        on reservation (id);`

    await client.query(tables)
    console.log('Tables : OK')
}


async function addCars() {
    for (const car of cars) {
        await client.query({
            text: `INSERT INTO cars(name, description, image, price)
                   VALUES ($1, $2, $3, $4)`,
            values: [car.name, car.description, car.image, car.price]
        })
    }
    console.log('Voitures : OK')
}

async function addAdmin() {
    hash('admin', 10).then(hash => {
        client.query({
            text: `INSERT INTO users(email, password, admin)
                   VALUES ($1, $2, $3)`,
            values: ['admin@admin.fr', hash, true]
        }).then(() => {
            console.log('Admin : OK')
            console.log('Importation terminée')
            client.end()
        }).catch(() => {
            console.log('Admin : FAIL')
            console.log('Importation terminée')
            client.end()
        })
    })
}

client.connect().then(() => {
    createTables()
    addCars()
    addAdmin()
})