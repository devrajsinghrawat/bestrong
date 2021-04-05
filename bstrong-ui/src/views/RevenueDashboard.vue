<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" right>
      <v-tab>Dashbaord</v-tab>
      <v-tab>Monthly</v-tab>

      <v-tab-item v-for="n in 1" :key="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 4" :key="i" cols="12" md="4">
              <div class="green--text overline mb-4" v-if="i == 1">
                Total Revenue
              </div>
              <div class="red--text overline mb-4" v-if="i == 2">
                Total Expense
              </div>
              <div class="orange--text overline mb-4" v-if="i == 3">
                Total Pending
              </div>
              <div class="green--text overline mb-4" v-if="i == 4">
                Net Company Balance
              </div>
              <v-img
                :src="`https://picsum1.photos/1000/1000?image=${
                  i * (n + 1) * 5 + 10
                }`"
                :lazy-src="`https://picsum1.photos/10/6?image=${
                  i * (n + 1) * 5 + 10
                }`"
                aspect-ratio="1"
              >
                <v-list-item-title class="display-4 green--text" v-if="i == 1">
                  {{ revenuedata.netRevenue }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 1"
                >
                  Total Revenue till date
                </v-list-item-subtitle>

                <v-list-item-title class="display-1 green--text" v-if="i == 1">
                  {{ revenuedata.netCashRevenue }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 1"
                >
                  Cash
                </v-list-item-subtitle>
                <v-list-item-title class="display-1 green--text" v-if="i == 1">
                  {{ revenuedata.netBankRevenue }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 1"
                >
                  Bank
                </v-list-item-subtitle>

                <v-list-item-title class="display-4 red--text" v-if="i == 2">
                  {{ revenuedata.netExpense }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 2"
                >
                  Total Expense till date
                </v-list-item-subtitle>
                <v-list-item-title class="display-1 red--text" v-if="i == 2">
                  {{ revenuedata.netCashExpense }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 2"
                >
                  Cash
                </v-list-item-subtitle>
                <v-list-item-title class="display-1 red--text" v-if="i == 2">
                  {{ revenuedata.netBankExpense }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 2"
                >
                  Bank
                </v-list-item-subtitle>

                <v-list-item-title class="display-4 orange--text" v-if="i == 3">
                  {{ revenuedata.netPending }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 3"
                >
                  Total Pending till date
                </v-list-item-subtitle>

                <v-list-item-title class="display-4 green--text" v-if="i == 4">
                  {{ revenuedata.netCompanyBalance }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 4"
                >
                  Total Revenue - Total Expense
                </v-list-item-subtitle>

                <v-list-item-title class="display-1 green--text" v-if="i == 4">
                  {{ revenuedata.netCashBalance }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 4"
                >
                  Cash
                </v-list-item-subtitle>

                <v-list-item-title class="display-1 green--text" v-if="i == 4">
                  {{ revenuedata.netBankBalance }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="blue--text overline mb-1"
                  v-if="i == 4"
                >
                  Bank
                </v-list-item-subtitle>
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item v-for="n in 1" :key="n">
        <v-container fluid>
          <template>
            <v-data-table
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
    </v-tabs>
  </v-card>
</template>

<script>
import axios from "axios";
import { revenueRecordAPI } from "./../constent/constent";

export default {
  data() {
    return {
      baseurl: process.env.VUE_APP_BASE_URL,
      port: process.env.VUE_APP_UI_PORT,

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
    const url = `${this.baseurl}:${this.port}${revenueRecordAPI}`;

    console.log("rev url", url);
    axios
      .get(url)
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
      console.log("pl -->", pl);
      if (pl < 0) return "red";
      else if (0 < pl > 50000) return "orange";
      else return "green";
    },
  },
};
</script>
