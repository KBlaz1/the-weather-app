<template>
  <v-list>
    <v-list-item
      v-for="item in items"
      :key="item.id"
      nuxt
      :to="item.name"
    >
      <v-list-item-content>
        {{ item.name }}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "CityList",
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.items = this.$store.state.weatherReports.weatherReports
  },
  computed: {
    onWeatherReportsChange () {
      return this.$store.state.weatherReports.weatherReports
    }
  },
  watch: {
    onWeatherReportsChange (newItems) {
      this.items = newItems
    }
  }
}
</script>
