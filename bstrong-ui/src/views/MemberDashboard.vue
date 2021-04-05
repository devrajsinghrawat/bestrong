<template>
  <v-col cols="20" md="8">
    <v-text-field
      v-model="mobile"
      color="success"
      loading
      @change="fetchMemberDetails"
      label="Search Member Details with Registered Mobile Number"
    >
      <v-icon slot="prepend" color="green"> mdi-phone </v-icon>
    </v-text-field>

    <v-timeline>
      <v-timeline-item
        v-for="(member_record, i) in member_records"
        :key="i"
        color="purple lighten-2"
        fill-dot
        opposite
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold green--text`"
            v-text="member_record.txdate"
          ></span>
        </template>

        <v-card>
          <v-card-title class="yellow lighten-2">
            <v-icon dark size="42" class="mr-4 green">
              mdi-account-edit
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">
              <span
                :class="`headline font-weight-bold black--text`"
                v-text="member_record.txtype"
              ></span>
            </h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">
                <span
                  v-text="
                    `${member_record.txtype} for ${member_record.name} with mentioned details
                     Plan:- ${member_record.plan},
                     Paid:- ${member_record.amount},
                     Remaining Balance:- ${member_record.balance} `
                  "
                ></span>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-col>
</template>

<script>
import axios from "axios";
import { fetchMemberRecordByMobileAPI } from "./../constent/constent";

export default {
  data: () => ({
    baseurl: process.env.VUE_APP_BASE_URL,
    port: process.env.VUE_APP_UI_PORT,

    member_records: [],
    mobile: "",
  }),

  methods: {
    fetchMemberDetails() {
      this.member_records = [];
      const url =
        `${this.baseurl}:${this.port}${fetchMemberRecordByMobileAPI}` +
        this.mobile;

      axios
        .get(url)
        .then((response) => {
          this.member_records = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          this.savingError = true;
          this.message = "Member does not exist Yet!";
          console.error("There was an error!", error);
        });
    },
  },
};
</script>