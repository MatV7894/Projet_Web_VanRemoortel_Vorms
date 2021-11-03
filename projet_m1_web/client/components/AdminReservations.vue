<template>
  <div class="container">
    <h1 class="my-4">Réservations</h1>
    <article v-for="reservation in reservations" :key="reservations.id" class="card mb-3">
      <div v-if="editingReservation.id !== reservation.id">
        <div class="card-block px-2">
          <h3 class="card-title">{{ reservation.date | localeDate }} - ID {{ reservation.id }}</h3>
          <div class="card-text">Client #{{ reservation.user_id }} ({{ reservation.email }})<br/>
            Voiture #{{ reservation.car_id }} ({{ reservation.name }})
          </div>
          <div class="mb-1">
            <button class="btn btn-primary" @click="editReservation(reservation)">Modifier</button>
            <button class="btn btn-danger" @click="deleteReservation(reservation.id)">Supprimer</button>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="card-block px-2">
          <div class="form-row">
            <div class="col-md-8 mb-1">
              <h3 class="card-title">Réservation ID {{ reservation.id }}</h3>
            </div>
          </div>
          <p class="card-text">
            <vuejs-datepicker v-model="editingReservation.date"
                              :bootstrap-styling="true"
                              :full-month-name="true"
                              :language="fr"
                              :monday-first="true"></vuejs-datepicker>
          <div class="form-group">
          <label>ID client</label>
            <input v-model="editingReservation.user_id" class="form-control mb-3" required
                   placeholder="Identifiant client"
                   type="number"/></div>
          <div class="form-group">
            <label>ID voiture</label>
            <input v-model="editingReservation.car_id" class="form-control" placeholder="Identifiant voiture" required
                   type="number"></div>
          </p>
          <div class="mb-1">
            <button class="btn btn-primary" @click="sendEditReservation()">Valider</button>
            <button class="btn btn-danger" @click="abortEditReservation()">Annuler</button>
          </div>
        </div>
      </div>

      <!--  <div class="reservationd-body" v-if="editingReservation.id !== reservation.id">
          <div class="reservationd-title">
            <h2>{{ reservation.name }} - {{ reservation.price }}€</h2>
            <div>
              <button class="btn btn-primary" @click="editReservation(reservation)">Modifier</button>
              <button class="btn btn-danger" @click="deleteReservation(reservation.id)">Supprimer</button>
            </div>
          </div>
          <p>{{ reservation.description }}</p>
        </div>
        <div class="reservation-content" v-else>
          <div class="reservation-title">
            <h2><input type="text" v-model="editingReservation.name"> - <input type="number" v-model="editingReservation.price"></h2>
            <div>
              <button class="btn btn-primary" @click="sendEditReservation()">Valider</button>
              <button class="btn btn-danger" @click="abortEditReservation()">Annuler</button>
            </div>
          </div>
          <p><textarea v-model="editingReservation.description"></textarea></p>
          <input type="text" v-model="editingReservation.image" placeholder="Lien vers l'image">
        </div>-->
    </article>

    <!--      <form @submit.prevent="addReservation">
            <h2>Nouveau produit à ajouter</h2>
            <input type="text" v-model="newArticle.name" placeholder="Nom du produit" required>
            <input type="number" v-model="newArticle.price" placeholder="Prix" required>
            <textarea type="text" v-model="newArticle.description" required></textarea>
            <input type="text" v-model="newArticle.image" placeholder="Lien vers l'image">
            <button type="submit">Ajouter</button>
          </form>-->

  </div>
</template>

<script>
module.exports = {
  props: {
    panier: {type: Object},
  },
  components: {
    vuejsDatepicker
  },
  filters: {
    localeDate: function (value) {
      if (!value)
        return ''
      return new Date(value).toLocaleDateString()
    }
  },
  data() {
    return {
      reservations: [],
      reservationId: this.$route.params.id,
      date: new Date(),
      disabledDates: {
        to: new Date(), // Disable all dates up to specific date
      },
      editingReservation: {
        id: -1,
        user_id: -1,
        car_id: -1,
        date: new Date()
      },
      fr: vdp_translation_fr.js,
    }
  },
  methods: {
    async getReservation() {
      const res = await axios.get('/api/reservation/')
      this.reservations = res.data
      console.log(this.reservations)
    },
    addReservation(date) {
      console.log(date)
      console.log(this.date)
      this.$emit('add-reservation', this.reservationId, date)
    },
    editReservation(reservation) {
      this.editingReservation.id = reservation.id
      this.editingReservation.car_id = reservation.car_id
      this.editingReservation.user_id = reservation.user_id
    },
    async sendEditReservation() {
      await axios.put('/api/reservation/' + this.editingReservation.id, this.editingReservation)
      this.abortEditReservation()
    },
    abortEditReservation() {
      this.editingReservation = {
        id: -1,
        user_id: '',
        car_id: 0
      }
    },
    async deleteReservation(reservationId) {
      console.log('DELETE')
      await axios.delete('/api/reservation/' + reservationId)
      const index = this.reservations.findIndex(a => a.id === reservationId)
      this.reservations.splice(index, 1)
    },
  },
  created() {
    console.log('Created')
    this.getReservation();
  },
}
</script>

<style scoped>
</style>