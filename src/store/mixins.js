
export const mixinStates = () => {
    return {
        all: [],
        meta: [],
        isModalOpen: false,
        actionType: '',
    }
}

export const mixinMutations = () => {
    return {
        fetchAll(state, items) {
            state.all = items
        },
        setMeta(state, meta) {
            state.meta = meta
        },
        newItem(state) {
            state.actionType = 'create';
            state.isModalOpen = true
        },
        editItem(state, item) {
            state.isModalOpen = true
            state.actionType = 'update';
            state.form = Object.assign(state.form, item)
        },
        deleteItem(state, item) {
            state.actionType = 'delete';
            state.form = Object.assign(state.form, item)
        },
        closeModal(state) {
            state.isModalOpen = false
        },
        resetForm(state) {
            state.form.reset();
        },
        updateForm(state, item) {
            Object.assign(state.form, item);
        },
        getErrors(state, error) {
            state.form.errors.record(error)
        },
    };
}