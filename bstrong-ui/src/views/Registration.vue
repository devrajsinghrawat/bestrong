<template>
  <v-form v-model="valid">
    <div v-if="savingSuccessful">
      <v-alert
        v-model="alert"
        dismissible
        color="cyan"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-twitter"
      >
        <strong>{{ message }}</strong>
      </v-alert>
    </div>

    <v-container>
      <v-row>
        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.name"
            label="Member Name"
            prepend-icon="mdi-account"
            color="red"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.mobile"
            label="Mobile Number"
            prepend-icon="mdi-phone"
            color="red"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.email"
            label="Email"
            prepend-icon="mdi-email"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="20" md="2">
          <v-text-field
            v-model="recordPayload.age"
            label="Age"
            prepend-icon="mdi-account"
          >
          </v-text-field>
        </v-col>

        <v-col cols="20" md="6">
          <v-text-field
            v-model="recordPayload.address"
            label="Address"
            prepend-icon="mdi-email"
            color="red"
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
            v-model="recordPayload.gender"
            :items="genders"
            label="Gender"
            prepend-icon="mdi-chemical-weapon"
            required
            color="red"
            dense
          ></v-select>
        </v-col>

        <v-col cols="20" md="3">
          <v-select
            v-model="recordPayload.plan"
            :items="plans"
            label="Plan"
            prepend-icon="mdi-chemical-weapon"
            color="red"
            required
            dense
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
            label="Joining Date"
            prepend-icon="mdi-calendar-month"
            color="red"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.amount"
            label="Amount Paid"
            prepend-icon="mdi-book-open"
            color="red"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.balance"
            label="Balance (if any)"
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
        <v-btn color="yellow" class="ma-2 black--text" @click="submitRegister">
          Register Member
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
// import moment from "moment";
// const { format, parseISO } = require("date-fns");
import { urlMemberPost, urlMemberRecordPost } from "./../constent/constent";

export default {
  data: () => ({
    valid: false,
    genders: ["Male", "Female", "Rather not to say"],
    plans: ["1 Month", "3 Months", "6 Months", "1 Year"],
    itemsmode: ["Online Payment", "Bank Transfer", "Cheque", "Cash"],

    recordPayload: {
      name: "",
      mobile: "",
      email: "",
      age: "",
      address: "",
      gender: "",
      plan: "",
      txdate: "",
      mode: "",
      amount: "",
      balance: "0",
      remarks: "",
      files: "",
    },

    menu2: false,

    savingSuccessful: false,
    message: "",
  }),

  // computed: {
  //   computedDateFormattedMomentjs() {
  //     return this.recordPayload.txdate
  //       ? moment(this.recordPayload.txdate).format("dddd, MMMM Do YYYY")
  //       : "";
  //   },
  // },

  methods: {
    submitRegister() {
      const registerPayload = {
        name: this.recordPayload.name,
        mobile: this.recordPayload.mobile,
        email: this.recordPayload.email,
        age: this.recordPayload.age,
        address: this.recordPayload.address,
        gender: this.recordPayload.gender,
      };

      const memberRecordPayload = {
        txtype: "REGISTRATION",
        name: this.recordPayload.name,
        mobile: this.recordPayload.mobile,
        email: this.recordPayload.email,
        plan: this.recordPayload.plan,
        txdate: this.recordPayload.txdate,
        mode: this.recordPayload.mode,
        amount: this.recordPayload.amount,
        balance: this.recordPayload.balance,
        files: this.recordPayload.files,
        remarks: this.recordPayload.remarks,
      };

      console.log("PostPayload recordPayload --->", this.recordPayload);
      console.log("PostPayload registerPayload --->", registerPayload);

      console.log("urlMemberPost --->", urlMemberPost);

      /** Record the Member Registration data*/
      axios
        .post(urlMemberPost, registerPayload)
        .then((response) => {
          this.savingSuccessful = true;
          this.message = `Congratuations ${response.data.name} Welcome to BeStrong Family !`;
          console.log("Register Response --->", response.data);

          console.log("urlMemberRecordPost --->", urlMemberRecordPost);
          console.log(
            "PostPayload memberRecordPayload --->",
            memberRecordPayload
          );
          /** Record the Member Tx data for Registration */
          axios
            .post(urlMemberRecordPost, memberRecordPayload)
            .then((res) => {
              console.log("Response from Member Record Data", res.data);
            })
            .catch((error) => {
              this.savingSuccessful = true;
              this.message = "Error while capturing the Member Record!";
              console.error("Error while capturing the Member Record", error);
            });
        })
        .catch((error) => {
          this.savingSuccessful = true;
          this.message = "Error while registering the Member!";
          console.error("Error while registering the Member!", error);
        });
    },
  },
};
</script>
