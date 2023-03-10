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
      localStorage.setItem("bagProducts", JSON.stringify(state.bagProducts));
    },
    mutateBagProductsLoadBag(state, products) {
      state.bagProducts = products;
    },
    mutateRemoveBagProduct(state, product) {
      state.bagProducts = state.bagProducts.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem("bagProducts", JSON.stringify(state.bagProducts));
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        commit("mutateProducts", res.data);
      });
    },
    loadBag({ commit }) {
      if (localStorage.getItem("bagProducts")) {
        commit(
          "mutateBagProductsLoadBag",
          JSON.parse(localStorage.getItem("bagProducts"))
        );
      }
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
