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
        Expense for RS/- <strong>{{ message }}</strong> has been recorded!.
      </v-alert>
    </div>
    <v-container>
      <v-row>
        <v-col cols="20" md="4">
          <v-select
            v-model="expensePayload.expensetype"
            :items="itemstype"
            label="Expense Type"
            prepend-icon="mdi-chemical-weapon"
            required
            dense
          ></v-select>
        </v-col>

        <v-col cols="20" md="4">
          <v-select
            v-model="expensePayload.mode"
            :items="itemsmode"
            label="Payment Mode"
            prepend-icon="mdi-book-open"
            required
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="20" md="4">
          <v-text-field
            v-model="expensePayload.txdate"
            type="date"
            label="Expense Date"
            prepend-icon="mdi-calendar-month"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="20" md="4">
          <v-text-field
            v-model="expensePayload.amount"
            label="Amount"
            prepend-icon="mdi-book-open"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-col cols="20" md="8">
      <v-text-field
        v-model="expensePayload.remarks"
        label="Expense Description"
        prepend-icon="mdi-chat-processing-outline"
        required
      ></v-text-field>
    </v-col>

    <v-col cols="20" md="8">
      <v-file-input
        v-model="expensePayload.files"
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
import { expensePostAPI } from "./../constent/constent";

export default {
  data: () => ({
    baseurl: process.env.VUE_APP_BASE_URL,
    port: process.env.VUE_APP_UI_PORT,
    valid: false,
    itemsmode: ["Online Payment", "Bank Transfer", "Cheque", "Cash"],
    itemstype: ["Rent", "Bill Payment", "Salary", "Item Purchase", "Others"],

    expensePayload: {
      expensetype: "",
      txdate: "",
      mode: "",
      amount: "",
      remarks: "",
      files: "",
    },
    savingSuccessful: false,
    message: "",
  }),

  methods: {
    submitExpense() {
      const urlExpensePost = `${this.baseurl}:${this.port}${expensePostAPI}`;
      console.log("PostPayload --->", this.expensePayload);

      axios
        .post(urlExpensePost, this.expensePayload)
        .then((response) => {
          this.savingSuccessful = true;
          this.message = response.data.amount;
          console.log("Response Payload --->", response.data.amount);
        })
        .catch((error) => {
          this.savingSuccessful = true;
          this.message = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
