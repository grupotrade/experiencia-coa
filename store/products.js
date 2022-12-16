export const state = {
    products: [],
    productsHome: []
}

export const actions = {
    async getProducts({commit}) {
        let ref = this.$fire.firestore.collection('products').where('deletedAt', '==', null)
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setProducts', result) 
            })
    },
    async getProductsHome({commit}) {
        let ref = this.$fire.firestore.collection('products').where('onHome', '==', true)
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setProductsHome', result) 
            })
     }
}
export const mutations = {
    setProducts(state, payload) {
        state.products = payload
    },
    setProductsHome(state, payload) {
        state.productsHome = payload
    }
}

export const getters = {
    getProducts: (state) => {
        return state.products
    },
    getProductsHome: (state) => {
        return state.productsHome
    }
}

