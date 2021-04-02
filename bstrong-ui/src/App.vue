<template>
  <v-app id="inspire">
    <v-navigation-drawer color="yellow darken-1" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title black--text">
            BESTRONG-FC
          </v-list-item-title>
          <v-list-item-subtitle class="black--text">
            Member Managenet System
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="black"></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon class="black--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="black--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="yellow lighten-2">
      <v-app-bar-nav-icon
        class="black--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="black--text">{{ appTitle }} </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    appTitle: "Dashboard and Forms",
    drawer: null,
    items: [
      { title: "Quick Dashboard", icon: "mdi-view-dashboard", to: "/" },
      {
        title: "Member Dashboard",
        icon: "mdi-view-dashboard",
        to: "/memberDashboard",
      },
      {
        title: "Revenue Dashboard",
        icon: "mdi-credit-card-outline",
        to: "/revenueDashboard",
      },
      { title: "Registration", icon: "mdi-account", to: "/registration" },
      { title: "Renewal", icon: "mdi-account-reactivate", to: "/renewal" },
      { title: "Expense", icon: "mdi-credit-card-outline", to: "/expense" },
    ],
  }),

  // methods: {
  //   changeTitle() {
  //     // console.log(e);
  //     this.appTitle = e.item.title;
  //   },
  // },
};
</script>