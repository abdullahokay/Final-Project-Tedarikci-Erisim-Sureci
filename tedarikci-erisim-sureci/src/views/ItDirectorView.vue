<template>
    <div class="director pt-10">
        <h1 class="director-page-header d-flex justify-center" color="#CD9394">IT Lideri Onay Ekranı</h1>
        <div>
            <DataTable />
        </div>
        <div>
            <ConfirmationModal modalTitle="IT Yönetici Onay Ekranı" v-show=this.$store.state.isConModalOpen>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
export default {
    name: "ItDirectorView",
    components: {
        DataTable,
        ConfirmationModal
    },
}
</script>

<style>
.director-page-header {
    color: #B71C1C;
}
</style>