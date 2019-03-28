import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

import { fetchShopDetails, fetchCatalog, fetchProduct } from '../utlls/MAM'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
    added: [],
    all: [],
    shop: {
        data: {
            name: ''
        }
    }
}

// getters
const getters = {
    allProducts: state => state.all, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
        return state.added.map(({ id, quantity }) => {
            const product = state.all.find(p => p.data.id === id)

            return {
                title: product.data.title,
                price: product.data.price,
                quantity
            }
        })
    },
    getShopDetails: state => state.shop
}

// actions
const actions = {
    addToCart({ commit }, product) {
        console.log(product)
        commit(types.ADD_TO_CART, {
            id: product.data.id
        })
    },
    fetchShopDetails({ commit }, root ) {
        fetchShopDetails(root, 'TEST').then(function (response) {
            commit("FETCHED_SHOP_DETAILS", response);
            fetchCatalog(response.catalog_root, 'TEST').then(function (response) {                 
                response.forEach(item => {
                    if (item.status === "add_blueprint") {
                        fetchProduct(item.data.product).then(function (response) {
                            commit("FETCHED_PRODCUT", response);
                         })
                    }
                });
            })
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
    },
    [types.FETCHED_SHOP_DETAILS](state, shop_details) {
        state.shop = shop_details
        state.all = []

    }, 
    [types.FETCHED_PRODCUT](state, product) {
        state.all.push(product)

    },

}

// one store for entire application
export default new Vuex.Store({
    state,
    strict: debug,
    getters,
    actions,
    mutations
})