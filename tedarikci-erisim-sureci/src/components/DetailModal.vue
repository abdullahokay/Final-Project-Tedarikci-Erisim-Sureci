<template>
    <div>
        <v-dialog v-model="this.$store.state.isDetailModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
            <v-card>
                <v-card-title class="headline red" primary-title>
                    <h3>Detaylar</h3>
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
                        <v-row>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Red Sebebi</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.reasonForRejection }}</v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <h4 class="mb-3">Durum</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.status }}</v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn size="large" mb-6 ml-4 color="primary" @click="closeModal()">
                        <strong>Kapat</strong>
                    </v-btn>
                </v-card-actions>
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
        closeModal() {
            this.$store.commit('CLOSE_MODAL')
        }
    },

    computed: {
        requestData() {
            return this.$store.state.requestData;
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