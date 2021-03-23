<template>
    <v-menu v-model="isOpen"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                    :value="value"
                    :label="label"
                    :name="name"
                    :clearable="clearable"
                    :error-messages="error"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="valueChanged(null)"
            ></v-text-field>
        </template>
        <v-date-picker
                :value="convertToPickerFormat(value)"
                no-title
                :key="value || `picker${Math.floor(Math.random() * 100)}`"
                @update:picker-date="convertToPickerFormat(value)"
                @change="valueChanged"
                @input="isOpen = false"
        ></v-date-picker>
    </v-menu>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "DatePicker",

        props: {
            name: String,
            label: String,
            value: {default:new Date().toISOString().substr(0, 10)},
            format: {default:'MM-DD-YYYY'},
            error: {},
            required: {default: false, type: Boolean},
            clearable: {default: false, type: Boolean}
        },

        data() {
            return {
                isOpen: false,
            }
        },

        methods:{
            convertToFormat(value) {
                return value ? this.$moment(value).format(this.format) : ''
            },

            convertToPickerFormat(value) {
                return value ? this.$moment(value).format().substr(0, 10) : ''
            },

            valueChanged(date) {
                this.$emit('update:value', this.convertToFormat(date));
            }
        }

    }
</script>
