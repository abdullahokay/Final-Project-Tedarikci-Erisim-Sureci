<template>
    <div>
        <v-dialog v-model="this.$store.state.isConModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
            <v-card>
                <v-card-title class="headline grey lighten-6" primary-title>
                    <h3>{{ modalTitle }}</h3>
                </v-card-title>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Tedarikçi Adı</h4>
                                <v-text-field required variant="outlined">
                                    {{ requestData.supplierName }}</v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Talep Tarihi</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.supplierDate }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Sorumlu Kişi</h4>
                                <v-text-field variant="outlined">
                                    {{ requestData.personResponsibleForTheRequest }}</v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Cep Telefonu</h4>
                                <v-text-field required readonly variant="outlined">
                                    {{ requestData.phoneNumOfThePerResForTheReq
                                    }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Tedarikçinin Bağlanacağı sistem</h4>
                                <v-text-field clearable item-title="supplierConnectSystemName"
                                    item-value="supplierConnectSystemName" variant="outlined"> {{
                                        requestData.supplierConnectSystemName }} </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Tedarikçinin Bağlanacağı Süre</h4>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field required variant="outlined">{{
                                            requestData.supplierConnectStarted }}</v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field required variant="outlined">{{
                                            requestData.supplierConnectEnd }}</v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <h4 class="mb-3">Açıklama</h4>
                        <v-text-field required variant="outlined">{{
                            requestData.description }}</v-text-field>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-btn size="large" mb- ml-4 color="green-lighten-1" @click="closeModal(), onApprove()">
                        <strong>Onayla</strong>
                    </v-btn>
                    <v-btn size="large" mb-6 ml-8 color="red-darken-4" @click="showNestedDialog = true">
                        <strong>Red</strong>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn size="large" mb-6 ml-4 color="primary" @click="closeModal()">
                        <strong>Kapat</strong>
                    </v-btn>
                </v-card-actions>
                <v-dialog v-model="showNestedDialog" persistent :position-x="0" :position-y="1" max-width="800px">
                    <v-card class="rejection-modal-wrapper pa-4">
                        <v-card-title><strong>Red Sebebini Giriniz</strong></v-card-title>
                        <v-row>
                            <v-col cols="6" md="6">
                                <v-text-field variant="outlined" placeholder="Red Sebebi"
                                    v-model="reasonForRejectionOfRequest"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6">
                                <v-select :items="responsiblePersonsList" item-title="personName"
                                    v-model="personRejectingRequest" item-value="personName" variant="outlined"
                                    label="Red Eden Kişi">
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn color="green darken-1" text
                                @click="showNestedDialog = false, onReject(), closeModal()"><strong>Gönder</strong></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="showNestedDialog = false"><strong>Kapat</strong></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    props: {
        modalTitle: {
            type: String
        }
    },

    data: () => ({
        showNestedDialog: false,
        reasonForRejectionOfRequest: "",
        personRejectingRequest: ""
    }),

    methods: {
        onApprove() {
            // Onaylama işlemi
            if (this.$route.name === 'director')
                this.requestData.status = "Awaiting Info Sec Approval"

            else if (this.$route.name === 'infosec')
                this.requestData.status = "Awaiting IT Dir Approval"

            else if (this.$route.name === 'itdirector')
                this.requestData.status = "Approved"
            else
                this.requestData.status = "Approved"
            this.$store.dispatch('updateStatusOfRequest')
        },

        onReject() {
            // Reddetme İşlemi
            if (this.$route.name === "director")
                this.requestData.status = this.personRejectingRequest + " Tarafından Reddedildi"

            else if (this.$route.name === "infosec")
                this.requestData.status = this.personRejectingRequest + " Tarafından Reddedildi"

            else if (this.$route.name === "itdirector")
                this.requestData.status = this.personRejectingRequest + " Tarafından Reddedildi"


            this.requestData.reasonForRejection = this.reasonForRejectionOfRequest
            this.$store.dispatch('initReasonForRejection')
        },

        closeModal() {
            this.$store.commit('CLOSE_MODAL')
        }
    },

    computed: {
        requestData() {
            return this.$store.state.requestData;
        },

        responsiblePersonsList() {
            return this.$store.state.responsiblePersons;
        },
    }
}
</script>

<style>
.rejection-modal-wrapper {
    display: flex;
    flex-direction: column;
}
</style>