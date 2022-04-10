// state
export const state = () => ({
  weatherReports: [],
  displayedReport: {}
})

// getters
export const getters = {
  getByCityName: state => (name) => {
    return state.weatherReports.find(r => r.name === name)
  }
}

// actions
export const actions = {
  async getWeatherReport ({ commit }, cityName) {
    try {
      const fetchedReport = await this.$axios.$get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: cityName,
          units: "metric",
          appid: "0c6d6e357f5d50cb255cc984321a9319"
        }
      })
      commit("SET_REPORT", fetchedReport)
      return fetchedReport
    } catch (err) {
      console.log(err)
    }
  },
  getCitiesFromStorage ({ commit }) {
    if (localStorage.getItem("cities") !== null) {
      const cities = JSON.parse(localStorage.getItem("cities"))
      cities.forEach(city => commit("SET_REPORT", city))
    }
  }
}

// mutations
export const mutations = {
  SET_REPORT (state, report) {
    const weatherReportFound = state.weatherReports.find(r => r.name === report.name)

    if (weatherReportFound === undefined)
      state.weatherReports.push(report)
    else
      state.weatherReports[state.weatherReports.indexOf(weatherReportFound)] = report

    localStorage.setItem("cities", JSON.stringify(state.weatherReports.map(report => ({ name: report.name }))))
  },
  SET_DISPLAYED_REPORT (state, report) {
    state.displayedReport = report
  }
}
