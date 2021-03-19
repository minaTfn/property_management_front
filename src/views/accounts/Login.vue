<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="form.email"
                            label="Email"
                            required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                            v-model="form.password"
                            label="Password"
                            required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-btn @click="loginUser">
                        Login
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Login",
        data: () => ({
            form: {
                email: '',
                password: '',
            }
        }),

        methods: {

            ...mapActions('accounts', ['login']),
            loginUser() {
                this.login(this.form);
            },
        }
    }
</script>

<style scoped>

</style>