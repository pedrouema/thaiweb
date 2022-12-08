import { createStore } from 'vuex'


export default createStore({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Rafael Teixeira',
            email: 'admin@example.com',
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
       
    }
})