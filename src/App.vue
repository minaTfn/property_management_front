
<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
    >
      <sidebar />
    </v-navigation-drawer>

    <Snackbar />

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <router-link to="/home" >home </router-link>
      <router-link to="/user-info" >user info</router-link>
      <router-link to="/register" >register</router-link>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="container py-10 px-md-2 px-lg-14">
        <transition
                :duration="{ enter: 800, leave: 1 }"
                enter-active-class="animated fadeIn"
                leave-active-class="animated slideOut"
        >
          <router-view />
        </transition>
      </div>
    </v-main>
  </v-app>
</template>
<script>
  import Sidebar from "./components/Sidebar";
  import Snackbar from './components/Snackbar'

  export default {
    components: {Sidebar, Snackbar },
    data() {
      return {
        drawer: false,
      }
    },
  }
</script>

