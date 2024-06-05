<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar title="OpenAI Debugger"></v-app-bar>

      <v-navigation-drawer width="188">
        <v-list>
          <v-list-item title="Welcome" nav to="/"></v-list-item>
          <v-list-item title="Settings" nav to="/settings"></v-list-item>
          <v-list-item title="Completion" nav to="/completion"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex flex-column align-start justify-start" style="min-height: 300px;">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
