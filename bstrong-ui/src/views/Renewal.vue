<template>
  <v-form v-model="valid">
    <div v-if="savingSuccessful">
      <v-alert type="success">
        <span class="messagetextcolor">
          <strong>{{ message }}</strong>
        </span>
      </v-alert>
    </div>

    <div v-if="savingError">
      <v-alert type="error">
        <span class="messagetextcolor">
          <strong>{{ message }}</strong>
        </span>
      </v-alert>
    </div>

    <v-container>
      <v-row>
        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.mobile"
            label="Registered Mobile Number"
            prepend-icon="mdi-phone"
            required
            color="red"
            @change="fetchMemberDetails"
          ></v-text-field>
        </v-col>

        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.name"
            label="Name"
            prepend-icon="mdi-account"
            disabled
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.email"
            label="Email"
            prepend-icon="mdi-email"
            disabled
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="20" md="2">
          <v-select
            v-model="recordPayload.plan"
            :items="plans"
            label="Plan"
            prepend-icon="mdi-chemical-weapon"
            required
            dense
            color="red"
          ></v-select>
        </v-col>
        <v-col cols="20" md="3">
          <v-select
            v-model="recordPayload.mode"
            :items="itemsmode"
            label="Payment Mode"
            prepend-icon="mdi-book-open"
            color="red"
            required
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.txdate"
            type="date"
            label="Renewal Date"
            prepend-icon="mdi-calendar-month"
            color="red"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.amount"
            label="Amount Paid"
            prepend-icon="mdi-book-open"
            color="red"
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.balance"
            label="Balance"
            prepend-icon="mdi-book-open"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-col cols="20" md="8">
      <v-text-field
        v-model="recordPayload.remarks"
        label="Description"
        prepend-icon="mdi-chat-processing-outline"
      ></v-text-field>
    </v-col>

    <v-col cols="20" md="8">
      <v-file-input
        v-model="recordPayload.files"
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
    </v-col>

    <v-row align="center" justify="space-around">
      <v-col cols="20" md="8">
        <v-btn color="yellow" class="ma-2 black--text" @click="submitRenew">
          Renew Member
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
import {
  memberRecordPostAPI,
  fetchMemberByMobileAPI,
} from "./../constent/constent";

export default {
  data: () => ({
    baseurl: process.env.VUE_APP_BASE_URL,
    port: process.env.VUE_APP_UI_PORT,
    valid: false,
    itemsmode: ["Online Payment", "Bank Transfer", "Cheque", "Cash"],
    plans: ["1 Month", "3 Months", "6 Months", "1 Year"],

    recordPayload: {
      txtype: "RENEWAL",
      name: "",
      mobile: "",
      email: "",
      plan: "",
      txdate: "",
      mode: "",
      amount: 0,
      balance: 0,
      remarks: "",
      files: "",
    },
    savingSuccessful: false,
    savingError: false,
    message: "test",
  }),

  methods: {
    fetchMemberDetails() {
      const url =
        `${this.baseurl}:${this.port}${fetchMemberByMobileAPI}` +
        this.recordPayload.mobile;

      axios
        .get(url, this.recordPayload)
        .then((response) => {
          this.recordPayload.name = response.data.name;
          this.recordPayload.email = response.data.email;
        })
        .catch((error) => {
          this.savingError = true;
          this.message = "Member does not exist Yet!";
          console.error("There was an error!", error);
        });
    },

    submitRenew() {
      const url = `${this.baseurl}:${this.port}${memberRecordPostAPI}`;
      /** Record the Member Tx data for Registration */
      axios
        .post(url, this.recordPayload)
        .then((res) => {
          this.savingSuccessful = true;
          console.log("Response Payload --->", res.data.amount);
          this.message = `Renewal Successful : Name - ${res.data.name}, Plan - ${res.data.plan}, Amount - ${res.data.amount}, Balance - ${res.data.balance}`;
          console.log("Response from Member Record Data", res.data);
        })
        .catch((error) => {
          this.savingSuccessful = true;
          this.message = "Error while capturing the Member Record!";
          console.error("Error while capturing the Member Record", error);
        });
    },
  },
};
</script>
