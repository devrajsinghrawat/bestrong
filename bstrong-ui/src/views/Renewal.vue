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
            v-model="recordPayload.mobile"
            label="Registered Mobile Number"
            prepend-icon="mdi-phone"
            required
            @change="fetchMemberDetails"
          ></v-text-field>
        </v-col>

        <v-col cols="20" md="3">
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
            v-model="recordPayload.expensetype"
            :items="plans"
            label="Plan"
            prepend-icon="mdi-chemical-weapon"
            required
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.expensedate"
            type="date"
            label="Renewal Date"
            prepend-icon="mdi-calendar-month"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.amount"
            label="Amount Paid"
            prepend-icon="mdi-book-open"
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="20" md="3">
          <v-text-field
            v-model="recordPayload.amount"
            label="Balance"
            prepend-icon="mdi-book-open"
            required
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
        <v-btn color="yellow" class="ma-2 black--text" @click="submitExpense">
          Submit Expense
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
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
      amount: "",
      balance: "",
      remarks: "",
      files: "",
    },
    savingSuccessful: false,
    message: "",
  }),

  methods: {
    fetchMemberDetails() {
      alert("Hello");
      const urlFetchMemberByMobile = `http://localhost:8080/api/memberRecords/${this.recordPayload.mobile}`;
      console.log("PostPayload --->", this.recordPayload);

      axios
        .post(urlFetchMemberByMobile, this.recordPayload)
        .then((response) => {
          this.savingSuccessful = true;
          this.recordPayload.name = response.data.name;
          this.recordPayload.email = response.data.email;
          console.log("Response Payload --->", response.data.amount);
        })
        .catch((error) => {
          this.savingSuccessful = true;
          this.message = "Member does not exist Yet!";
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
