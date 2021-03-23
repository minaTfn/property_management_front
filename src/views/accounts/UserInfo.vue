<template>
    <div class="d-flex justify-center align-center fill-height">
        <v-card min-width="500" rounded class="px-5 pb-5" shaped elevation="5" :loading="loading">
            <form @keydown="form.errors.clear($event.target.name)">
                <v-card-title class="text-h1 py-6">
                    User Details
                </v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="form.email"
                            label="Email"
                            name="email"
                            disabled
                    ></v-text-field>
                    <v-text-field
                            v-model="form.first_name"
                            label="First name"
                            name="first_name"
                    ></v-text-field>
                    <v-text-field
                            v-model="form.last_name"
                            label="Last name"
                            name="last_name"
                    ></v-text-field>
                    <v-text-field
                            v-model="form.phone_number"
                            label="phone number"
                            name="phone_number"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="updateUserInfo" large class="primary">
                        Save
                    </v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import Form from "@/helpers/classes/Form";
    import _ from 'lodash';

    export default {
        name: "UserInfo",
        data: () => ({
            form: new Form(),
            loading: false
        }),

        watch: {
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm({form: 'userInfoForm', data: form});
                }, 500), deep: true
            }
        },
        mounted() {
            this.form = _.cloneDeep(this.$store.state.accounts.userInfoForm)


            this.form.first_name = this.user.first_name

            // this.updateForm({
            //     form:'userInfoForm',
            //     data:{
            //         first_name:'Mohammad'
            //     }
            // })
        },

        computed: {

            ...mapState({
                user: state => state.accounts.loggedInUser
            })
        },

        methods: {
            ...mapMutations('accounts', ['resetForm', 'updateForm']),
            ...mapActions('accounts', ['updateUser']),
            updateUserInfo() {
                this.loading = true;
                this.updateUser(this.form.data())
                    .then(() => {
                        this.loading = false;
                        this.resetForm();
                    })
            },
        }
    }

</script>