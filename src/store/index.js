import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
    added: [],
    all: [
        {
            id: '0',
            name: 'Product 1',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptu',
            price: 1
        },
        {
            id: '1',
            name: 'Product 2',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptu',
            price: 2
        },
        {
            id: '2',
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptu',
            price: 3
        }
    ]
}

// getters
const getters = {
    allProducts: state => state.all, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
        return state.added.map(({ id, quantity }) => {
            const product = state.all.find(p => p.id === id)

            return {
                name: product.name,
                price: product.price,
                quantity
            }
        })
    }
}

// actions
const actions = {
    addToCart({ commit }, product) {
        commit(types.ADD_TO_CART, {
            id: product.id
        })
    }
}

// mutations
const mutations = {

    [types.ADD_TO_CART](state, { id }) {
        const record = state.added.find(p => p.id === id)

        if (!record) {
            state.added.push({
                id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    }
}

// one store for entire application
export default new Vuex.Store({
    state,
    strict: debug,
    getters,
    actions,
    mutations
})