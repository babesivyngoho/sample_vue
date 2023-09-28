<template>
  <v-app class="default-font">
    <v-app-bar
      class="app-bar-style"
      color="#6C4A3F"
      float
    >
      <v-app-bar-title class="logo font-weight-white">
        <b>sAPPat</b>
      </v-app-bar-title>
      
      <v-spacer/>

      <template v-if="this.$store.getters.isAuthenticated()">
        <v-btn color="#ffffff" class="text-uppercase" :to="'/home'">
          Home
        </v-btn>
      </template>

      <template v-for="tab in tabs">
        <v-btn color="#ffffff" class="text-uppercase" :to="tab.route">
          {{ tab.name }}
        </v-btn>
      </template>

      <!-- LOGIN - change if not authenticated -->
      <template v-if="this.$store.getters.isAuthenticated()">
        <div class="nav-btn-style">
          <v-btn color="#ffffff" class="text-uppercase" @click="logoutUser">
            Logout
          </v-btn>
        </div>
      </template>
      <template v-else>
        <div class="nav-btn-style">
          <v-btn color="#ffffff" class="text-uppercase" :to="'/login'">
            Login
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid class="main-style" fill-height>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data(){
    return {
      tabs: [
        {name: "About", route: "/about"},
        {name: "Contact", route: "/contact"},
        {name: "FAQ", route: "/faq"},
      ],
    }
  },
  methods: {
    logoutUser(){
      this.$store.dispatch("logoutUser")
    }
  },
  mounted: function() {
		let elHtml = document.getElementsByTagName('html')[0]
		elHtml.style.overflowY = 'auto'
	},
	destroyed: function() {
		let elHtml = document.getElementsByTagName('html')[0]
		elHtml.style.overflowY = null
	},
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito');
  body{
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
    // font-family: 'Nunito';
	}
	#app{
		width: 100%;
		height: 100%;
	}
  .logo{
		color: rgba(255, 255, 255, 0.6);
		letter-spacing: 5px;
		font-size: 1.5em;
	}
  .default-font {
		font-family: 'Nunito';
	}

  .main-style{
    padding-top: 3%;
    padding-left: 15%;
    padding-right: 15%;
  }
  .app-bar-style{
    padding-left: 12%;
    
  }
  .nav-btn-style{
    padding-right: 12%;
  }
</style>
