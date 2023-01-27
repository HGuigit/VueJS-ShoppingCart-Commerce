import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    bagProducts: [],
  },
  mutations: {
    mutateProducts(state, products) {
      state.products = products;
    },
    mutateBagProducts(state, product) {
      state.bagProducts.push(product);
    },
    mutateRemoveBagProduct(state, product) {
      state.bagProducts = state.bagProducts.filter(
        (item) => item.id !== product.id
      );
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        commit("mutateProducts", res.data);
      });
    },
    addToBag({ commit }, product) {
      commit("mutateBagProducts", product);
    },
    removeFromBag({ commit }, product) {
      commit("mutateRemoveBagProduct", product);
    },
  },
  modules: {},
});
