import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cities = window.localStorage.getItem('cities');

export default new Vuex.Store({
  state: {
    cities: cities ? JSON.parse(cities) : [],
  },
  mutations: {
    addToCities(state, chosenCity) {
      state.cities.push(chosenCity);
      this.commit('saveData');
    },
    clearCities(state) {
        state.cities = [];
    },
    saveData(state) {
        window.localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    removeCityFromCities(state, city) {
        let index = state.cities.indexOf(city);
        state.cities.splice(index, 1);
        this.commit('saveData');
    },
  },
})
