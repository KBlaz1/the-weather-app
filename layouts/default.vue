<template>
  <v-app>
    <!-- city navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :fixed="fixed"
      app
    >
      <city-list />
    </v-navigation-drawer>

    <!-- header -->
    <v-app-bar
      :clipped-left="clipped"
      :fixed="fixed"
      app
    >
      <!-- icons on the left and title-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-spacer />
      <city-selector />
      <v-spacer />
    </v-app-bar>

    <!-- main is here -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- just a footer ... -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import CityList from "~/components/CityList.vue"
import CitySelector from "~/components/CitySelector.vue"
export default {
  name: "DefaultLayout",
  components: { CitySelector, CityList },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      title: "The Weather"
    }
  }
}
</script>
