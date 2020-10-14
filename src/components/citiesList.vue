<template>
  <div class="citiesModal">
    <div class="modal fade" id="citiesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-secondary text-light">
            <h5 class="modal-title" id="exampleModalLabel">My cities</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6 v-if="this.$store.state.cities.length == 0">There are currently no cities in your database.</h6>
            <ul class="list-group">
              <li
                v-for="city in this.$store.state.cities"
                v-bind:key="city.id"
                class="city-list-item media list-group-item list-group-item-action"
              >
                <span class="city-list-text"><i class="fas fa-map-marker-alt"></i> {{ city.name }}</span>
                <button class="city-list-button btn btn-danger float-right" @click="$store.commit('removeCityFromCities', city)">Remove</button>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "citiesModal",
  methods: {
    checkout() {
      $("#modalZaKorpu").modal("hide");
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 650px){
    .city-list-item {
        display: flex;
        flex-direction: column;
        align-items: center
    }
    .city-list-text {
        text-align: center;
        padding: 0
    }
    .city-list-button {
        margin-top: 5%;
    }
}
</style>