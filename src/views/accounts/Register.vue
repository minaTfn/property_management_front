<template>
    <div class="d-flex justify-center align-center fill-height">
        <v-card min-width="500" rounded class="px-5 pb-5" shaped elevation="5" :loading="loading">
            <form @keydown="form.errors.clear($event.target.name)">
                <v-card-title class="text-h1 py-6">
                    Register
                </v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="form.email"
                            label="Email"
                            name="email"
                            :error-messages="form.errors.get('email')"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="form.password"
                            label="Password"
                            name="password"
                            type="password"
                            :error-messages="form.errors.get('password')"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="form.repeat_password"
                            label="Repeat Password"
                            name="repeat_password"
                            type="password"
                            :error-messages="form.errors.get('repeat_password')"
                            required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="registerUser" large class="primary">
                        Register
                    </v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import Form from "@/helpers/classes/Form";
    import _ from 'lodash';

    export default {
        name: "Register",
        data: () => ({
            form: new Form(),
            loading: false
        }),

        watch:{
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm({form:'registerForm',data:form});
                }, 500), deep: true
            }
        },
        mounted(){
            this.form = _.cloneDeep(this.$store.state.accounts.registerForm)
        },

        methods: {
            ...mapMutations('accounts',['resetForm', 'updateForm']),
            ...mapActions('accounts', ['register']),
            registerUser() {
                // this.$store.commit('accounts/setFormErrors', {form: 'registerForm', errors: {"repeatPassword":["This field may not be blank."]}})
                this.loading = true;
                this.register(this.form.data())
                    .then(() => {
                        this.loading = false;
                        this.resetForm();
                    })
            },
        }
    }

</script>
