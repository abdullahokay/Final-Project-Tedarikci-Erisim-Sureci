<template>
  <v-layout class="d-flex justify-center">
    <div>
      <v-layout class="d-flex flex-column justify-center pt-10 pb-10">
        <div>
          <RequestModal modalTitle="Yeni Talep" v-show=this.$store.state.isModalOpen></RequestModal>
        </div>
        <div class="d-flex justify-center" v-if="$route.name === 'home'">
          <v-btn size="x-large" color="red-darken-4" @click="openModal()">
            <strong>
              Talep Ekle
            </strong>
          </v-btn>
        </div>
        <DataTable />
        <DetailModal v-show="this.$store.state.isDetailModalOpen" />
      </v-layout>
    </div>
  </v-layout>
</template>

<script>
import DataTable from './DataTable.vue';
import RequestModal from './RequestModal.vue';
import DetailModal from './DetailModal.vue';

export default {

  components: {
    RequestModal,
    DataTable,
    DetailModal
  },

  methods: {
    openModal() {
      this.$store.commit('OPEN_REQUEST_MODAL')
    }
  }
};
</script>

<style></style>