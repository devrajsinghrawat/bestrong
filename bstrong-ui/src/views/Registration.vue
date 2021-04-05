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
              name="Name"
              rules="required|max:20"
            >
              <v-text-field
                v-model="recordPayload.name"
                label="Member Name"
                prepend-icon="mdi-account"
                :counter="20"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
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
                label="Mobile Number"
                prepend-icon="mdi-phone"
                :counter="10"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>

          <v-col cols="20" md="3">
            <v-text-field
              v-model="recordPayload.email"
              label="E-mail"
              :rules="emailRules"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="20" md="2">
            <v-text-field
              v-model="recordPayload.age"
              label="Age"
              prepend-icon="mdi-account"
            >
            </v-text-field>
          </v-col>

          <v-col cols="20" md="7">
            <validation-provider
              v-slot="{ errors }"
              name="adderess"
              rules="required"
            >
              <v-text-field
                v-model="recordPayload.address"
                label="Address"
                prepend-icon="mdi-map"
                :error-messages="errors"
              >
              </v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="20" md="3">
            <validation-provider
              v-slot="{ errors }"
              name="gender"
              rules="required"
            >
              <v-select
                v-model="recordPayload.gender"
                :items="genders"
                :error-messages="errors"
                label="Gender"
                data-vv-name="gender"
                prepend-icon="mdi-gender-male-female"
                required
              ></v-select>
            </validation-provider>
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
                    label="Joining Date"
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
              rules="required"
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
              name="Amount"
              rules="required"
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

        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="Signature Info"
        >
          <v-checkbox
            v-model="recordPayload.infosign"
            :error-messages="errors"
            value="1"
            type="checkbox"
            :label="`${infomessage}`"
            required
          >
          </v-checkbox>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="Terms and Condition Sign"
        >
          <v-checkbox
            v-model="recordPayload.termssign"
            :error-messages="errors"
            value="1"
            type="checkbox"
            :label="`${termsmessage}`"
            required
          >
          </v-checkbox>
        </validation-provider>

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
import { memberPostAPI, memberRecordPostAPI } from "./../constent/constent";

import { required, digits, email, max, regex } from "vee-validate/dist/rules";
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

    emailRules: [(v) => /.+@.+/.test(v) || "E-mail must be valid"],
    // savingSuccessful: false,
    postmessage: "",
    m: 0,

    menu: false,

    checkbox: null,
    infomessage:
      "By Signing the above form the member confirms that he is physically fit to perform various workouts and exercises including weightlifting. Any injuries due to negligence will be sole responsibility of the member and the Gym management have no responsibility for the same",
    termsmessage:
      "Before signing this form, I have read, understood and hereby agree to all terms and conditions.",

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
      infosign: "",
      termssign: "",
      plan: "",
      txdate: "",
      mode: "",
      amount: "",
      balance: "0",
      remarks: "",
      files: "",
    },
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();

      const registerPayload = {
        name: this.recordPayload.name,
        mobile: this.recordPayload.mobile,
        email: this.recordPayload.email,
        age: this.recordPayload.age,
        address: this.recordPayload.address,
        gender: this.recordPayload.gender,
        infosign: this.recordPayload.infosign,
        termssign: this.recordPayload.termssign,
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

      // console.log("urlMemberPost --->", urlMemberPost);
      const url = `${this.baseurl}:${this.port}${memberPostAPI}`;
      /** Record the Member Registration data*/
      axios
        .post(url, registerPayload)
        .then((response) => {
          // this.savingSuccessful = true;
          this.postmessage = `Congratuations ${response.data.name} Welcome to BeStrong Family !`;
          console.log("Register Response --->", response.data);

          console.log(
            "PostPayload memberRecordPayload --->",
            memberRecordPayload
          );
          const url = `${this.baseurl}:${this.port}${memberRecordPostAPI}`;

          /** Record the Member Tx data for Registration */
          axios
            .post(url, memberRecordPayload)
            .then((res) => {
              this.m = 1;
              console.log("Response from Member Record Data", res.data);
            })
            .catch((error) => {
              this.m = 2;

              // this.savingSuccessful = true;
              this.postmessage = "Error while capturing the Member Record!";
              console.error("Error while capturing the Member Record", error);
            });
        })
        .catch((error) => {
          this.m = 2;

          // this.savingSuccessful = true;
          this.postmessage = "Error while registering the Member!";
          console.error("Error while registering the Member!", error);
        });
    },

    clear() {
      this.recordPayload.name = "";
      this.recordPayload.mobile = "";
      this.recordPayload.email = "";
      this.recordPayload.age = "";
      this.recordPayload.gender = "";
      this.recordPayload.plan = "";
      this.recordPayload.txdate = "";
      this.recordPayload.address = "";
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