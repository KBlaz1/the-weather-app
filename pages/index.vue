<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="weatherReport != null" class="d-flex flex-column">
        <v-card-title class="headline">
          Weather today in {{ cityName }}
        </v-card-title>
        <v-card-subtitle class="d-flex align-center justify-center">
          <span class="text-h3">{{ main.temp_feelsLike }}&deg;</span>
          <img
            :src="weather.icon"
          >
        </v-card-subtitle>
        <v-card-text>
          <hr class="my-3">
          <v-row>
            <!-- left -->
            <v-col>
              <v-row>
                <v-col>
                  <v-icon>mdi-card-text</v-icon> Description
                </v-col>
                <v-col>
                  {{ weather.description }}
                </v-col>
              </v-row>
              <hr>
              <v-row>
                <v-col>
                  <v-icon>mdi-thermometer</v-icon>High/Low
                </v-col>
                <v-col>
                  {{ main.temp_high }}&deg;/{{ main.temp_low }}&deg;
                </v-col>
              </v-row>
              <hr>
              <v-row>
                <v-col>
                  <v-icon>mdi-water-percent</v-icon> Humidity
                </v-col>
                <v-col>
                  {{ main.humidity }}%
                </v-col>
              </v-row>
              <hr>
            </v-col>

            <!-- right -->
            <v-col cols="12" lg="6">
              <v-row>
                <v-col>
                  <v-icon>mdi-weather-windy</v-icon> Wind
                </v-col>
                <v-col>
                  {{ wind.speed }} m/s
                </v-col>
              </v-row>
              <hr>
              <v-row>
                <v-col>
                  <v-icon>mdi-eye</v-icon> Visibility
                </v-col>
                <v-col>
                  {{ visibility }} m
                </v-col>
              </v-row>
              <hr>
              <v-row>
                <v-col>
                  <v-icon>mdi-format-vertical-align-center</v-icon> Pressure
                </v-col>
                <v-col>
                  {{ main.pressure }} hPa
                </v-col>
              </v-row>
              <hr>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  data () {
    return {
      weatherReport: null,
      cityName: "",
      visibility: "",
      main: {
        temp_feelsLike: "",
        temp_high: "",
        temp_low: "",
        humidity: "",
        pressure: ""
      },
      wind: {
        speed: "",
        direction: ""
      },
      weather: {
        main: "",
        description: "",
        icon: ""
      }
    }
  },
  computed: {
    displayedWeatherReport () {
      return this.$store.state.weatherReports.displayedReport
    }
  },
  watch: {
    displayedWeatherReport (newReport) {
      this.parseWeatherReport(newReport)
      console.log("displayed report updated")
    }
  },
  async mounted () {
    /*
    await this.$axios.$get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: "ljubljana",
        units: "metric",
        appid: "0c6d6e357f5d50cb255cc984321a9319"
      }
    })
      .then((res) => {
        this.parseWeatherReport(res)
        console.log("res:" + res)
      })
      .catch(err => console.log(err))
      */
  },
  methods: {
    parseWeatherReport (data) {
      this.weatherReport = data
      this.cityName = data.name
      this.visibility = data.visibility
      this.main.temp_feelsLike = data.main.feels_like
      this.main.temp_high = data.main.temp_max
      this.main.temp_low = data.main.temp_min
      this.main.humidity = data.main.humidity
      this.main.pressure = data.main.pressure
      this.wind.speed = data.wind.speed
      this.wind.direction = data.wind.deg
      this.weather.main = data.weather[0].main
      this.weather.description = data.weather[0].description
      this.weather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
  }
}
</script>
