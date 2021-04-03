<template>
  <v-card>
    <v-card-title>
      <v-text-field
        label="Recent Member Transactions"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="memberrecords"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { urlFetchMemberRecord } from "./../constent/constent";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Transaction Type",
          align: "start",
          filterable: false,
          value: "txtype",
        },
        { text: "Name", value: "name" },
        { text: "Mobile", value: "mobile" },
        { text: "Plan", value: "plan" },
        { text: "Date", value: "txdate" },
      ],
      memberrecords: [],
    };
  },

  mounted: function () {
    console.log(urlFetchMemberRecord);
    axios
      .get(urlFetchMemberRecord)
      .then((response) => {
        console.log(response.data);
        this.memberrecords = response.data;
      })
      .catch((error) => {
        this.savingError = true;
        this.message = "Member does not exist Yet!";
        console.error("There was an error!", error);
      });
  },
};
</script>