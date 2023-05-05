<template>
  <v-layout class="d-flex justify-center">
    <div class="notice-wrapper pt-5 pb-5 pl-5 pr-5 mt-10" v-if="this.filteredRequestList.length === 0">
      <div>
        <v-card variant="outlined">
          <v-alert type="info" title="No Data" text="Henüz Gösterilecek Bir Talep Bulunamadı!">
          </v-alert>
        </v-card>
      </div>
    </div>
    <div class="data-table-wrapper pt-5 pb-5 pl-5 pr-5 mt-10" v-else>
      <v-data-table :headers="dataTableHeaders" :items="filteredRequestList" class="elevation-1"
        style="font-size: 0.98rem;" :search="search">
        <template v-slot:top>
          <v-toolbar flat color="blue-lighten-5">
            <v-toolbar-title><strong>Tedarikçi Erişim Talepleri</strong></v-toolbar-title>
            <v-spacer>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-spacer>
            <v-text-field class="mr-4" v-model="search" label="Search" base-color="white" color="white" single-line
              hide-details style="background: none;" variant="outlined" prepend-inner-icon="mdi-magnify">
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.islem`]="{ item }">
          <div v-if="$route.name !== 'home'">
            <v-btn color="blue-lighten-5" size="small" @click="openModal(item.raw), addNewRequest(item.raw)">
              <strong>
                İşlem
              </strong>
            </v-btn>
          </div>
          <div v-else>
            <v-btn color="blue" size="small" @click="openDetailModal(item.raw)">
              Detaylar
            </v-btn>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColorForStatus(item.raw.status)">
            <strong>
              {{ item.raw.status }}
            </strong>
          </v-chip>
        </template>
      </v-data-table>
    </div>
  </v-layout>
</template>

<script>

export default {

  data: () => ({
    showNestedDialog: false,
    search: '',
    showModal: false,
    selectedItem: null,
    newRequests: [],
    dataTableHeaders: [
      {
        title: 'Talep No',
        align: 'start',
        sortable: true,
        key: 'id'
      },
      { title: 'Tedarikçi Adı', key: 'supplierName' },
      { title: 'Talep Tarihi', key: 'supplierDate' },
      { title: 'Sorumlu Kişi', key: 'personResponsibleForTheRequest' },
      { title: 'Sistem', key: 'supplierConnectSystemName' },
      { title: 'Status', key: 'status' },
      { title: 'İşlem', key: 'islem', sortable: false },
    ],
  }),

  computed: {
    filteredRequestList() {
      if (this.$route.name === 'director') {
        return this.$store.state.allRequestsData.filter(item => item.status === 'İşlem Bekleniyor');
      }

      else if (this.$route.name === 'infosec') {
        return this.$store.state.allRequestsData.filter(item => item.status === 'Awaiting Info Sec Approval');
      }

      else if (this.$route.name === 'itdirector') {
        return this.$store.state.allRequestsData.filter(item => item.status === 'Awaiting IT Dir Approval');
      }
      else {
        return this.$store.state.allRequestsData;
      }
    },
  },

  methods: {
    openModal(item) {
      this.$store.dispatch('openConModal')
      this.$store.dispatch('getRequestDataToModal', item)
    },

    openDetailModal(item) {
      this.$store.dispatch('openDetailModal')
      this.$store.dispatch('getRequestDataToModal', item)
    },

    openConfirmationModal(item) {
      this.selectedItem = item;
      this.showModal = true;
    },

    addNewRequest(request) {
      this.newRequests.push(request);
    },

    getColorForStatus(status) {
      if (status.includes("Reddedildi"))
        return 'red'
      else if (status.includes("Awaiting") || status.includes("Bekleniyor"))
        return 'orange'
      else
        return 'green'
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Material+Icons');

.notice-wrapper {
  display: flex;
  justify-content: center;
}

.data-table-wrapper {
  border: 2px solid #E3F2FD;
  border-radius: 9px;
}

th {
  font-weight: bolder !important;
  font-size: 1.1rem;
}

td {
  max-width: fit-content !important;
  width: min-content !important;
}

.v-table__wrapper {
  margin-top: 10px;
}

.v-alert__content {
  font-size: 1.75rem !important;
}
</style>