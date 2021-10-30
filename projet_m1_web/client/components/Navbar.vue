<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to='/'>AutoRental</router-link>
      <button aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-target="#navbarText" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarText" class="collapse navbar-collapse" style="flex-grow: 0">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to='/' active-class="active" exact>Nos voitures</router-link>

          </li>
          <!--          <li class="nav-item">
                      <router-link class="nav-link" to='/panier' active-class="active">Mes réservations</router-link>
                    </li>-->
          <li v-if="!isConnected" class="nav-item">
            <router-link class="nav-link" to='/login' active-class="active">Connexion</router-link>
          </li>
          <li v-if="!isConnected" class="nav-item">
            <router-link class="nav-link" to='/register' active-class="active">Inscription</router-link>
          </li>
          <li v-if="isConnected && user.admin" class="nav-item">
            <router-link class="nav-link" to='/admin/reservations' active-class="active">Réservations</router-link>
          </li>
          <li v-if="isConnected && user.admin" class="nav-item">
            <router-link class="nav-link" to='/admin/cars' active-class="active">Éditer les voitures</router-link>
          </li>
          <li v-if="isConnected" class="nav-item">
            <button class="btn btn-primary" @click="logout">Déconnexion</button>
          </li>

        </ul>

      </div>
    </div>
  </nav>
</template>


<script>
module.exports = {
  name: 'Navbar',
  props: ['isConnected', 'user', 'panier'],
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

</style>
