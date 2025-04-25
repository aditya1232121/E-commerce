import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartconstant"; // <-- Correct import
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;  // it gives data and item has product in it 
            const isItemExist = state.cartItems.find((i) => i.product === item.product); // Check if the item already exists in the cart which is old item
            
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product 
                          ? { ...i, quantity: item.quantity } // ✅ only update the quantity of the item, not the full object
                          : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload), // Remove the item from the cart
            };

        case SAVE_SHIPPING_INFO: 
            return {
                ...state,
                shippingInfo: action.payload, 
            };

        default:
            return state;
    }
};
