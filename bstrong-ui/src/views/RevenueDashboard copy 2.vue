<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" right>
      <v-tab>Dashbaord</v-tab>
      <v-tab>Monthly</v-tab>

      <v-toolbar dark flat prominent>
        <template v-slot:extension>
          <v-tabs v-model="tabs" centered>
            <v-tab v-for="n in 2" :key="n">
              <v-span v-if="n == 1">Dashbaord</v-span>
              <v-span v-if="n == 2">Monthly</v-span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tab-items v-model="tabs">
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="i in 6" :key="i" cols="12" md="4">
                <div class="overline mb-4" v-if="i == 1">Total Revenue</div>
                <div class="overline mb-4" v-if="i == 2">Total Expense</div>
                <div class="overline mb-4" v-if="i == 3">Total Pending</div>
                <div class="overline mb-4" v-if="i == 4">
                  Net Company Balance
                </div>
                <div class="overline mb-4" v-if="i == 5">Net Cash Balance</div>
                <div class="overline mb-4" v-if="i == 6">Net Bank Balance</div>
                <v-img
                  :src="`https://picsum.photos/1000/1000?image=${
                    i * (n + 1) * 5 + 10
                  }`"
                  :lazy-src="`https://picsum.photos/10/6?image=${
                    i * (n + 1) * 5 + 10
                  }`"
                  aspect-ratio="1"
                >
                  <v-list-item-title
                    class="display-4 green--text"
                    v-if="i == 1"
                  >
                    {{ revenuedata.netRevenue }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="green--text" v-if="i == 1">
                    Total Revenue till date
                  </v-list-item-subtitle>

                  <v-list-item-title class="display-4 red--text" v-if="i == 2">
                    {{ revenuedata.netExpense }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="red--text" v-if="i == 2">
                    Total Expense till date
                  </v-list-item-subtitle>

                  <v-list-item-title
                    class="display-4 orange--text"
                    v-if="i == 3"
                  >
                    {{ revenuedata.netPending }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="orange--text" v-if="i == 3">
                    Total Pending till date
                  </v-list-item-subtitle>

                  <v-list-item-title
                    class="display-4 green--text"
                    v-if="i == 4"
                  >
                    {{ revenuedata.netCompanyBalance }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="blue--text" v-if="i == 4">
                    Total Revenue - Total Expense
                  </v-list-item-subtitle>

                  <v-list-item-title
                    class="display-4 green--text"
                    v-if="i == 5"
                  >
                    {{ revenuedata.netCashBalance }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="blue--text" v-if="i == 5">
                    Total Cash Revenue - Total Cash Expense
                  </v-list-item-subtitle>

                  <v-list-item-title
                    class="display-4 green--text"
                    v-if="i == 6"
                  >
                    {{ revenuedata.netBankBalance }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="blue--text" v-if="i == 6">
                    Total Online Revenue - Total Online Expense
                  </v-list-item-subtitle>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <template>
              <v-data-table
                v-if="n == 2"
                :headers="headers"
                :items="revenuedata.monthlyData"
                class="elevation-1"
              >
                <template v-slot:[`item.pl`]="{ item }">
                  <v-chip :color="getColor(item.pl)" dark>
                    {{ item.pl }}
                  </v-chip>
                </template>
              </v-data-table>
            </template>
          </v-container>
        </v-tab-item>
      </v-tab-items>

      <!-- <v-tab-item v-for="n in 2" :key="n">

      </v-tab-item> -->
    </v-tabs>
  </v-card>
</template>

<script>
import axios from "axios";
import { urlFetchRevenueRecord } from "./../constent/constent";

export default {
  data() {
    return {
      tabs: null,
      headers: [
        {
          text: "Month",
          value: "month",
        },
        { text: "Revenue", value: "revenue" },
        { text: "Expense", value: "expense" },
        { text: "Profit / Loss", value: "pl" },
        { text: "Registration", value: "registration" },
        { text: "Renewal", value: "renewal" },
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

  methods: {
    getColor(pl) {
      console.log("pl --> ", pl);
      let x = parseInt(pl);
      console.log("x --> ", x);

      if (x < 0) {
        return "red";
      } else if (0 < x > 50000) {
        return "orange";
      } else if (x > 50000) {
        return "green";
      }
    },
  },
};
</script>
