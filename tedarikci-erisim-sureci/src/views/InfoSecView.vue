<template>
    <div class="director pt-10">
        <h1 class="director-page-header d-flex justify-center" color="#CD9394">Bilgi Güvenliği Onay Ekranı</h1>
        <div>
            <DataTable />
        </div>
        <div>
            <div>
                <ConfirmationModal modalTitle="Bilgi İşlem Onay Ekranı" v-show=this.$store.state.isConModalOpen>
                </ConfirmationModal>
            </div>
        </div>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
    name: "InfoSecurityView",
    components: {
        DataTable,
        ConfirmationModal
    },

    data: () => ({

    })
}
</script>

<style>
.director-page-header {
    color: #B71C1C;
}
</style>