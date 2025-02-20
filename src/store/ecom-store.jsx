import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct } from "../api/costumes";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  actionLogin: async (formData) => {
    const response = await axios.post("http://localhost:5001/api/login", formData);
    set({
      user: response.data.payload,
      token: response.data.token,
    });
    return response;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data});
    } catch (err) {
      console.log(err);
    }
  },


  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    // Step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },

  
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Clickkkkk', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  // เพิ่มฟังก์ชันสำหรับอัปเดต selectedPurchaseType
  actionUpdateSelectedPurchaseType: (productId, type) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId ? { ...item, selectedPurchaseType: type } : item
      ),
    }));
  },

  actionRemoveProduct: (productId) => {
    // console.log('remove jaaaaa', productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
 // getTotalPrice: () => {
 // return get().carts.reduce((total, item) => {
    // ตรวจสอบประเภทการซื้อ (selectedPurchaseType)
  //  const price =
  //    item.selectedPurchaseType === "RENTAL"
  //    ? item.rentalPrice
  //    : item.salePrice;
//
 //       return total + price * item.count;
 // }, 0);

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      const price =
        item.selectedPurchaseType === "RENTAL"
          ? item.rentalPrice * (item.selectedRentalDuration || 1) // คำนวณราคาเช่าตามจำนวนวัน
          : item.salePrice; // ราคาขายปกติ
      return total + price * item.count;
    }, 0);
 },
 
 clearCart: () => set({ carts: [] }),
  
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
