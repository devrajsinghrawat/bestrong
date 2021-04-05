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
              name="phoneNumber"
              :rules="{
                required: true,
                digits: 10,
              }"
            >
              <v-text-field
                v-model="recordPayload.mobile"
                label="Registered Mobile Number"
                prepend-icon="mdi-phone"
                :counter="10"
                :error-messages="errors"
                required
                @change="fetchMemberDetails"
              ></v-text-field>
            </validation-provider>
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

        <v-row>
          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="plan"
              rules="required"
            >
              <v-select
                v-model="recordPayload.plan"
                :items="plans"
                :error-messages="errors"
                label="Plan"
                data-vv-name="plan"
                prepend-icon="mdi-chemical-weapon"
                required
                dense
              ></v-select>
            </validation-provider>
          </v-col>
          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="mode"
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
                    label="Renewal Date"
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

          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="Balance"
              :rules="{
                required: true,
                numeric: true,
              }"
            >
              <v-text-field
                v-model="recordPayload.balance"
                :error-messages="errors"
                :counter="5"
                label="Balance (if any)"
                prepend-icon="mdi-book-open"
              >
              </v-text-field>
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="20" md="8">
            <v-text-field
              v-model="recordPayload.remarks"
              label="Remakrs if any "
              prepend-icon="mdi-chat-processing-outline"
            ></v-text-field>
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
import {
  memberRecordPostAPI,
  fetchMemberByMobileAPI,
} from "./../constent/constent";

import {
  required,
  digits,
  numeric,
  email,
  max,
  regex,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("numeric", {
  ...numeric,
  message: "{_field_} should be numbers only",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    baseurl: process.env.VUE_APP_BASE_URL,
    port: process.env.VUE_APP_UI_PORT,

    postmessage: "",
    m: 0,

    menu: false,

    genders: ["Male", "Female", "Rather not to say"],
    plans: ["1 Month", "3 Months", "6 Months", "1 Year"],
    itemsmode: ["Online Payment", "Bank Transfer", "Cheque", "Cash"],

    recordPayload: {
      txtype: "RENEWAL",
      name: "",
      mobile: "",
      email: "",
      plan: "",
      txdate: "",
      mode: "",
      amount: "",
      balance: 0,
      remarks: "",
      files: "",
    },
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      const url = `${this.baseurl}:${this.port}${memberRecordPostAPI}`;
      /** Record the Member Tx data for Registration */
      axios
        .post(url, this.recordPayload)
        .then((res) => {
          this.m = 1;

          console.log("Response Payload --->", res.data.amount);
          this.postmessage = `Renewal Successful : Name - ${res.data.name}, Plan - ${res.data.plan}, Amount - ${res.data.amount}, Balance - ${res.data.balance}`;
          console.log("Response from Member Record Data", res.data);
        })
        .catch((error) => {
          this.m = 2;
          this.postmessage = "Error while capturing the Member Record!";
          console.error("Error while capturing the Member Record", error);
        });
    },

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
          this.m = 2;
          this.postmessage = "Member does not exist Yet!";
          console.error("There was an error!", error);
        });
    },

    clear() {
      this.recordPayload.name = "";
      this.recordPayload.mobile = "";
      this.recordPayload.email = "";
      this.recordPayload.plan = "";
      this.recordPayload.txdate = "";
      this.recordPayload.mode = "";
      this.recordPayload.amount = "";
      this.recordPayload.balance = "";
      this.recordPayload.remarks = "";
      this.recordPayload.files = "";
      this.m = 0;

      this.$refs.observer.reset();
    },
  },
};
</script>