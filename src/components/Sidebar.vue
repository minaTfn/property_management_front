<template>
  <div>
    <span class="light-blue d-block text-h6 py-4 white--text accent-4 text-center">
      Agency Accountability
    </span>
    <v-list class="pt-0">
      <template v-for="item in items">
        <v-list-item
          v-if="item.type == 'link'"
          :key="item.title"
          :to="item.link"
          link
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key="item.title"
          :value="false"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="dropDownItem in item.dropDownItems"
            :key="dropDownItem.title"
            :to="dropDownItem.link"
            exact
          >
            <v-list-item-content>
              <v-list-item-title>{{ dropDownItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </div>
</template>

<script>
    import sidebar from "../helpers/sidebar";

    export default {
        name: "Sidebar",
        data() {
            return {
                items: sidebar,
            }
        }
    }
</script>