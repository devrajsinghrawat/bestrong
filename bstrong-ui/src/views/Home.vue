<template>
  <v-container fluid>
    <v-card-title>
      <v-text-field
        label="Recent Member Transactions"
        single-line
        hide-details
        readonly
      ></v-text-field>
    </v-card-title>
    <template>
      <v-data-table
        :headers="headers"
        :items="memberrecords"
        class="elevation-1"
      >
        <template v-slot:[`item.txdate`]="{ item }">
          <span v-text="getDate(item.txdate)" dark> </span>
        </template>
      </v-data-table>
    </template>

    <v-card-title>
      <v-text-field
        label="Recent Expense Transactions"
        single-line
        hide-details
        readonly
      ></v-text-field>
    </v-card-title>
    <template>
      <v-data-table
        :headers="headersexpense"
        :items="expenserecords"
        class="elevation-1"
      >
        <template v-slot:[`item.txdate`]="{ item }">
          <span v-text="getDate(item.txdate)" dark> </span>
        </template>
      </v-data-table>
    </template>
  </v-container>

  <!-- <v-card>
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
  </v-card> -->
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
        { text: "Date Of Expense", value: "txdate" },
        {
          text: "Expenses Type",
          value: "expensetype",
        },

        { text: "Mode of Payment", value: "mode" },
        { text: "Amount", value: "amount" },
        { text: "Expense Description", value: "remarks" },
        { text: "Reciepts", value: "files" },
      ],
      expenserecords: [],

      headers: [
        { text: "Date", value: "txdate" },
        {
          text: "Transaction Type",
          align: "start",
          filterable: false,
          value: "txtype",
        },
        { text: "Name", value: "name" },
        { text: "Mobile", value: "mobile" },
        { text: "Plan", value: "plan" },
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
  // Helper functions
  methods: {
    getDate(txdate) {
      return new Date(txdate).toDateString();
    },
  },
};
</script>