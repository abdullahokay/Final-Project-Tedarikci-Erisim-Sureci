<template>
    <div class="director pt-10">
        <!-- <DirectorPage /> -->
        <h1 class="director-page-header d-flex justify-center" color="#CD9394">Takım Lideri Onay Ekranı</h1>
        <div>
            <DataTable />

        </div>
        <div>
            <ConfirmationModal modalTitle="Takım Lideri Onay Ekranı" v-show=this.$store.state.isConModalOpen>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
    name: "DirectorView",
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