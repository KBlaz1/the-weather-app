<template>
  <div class="d-flex flex-grow-1">
    <v-toolbar-title>City</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :search-input.sync="search"
      :loading="isLoading"
      :items="items"
      class="mx-4"
      label="weather report"
      flat
      hide-no-data
      hide-details
    />
  </div>
</template>

<script>
export default {
  name: "CitySelector",
  data () {
    return {
      select: null,
      search: null,
      isLoading: false,
      limit: 5,
      entries: []
    }
  },
  computed: {
    items () {
      return this.entries.map(city => city.name)
    }
  },
  watch: {
    search (cityName) {
      // parameter cityName is empty
      if (cityName === null || cityName === "")
        return

      this.isLoading = true

      // Lazily load input items
      this.$axios.$get("https://api.api-ninjas.com/v1/city", {
        params: {
          name: cityName,
          limit: this.limit
        },
        headers: {
          "X-Api-Key": "P25eR3olE3qV3ZPpOhHmuw==X4vKN8dd8aNmvkuv"
        }
      })
        .then((res) => {
          this.entries = res
        })
        .catch((err) => {
          console.log(cityName + err)
        })
        .finally(() => (this.isLoading = false))
    },
    async select (select) {
      if (select === "" || select === null)
        return

      const report = await this.$store.dispatch("weatherReports/getWeatherReport", select)
      this.$store.commit("weatherReports/SET_DISPLAYED_REPORT", report)
    }
  }
}
</script>
