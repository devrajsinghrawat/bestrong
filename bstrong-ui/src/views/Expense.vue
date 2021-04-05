<template>
  <v-card
    elevation="12"
    shaped
    class="mx-auto"
    max-width="1020"
    color="brown lighten-1"
  >
    <v-img
      :src="`https://picsum.photos/1000/1000?image=${15 * 5 + 10}`"
      aspect-ratio="18"
    >
    </v-img>

    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <div>
          <v-alert dense dismissible type="success" v-if="m == 1">
            {{ postmessage }}.
          </v-alert>
          <v-alert dense dismissible type="error" v-if="m == 2">
            {{ postmessage }}.
          </v-alert>
        </div>

        <v-row>
          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="expense type"
              rules="required"
            >
              <v-select
                v-model="recordPayload.expensetype"
                :items="itemstype"
                :error-messages="errors"
                label="Expense Type"
                data-vv-name="expense type"
                prepend-icon="mdi-chemical-weapon"
                required
                dense
              ></v-select>
            </validation-provider>
          </v-col>
          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="Payment mode"
              rules="required"
            >
              <v-select
                v-model="recordPayload.mode"
                :items="itemsmode"
                :error-messages="errors"
                data-vv-name="mode"
                label="Payment Mode"
                prepend-icon="mdi-book-open"
                required
                dense
              ></v-select>
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <validation-provider
                  v-slot="{ errors }"
                  name="Date"
                  rules="required"
                >
                  <v-text-field
                    v-model="recordPayload.txdate"
                    label="Expense Date"
                    prepend-icon="mdi-calendar"
                    :error-messages="errors"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </validation-provider>
              </template>
              <v-date-picker
                v-model="recordPayload.txdate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="Amount"
              :rules="{
                required: true,
                numeric: true,
              }"
            >
              <v-text-field
                v-model="recordPayload.amount"
                label="Amount Paid"
                prepend-icon="mdi-book-open"
                :counter="5"
                :error-messages="errors"
                required
              >
              </v-text-field>
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="20" md="8">
            <validation-provider
              v-slot="{ errors }"
              name="Payment mode"
              rules="required"
            >
              <v-text-field
                v-model="recordPayload.remarks"
                :error-messages="errors"
                label="Expense Details.. "
                prepend-icon="mdi-chat-processing-outline"
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="20" md="8">
            <v-file-input accept="image/*" label="File input"></v-file-input>
          </v-col>
        </v-row>

        <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
    <v-img
      :src="`https://picsum.photos/1000/1000?image=${15 * 5 + 10}`"
      :lazy-src="`https://picsum.photos/10/6?image=${15 * 5 + 10}`"
      aspect-ratio="18"
    >
    </v-img>
  </v-card>
</template>

<script>
import axios from "axios";
import { expensePostAPI } from "./../constent/constent";

import { required, numeric } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("numeric", {
  ...numeric,
  message: "{_field_} should be numbers only",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    baseurl: process.env.VUE_APP_BASE_URL,
    port: process.env.VUE_APP_UI_PORT,
    menu: false,

    itemsmode: ["Online Payment", "Bank Transfer", "Cheque", "Cash"],
    itemstype: ["Rent", "Bill Payment", "Salary", "Item Purchase", "Others"],

    recordPayload: {
      expensetype: "",
      txdate: "",
      mode: "",
      amount: "",
      remarks: "",
      files: "",
    },

    postmessage: "",
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();

      const urlExpensePost = `${this.baseurl}:${this.port}${expensePostAPI}`;
      console.log("PostPayload --->", this.recordPayload);
      console.log("urlExpensePost --->", urlExpensePost);

      axios
        .post(urlExpensePost, this.recordPayload)
        .then((response) => {
          this.m = 1;
          this.postmessage = `Expense for RS/- ${response.data.amount} has been recorded!`;
          console.log("Response Payload --->", response.data.amount);
          this.clear();
        })
        .catch((error) => {
          this.m = 2;
          this.postmessage = error.message;
          console.error("There was an error!", error);
        });
    },

    clear() {
      this.recordPayload.expensetype = "";
      this.recordPayload.txdate = "";
      this.recordPayload.mode = "";
      this.recordPayload.amount = "";
      this.recordPayload.remarks = "";
      this.recordPayload.files = "";
      // this.m = 0;

      this.$refs.observer.reset();
    },
  },
};
</script>
