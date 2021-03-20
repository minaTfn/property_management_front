import Errors from './Errors'
import api from '../api'
class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data = {}) {
        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
    }


    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }


    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Submit the form.
     *
     * @param {string} apiPath
     */
    submit(apiPath) {
        const path = this.getRealPath(apiPath);
        return new Promise((resolve, reject) => {
            path(this.data())
                .then(response => {
                    this.onSuccess();

                    resolve(response);
                })
                .catch(error => {
                    this.onFail(error.response.data);

                    reject(error.response.data);
                });
        });
    }

    /**
     * Getting the real api path from nested string in api.js
     *
     * @param {string} apiPath
     */
    getRealPath(apiPath){
        let parts = apiPath.split( "." ),
            length = parts.length,
            i,
            property = api || this;

        for ( i = 0; i < length; i++ ) {
            property = property[parts[i]];
        }

        return property;
    }


    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess() {

        this.reset();
    }


    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.record(errors);
    }

}

export default Form