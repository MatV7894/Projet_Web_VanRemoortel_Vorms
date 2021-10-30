<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3"><strong>Louer une voiture,</strong><br/> en quelques clics</h1>
        <p>Chez AutoRental, la satisfaction client est notre priorité.</p>
        <!--        <p><router-link :to="/about-us" class="btn btn-primary btn-lg"  role="button">En savoir plus &raquo;</router-link></p>-->
      </div>
    </div>

    <div class="container">
      <div class="card-columns">
        <article v-for="car in cars" :key="car.id" class="card">
          <img :src="car.image" alt="Voiture" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ car.name }}</h5>
            <h5 class="card-subtitle mb-2"><strong>{{ car.price }}€</strong>/jour</h5>
            <p class="card-text">{{ car.description }}</p>
            <router-link :to="{path: '/car/' + car.id}"
                         class="btn btn-primary"
                         type="button">Louer cette voiture
            </router-link>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    cars: {type: Array, default: []}
  },
  data() {
    return {
      newCar: {
        name: '',
        description: '',
        image: '',
        price: 0
      },
      editingCar: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  },
  methods: {

    addCar() {
      this.$emit('add-car', this.newCar)
    },
    deleteCar(carId) {
      this.$emit('delete-car', carId)
    },
    editCar(car) {
      this.editingCar.id = car.id
      this.editingCar.name = car.name
      this.editingCar.description = car.description
      this.editingCar.image = car.image
      this.editingCar.price = car.price
    },
    sendEditCar() {
      this.$emit('update-car', this.editingCar)
      this.abortEditCar()
    },
    abortEditCar() {
      this.editingCar = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 545px) {
  .card-columns {
    column-count: 2;
  }
}

@media (min-width: 800px) {
  .card-columns {
    column-count: 3;
  }
}
</style>
