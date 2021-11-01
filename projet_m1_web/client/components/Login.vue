<template>
  <form class="form-signin my-4" @submit.prevent="loginUser()">
    <!--    <img class="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
    <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
    <label class="sr-only" for="inputEmail">Adresse email</label>
    <input id="inputEmail" v-model="email" autofocus class="form-control" placeholder="Email" required type="email">
    <label class="sr-only" for="inputPassword">Mot de passe</label>
    <input id="inputPassword" v-model="password" class="form-control" placeholder="Mot de passe" required
           type="password">
    <!--    <div class="checkbox mb-3">-->
    <!--      <label>-->
    <!--        <input type="checkbox" value="remember-me"> Remember me-->
    <!--      </label>-->
    <!--    </div>-->
    <button class="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
    <router-link class="nav-link text-center mb-3 text-muted" to='/register'>Je n'ai pas encore de compte</router-link>
  </form>
</template>

<script>
module.exports = {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  async mounted() {
  },
  methods: {
    loginUser() {
      this.$emit('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>