import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialProducts = {
    items: [],
    quantity: 0,
    value: 0
}

export const productsSlice = createSlice({
    name: "products",
    initialState: initialProducts,
    reducers: {
        addToCart: (state, action) => {
            const find = state.items.findIndex(item => item.id == action.payload.id)
            if (find >= 0) {
                state.items[find].quantity += 1
            } else {
                const tempVar = { ...action.payload, quantity: 1 }
                state.items.push(tempVar)
            }
            toast.success("Product Added Successfully");
        },
        incrementItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id == action.payload) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item
            })
            toast.success("Product Increased Successfully");
        },
        decrementItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id == action.payload) {
                    if (item.quantity >= 1) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                }
                return item
            })
            toast.warn("Product Decreased Successfully");
        },
        getCartTotal: state => {
            let { value, quantity } = state.items.reduce((cartTotal, cartItem) => {
                // console.log("cartTotal", cartTotal);
                // console.log("cartItem", cartItem);
                const { price, quantity } = cartItem;
                // console.log(price, quantity)
                const itemTotal = price * quantity;
                cartTotal.value = cartTotal.value + itemTotal;
                cartTotal.quantity = cartTotal.quantity + quantity;
                return cartTotal
            },
                { value: 0, quantity: 0 });
            state.value = value.toFixed(2);
            state.quantity = quantity
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            toast.error("Product Deleted Successfully");
        }
    }
})
export default productsSlice.reducer
export const { addToCart, incrementItem, decrementItem, getCartTotal, removeItem } = productsSlice.actions