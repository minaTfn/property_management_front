const snackbarPlugin = {
    install: (Vue, {store}) => {
        Vue.prototype.$snackbar = {
            showMessage: function ({message = '', color = 'success'}) {
                store.commit(
                    'snackbar/showMessage',
                    {message, color},
                    {root: true}
                )

            }
        }
    }
}

export default snackbarPlugin