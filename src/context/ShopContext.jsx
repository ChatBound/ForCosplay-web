import React , { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";




export const ShopContext = createContext();
export const ShopContextProvider = (props) => {
  const currency = "฿";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems,setCartItems] = useState({});
  const [stock, setStock] = useState({});

  

  

  const addToCart = async (itemId, size) => {
    if (!size) {
        toast.error('เลือกขนาดสินค้าด้วย!');
        return;
    }

    let cartData = structuredClone(cartItems);
    let stockData = structuredClone(stock); // Clone ข้อมูล stock

    if (stockData[itemId] === undefined) {
        toast.error('ไม่มีข้อมูลสต็อกสินค้า!');
        return;
    }

    if (stockData[itemId] <= 0) {
        toast.error('สินค้าหมดแล้ว!');
        return;
        
    }

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    stockData[itemId] -= 1; // ลดสต็อกสินค้า

    setCartItems(cartData);
    setStock(stockData); // อัปเดต state ของ stock

};

  useEffect(() => {
    let initialStock = {};
    products.forEach((product) => {
        initialStock[product._id] = product.stock;
    });
    setStock(initialStock);
  }, [products]);

  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId,size,quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items);
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }  
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    stock, 
  
   
    
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

