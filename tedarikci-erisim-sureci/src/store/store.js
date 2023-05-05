import { createStore } from "vuex";
import axios from "axios";

const store = createStore(
  {
    state() {
      return {
        count: 0,
        isModalOpen: false,
        isConModalOpen: false,
        isDetailModalOpen: false,
        responsiblePersons: [],
        accessRequestedSystems: [],
        allRequestsData: [],
        postReqResponseData: [],
        requestData: {},
      };
    },

    mutations: {
      increment(state) {
        state.count++;
      },

      OPEN_REQUEST_MODAL(state) {
        state.isModalOpen = true;
      },

      OPEN_CONFIRMATION_MODAL(state) {
        state.isConModalOpen = true;
      },

      OPEN_DETAIL_MODAL(state) {
        state.isDetailModalOpen = true;
      },

      CLOSE_MODAL(state) {
        state.isModalOpen = false;
        state.isConModalOpen = false;
        state.isDetailModalOpen = false;
      },

      INIT_PERSON_DATA(state, newData) {
        state.responsiblePersons = newData;
      },

      INIT_SYSTEM_DATA(state, newData) {
        state.accessRequestedSystems = newData;
      },

      INIT_REQUEST_DATA(state, newData) {
        state.allRequestsData = newData;
      },

      SET_RESPONSE_DATA(state, responseData) {
        state.responseData = responseData;
      },

      GET_DATA_TO_MODAL(state, data) {
        state.requestData = data;
      },
    },

    actions: {
      openModal({ commit }) {
        commit("OPEN_REQUEST_MODAL");
      },

      openConModal({ commit }) {
        commit("OPEN_CONFIRMATION_MODAL");
      },

      openDetailModal({ commit }) {
        commit("OPEN_DETAIL_MODAL");
      },

      getRequestDataToModal({ commit }, data) {
        commit("GET_DATA_TO_MODAL", data);
      },

      closeModal({ commit }) {
        commit("CLOSE_MODAL");
      },

      initResponsiblePersonsData(context) {
        axios
          .get("http://localhost:8081/api/person/getResponsiblePerson")
          .then((response) => {
            context.commit("INIT_PERSON_DATA", response.data.data);
          });
      },

      initAccessRequestedSystemsData(context) {
        axios
          .get("http://localhost:8081/api/scs/getSupplierConnectSystem")
          .then((response) => {
            context.commit("INIT_SYSTEM_DATA", response.data.data);
          });
      },

      initAllRequestsData(context) {
        axios
          .get("http://localhost:8081/getSupplierProccessData")
          .then((response) => {
            context.commit("INIT_REQUEST_DATA", response.data.data);
          });
      },

      postRequestData(context, data) {
        axios
          .post("http://localhost:8081/addSupplierProccessData", data)
          .then((response) => {
            context.commit("SET_RESPONSE_DATA", response.data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
        axios
          .get("http://localhost:8081/getSupplierProccessData")
          .then((response) => {
            context.commit("INIT_REQUEST_DATA", response.data.data);
          });
      },

      updateStatusOfRequest() {
        axios
          .post("http://localhost:8081/updateSupplierStatus", {
            id: this.state.requestData.id,
            status: this.state.requestData.status,
          })
          .catch((error) => {
            console.log("Error", error);
          });
      },

      initReasonForRejection() {
        axios
          .post("http://localhost:8081/updateSupplierStatus", {
            id: this.state.requestData.id,
            status: this.state.requestData.status,
            reasonForRejection: this.state.requestData.reasonForRejection,
          })
          .catch((error) => {
            console.log("Error", error);
          });
      },
    },
  }
);

export default store;
