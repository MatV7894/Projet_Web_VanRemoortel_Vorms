<template>
  <div class="container">
    <h1 class="my-4">Gestion des voitures</h1>
    <div class="">
      <article v-for="car in cars" :key="car.id" class="card mb-3">
        <div class="row no-gutters">
          <div class="col-auto">
            <img :src="car.image" alt="" class="" style="width: 200px; height: 100%; object-fit: cover;">
          </div>
          <div v-if="editingCar.id !== car.id" class="col">
            <div class="card-block px-2">
              <h4 class="card-title">{{ car.name }}</h4>
              <p class="card-text">{{ car.description }}</p>
              <div class="mb-1">
                <button class="btn btn-primary" @click="editCar(car)">Modifier</button>
                <button class="btn btn-danger" @click="deleteCar(car.id)">Supprimer</button>
              </div>
            </div>
          </div>

          <div v-else class="col">
            <div class="card-block px-2">
              <!--              <input class="form-control" type="text" v-model="editingCar.name">-->
              <div class="form-row">
                <div class="col-md-8 mb-1">
                  <h4 class="card-title">
                    <input v-model="editingCar.name" class="form-control" placeholder="Modèle" required type="text">
                  </h4>
                </div>
                <div class="col-md-4 mb-1">
                  <div class="input-group">
                    <input v-model="editingCar.price" aria-describedby="inputGroupPrepend" class="form-control"
                           placeholder="Prix journalier" required type="number">
                    <div class="input-group-append">
                      <span class="input-group-text">€</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="card-text">
                <textarea v-model="editingCar.description" class="form-control mb-3"></textarea>
                <input v-model="editingCar.image" class="form-control" placeholder="Lien de l'image" required
                       type="text">
              </p>
              <div class="mb-1">
                <button class="btn btn-primary" @click="sendEditCar()">Valider</button>
                <button class="btn btn-danger" @click="abortEditCar()">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <form @submit.prevent="addCar">
      <h2 class="mb-3">Ajouter une voiture à la flotte</h2>
      <div class="form-row">
        <div class="col-md-8 mb-3">
          <input v-model="newCar.name" class="form-control" placeholder="Modèle" required type="text">
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group">
            <input id="validationCustomUsername" aria-describedby="inputGroupPrepend" class="form-control"
                   placeholder="Prix journalier"
                   required type="number">
            <div class="input-group-append">
              <span id="inputGroupPrepend" class="input-group-text">€</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group"> <textarea v-model="newCar.description" class="form-control mb-3"
                                         placeholder="Description" required
                                         type="text"></textarea></div>
      <div class="form-group"><input v-model="newCar.image" class="form-control" placeholder="Lien vers l'image"
                                     type="text">
      </div>
      <button class="btn btn-primary" type="submit">Ajouter</button>
    </form>
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
textarea {
  width: 100%;
}
</style>