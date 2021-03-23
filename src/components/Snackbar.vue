<template>
  <v-snackbar
    v-model="show"
    right
    timeout="3000"
    :color="color"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon small>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        data () {
            return {
                show: false,
                message: '',
                color: ''
            }
        },
        created () {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'snackbar/showMessage') {
                    this.message = state.snackbar.message
                    this.color = state.snackbar.color
                    this.show = true
                }
            })
        }
    }
</script>
