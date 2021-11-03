const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const VoitureDetails = window.httpVueLoader('./components/VoitureDetails.vue')
const AdminReservations = window.httpVueLoader('./components/AdminReservations.vue')
const AdminCars = window.httpVueLoader('./components/AdminCars.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/car/:id', component: VoitureDetails, props: true },
    { path: '/panier', component: Panier, props: true, name: 'Panier' },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/admin/reservations', component: AdminReservations },
    { path: '/admin/cars', component: AdminCars }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    el: '#app',
    components: {
        vuejsDatepicker,
        'navbar': httpVueLoader('./components/Navbar.vue')
    },
    data: {
        cars: [],
        panier: {
            id: undefined,
            date: undefined,
        },
        user: {},
        isConnected: false,
        redirectTo: undefined
    },
    async mounted() {
        const res = await axios.get('/api/car/')
        this.cars = res.data
        try {
            const res3 = await axios.get('/api/auth/me')
            this.user = res3.data
            this.isConnected = true
        } catch (err) {
            if (err.response ? .status === 401) {
                this.isConnected = false
                this.user = undefined
            } else {
                console.log('error', err)
            }
        }
    },
    methods: {
        async addCar(car) {
            const res = await axios.post('/api/car', car)
            this.cars.push(res.data)
        },
        async addReservation(carId, date) {
            this.panier = { id: carId, date }
            router.push({
                name: 'Panier',
                params: {
                    date: date,
                    // carId: parseInt(this.carId)
                },
                query: {
                    carId: parseInt(carId)
                }
            });
        },
        async updateCar(newCar) {
            await axios.put('/api/car/' + newCar.id, newCar)
            const car = this.cars.find(a => a.id === newCar.id)
            car.name = newCar.name
            car.description = newCar.description
            car.image = newCar.image
            car.price = newCar.price
        },
        async deleteCar(carId) {
            await axios.delete('/api/car/' + carId)
            const index = this.cars.findIndex(a => a.id === carId)
            this.cars.splice(index, 1)
        },
        async login(data) {
            axios.post('/api/auth/login', {
                email: data.email,
                password: data.password
            }).then(result => {
                this.user = result.data
                this.isConnected = true
                this.redirectAfterAuth()
            }).catch(() =>
                console.log('Erreur de connexion'))
        },
        async logout() {
            axios.delete('/api/auth/').then(() => {
                this.user = undefined
                this.isConnected = false
                console.log('Logout success')
                    // Si l'utilisateur est dans un /admin, on le remet à l'accueil
                if (this.$route.path.startsWith('/admin')) {
                    this.$router.push('/')
                }
            })
        },
        async register(email, password) {
            axios.post('/api/auth/register', {
                email: email,
                password: password
            }).then(result => {
                this.user = result.data
                this.isConnected = true
                this.redirectAfterAuth()
            }).catch(() =>
                console.log('Erreur inscription'))
        },
        redirectAfterAuth() {
            if (this.redirectTo === undefined) {
                this.$router.push('/')
            } else {
                this.$router.push(this.redirectTo)
                this.redirectTo = undefined
            }
        },
        setRedirectPath(path) {
            console.log('Define redirectTO')
            this.redirectTo = path;
            console.log(this.redirectTo)
        }
    }
});