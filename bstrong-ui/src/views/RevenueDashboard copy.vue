<template>
  <v-container fluid>
    <v-row>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Revenue</div>
            <v-list-item-title class="display-1 green--text">
              {{ revenuedata.netRevenue }}
            </v-list-item-title>
            <v-list-item-subtitle class="green--text">
              Total Revenue till date
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Expense</div>
            <v-list-item-title class="display-1 red--text">
              {{ revenuedata.netExpense }}
            </v-list-item-title>
            <v-list-item-subtitle class="red--text">
              Total Expense till date
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Total Pending</div>
            <v-list-item-title class="display-1 orange--text">
              {{ revenuedata.netPending }}
            </v-list-item-title>
            <v-list-item-subtitle class="orange--text">
              Total Pending till date
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-row>

    <v-spacer></v-spacer>

    <v-row>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Net Company Balance</div>
            <v-list-item-title class="display-2 green--text">
              {{ revenuedata.netCompanyBalance }}
            </v-list-item-title>
            <v-list-item-subtitle class="blue--text">
              Total Revenue - Total Expense
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Net Cash Balance</div>
            <v-list-item-title class="display-2 green--text">
              {{ revenuedata.netCashBalance }}
            </v-list-item-title>
            <v-list-item-subtitle class="blue--text">
              Total Cash Revenue - Total Cash Expense
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-2">Net Bank Balance</div>
            <v-list-item-title class="display-3 green--text">
              {{ revenuedata.netBankBalance }}
            </v-list-item-title>
            <v-list-item-subtitle class="blue--text">
              Total Online Revenue - Total Online Expense
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { urlFetchRevenueRecord } from "./../constent/constent";

export default {
  data() {
    return {
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
      revenuedata: {},
    };
  },

  mounted: function () {
    axios
      .get(urlFetchRevenueRecord)
      .then((response) => {
        console.log(response.data);
        this.revenuedata = response.data;
      })
      .catch((error) => {
        this.savingError = true;
        this.message = "Error while fetching revenue data!";
        console.error("There was an error!", error);
      });
  },
};
</script>
