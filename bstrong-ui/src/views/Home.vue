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

    <v-card-title>
      <v-text-field
        label="Recent Expenses"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersexpense"
      :items="expenserecords"
    ></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { fetchMemberRecordAPI, fetchExpenseAPI } from "./../constent/constent";

export default {
  data() {
    return {
      baseurl: process.env.VUE_APP_BASE_URL,
      port: process.env.VUE_APP_UI_PORT,

      headersexpense: [
        {
          text: "Expenses Type",
          value: "expensetype",
        },
        { text: "Date Of Expense", value: "txdate" },
        { text: "Mode of Payment", value: "mode" },
        { text: "Amount", value: "amount" },
        { text: "Expense Description", value: "remarks" },
        { text: "Reciepts", value: "files" },
      ],
      expenserecords: [],

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
    const urlMemberRecords = `${this.baseurl}:${this.port}${fetchMemberRecordAPI}`;
    axios
      .get(urlMemberRecords)
      .then((response) => {
        console.log(response.data);
        this.memberrecords = response.data;
      })
      .catch((error) => {
        this.savingError = true;
        this.message = "Member does not exist Yet!";
        console.error("There was an error!", error);
      });

    // Fetch recent expense
    const urlExpenseRecords = `${this.baseurl}:${this.port}${fetchExpenseAPI}`;
    axios
      .get(urlExpenseRecords)
      .then((response) => {
        console.log(response.data);
        this.expenserecords = response.data;
      })
      .catch((error) => {
        this.savingError = true;
        this.message = "Member does not exist Yet!";
        console.error("There was an error!", error);
      });
  },
};
</script>