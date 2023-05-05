<template>
  <div>
    {{ console() }}
    <v-dialog v-model="this.$store.state.isModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
      <v-card>
        <v-card-title class="headline grey lighten-6" primary-title>
          <strong>
            {{ modalTitle }}
          </strong>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Tedarikçi Adı</h4>
                <v-text-field required variant="outlined" v-model="supplierName"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Talep Tarihi</h4>
                <v-text-field required v-model="requestDate" variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Sorumlu Kişi</h4>
                <v-select :items="responsiblePersonsList" item-title="personName" v-model="selectedPersonName"
                  item-value="personName" @input="updateSelectedPersonPhone" variant="outlined"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Cep Telefonu</h4>
                <v-text-field :value="selectedPersonPhone" required readonly variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Tedarikçinin Bağlanacağı sistem</h4>
                <v-select clearable :items="accessibleSystemsList" item-title="supplierConnectSystemName"
                  item-value="supplierConnectSystemName" v-model="selectedSystemName" variant="outlined"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="mb-3">Tedarikçinin Bağlanacağı Süre</h4>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Başlangıç" v-model="connectionStartTime" required placeholder="GG-AA-YYYY"
                      variant="outlined"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Bitiş" v-model="connectionEndTime" required placeholder="GG-AA-YYYY"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <h4 class="mb-3">Açıklama</h4>
            <v-text-field required variant="outlined" v-model="requestDescription"></v-text-field>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn size="large" mb-4 ml-4 color="red-darken-4" @click="closeModal(), submitData()">
            Gönder
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn size="large" mb-4 ml-4 color="primary" @click="closeModal()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {

  props: {
    modalTitle: {
      type: String
    }
  },

  data: () => ({
    selectedPersonName: null,
    selectedPersonPhone: null,
    selectedSystemName: null,
    connectionStartTime: null,
    connectionEndTime: null,
    supplierName: null,
    requestDescription: null,

    // *** GETTING CURRENT TIME FOR THE TIME THAT REQUEST HAS BEEN MADE *** //
    requestDate: new Date().toLocaleString("tr-TR", {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  }),

  methods: {
    ...mapActions(['postRequestData']),

    submitData() {
      const data = [
        {
          supplierName: this.supplierName,
          supplierDate: this.requestDate,
          personResponsibleForTheRequest: this.selectedPersonName,
          phoneNumOfThePerResForTheReq: this.selectedPersonPhone,
          supplierConnectSystemName: this.selectedSystemName,
          supplierConnectStarted: this.connectionStartTime,
          supplierConnectEnd: this.connectionEndTime,
          description: this.requestDescription,
        }
      ]

      this.postRequestData(data);
    },

    closeModal() {
      this.$store.commit('CLOSE_MODAL')
    },

    console() {
    },

    updateSelectedPersonPhone() {
      const person = this.responsiblePersonsList.find(p => p.personName === this.selectedPersonName);
      this.selectedPersonPhone = person ? person.personPhone : null;
    },
  },

  watch: {
    selectedPersonName(newVal, oldVal) {
      if (newVal !== oldVal) {
        const person = this.responsiblePersonsList.find(p => p.personName === newVal);
        this.selectedPersonPhone = person ? person.personPhone : null;
      }
    },
  },

  computed: {
    accessibleSystemsList() {
      return this.$store.state.accessRequestedSystems;
    },

    responsiblePersonsList() {
      return this.$store.state.responsiblePersons;
    },
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
  font-family: 'Karla', sans-serif !important;
}
</style>