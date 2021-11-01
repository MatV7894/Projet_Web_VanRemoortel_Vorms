<template>
  <div class="container">
    <article class="card mt-4" v-if="car">
      <img :src="car.image" alt="Voiture" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{ car.name }}</h5>
        <h5 class="card-subtitle mb-2"><strong>{{ car.price }}€</strong>/jour</h5>
        <p class="card-text">{{ car.description }}</p>
      </div>
    </article>
    <div class="card mt-4">
      <vuejs-datepicker v-model="date"
                        :bootstrap-styling="true"
                        :disabled-dates="disabledDates"
                        :full-month-name="true"
                        :language="fr"
                        :monday-first="true"></vuejs-datepicker>
      <button class="btn btn-primary mt-4" type="button" @click="addReservation(date)">Réserver</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    cars: {type: Array, default: []}
  },
  components: {
    vuejsDatepicker
  },
  data() {
    return {
      car: {},
      carId: this.$route.params.id,
      date: new Date(),
      disabledDates: {
        to: new Date(), // Disable all dates up to specific date
      },
      fr: vdp_translation_fr.js
    }
  },
  methods: {
    async getCar() {
      this.car = this.cars.find(car => car.id == this.carId)
      if (!this.car) {
        const res = await axios.get('/api/car/' + this.carId)
        this.car = res.data
      }
    },
    addReservation(date) {
      this.$emit('create-reservation', this.carId, date)
      /*router.push({
        name: 'Panier',
        params: {
          date: date,
          // carId: parseInt(this.carId)
        },
        query:{
          carId: parseInt(this.carId)
        }
      });*/
      // this.$emit('add-reservation', this.carId, date)
    },
  },
  created() {
    console.log('Created')
    this.getCar();
  },
}
</script>

<style scoped>
</style>