const { createContext, useReducer, useContext } = require("react")

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]
        case 'remove':
            return state.filter(item => item.id !== action.payload.id)
        case 'clear':
            return []
        default:
            return state
    }
}

const CartContext = createContext()
const CartDispatchContext = createContext()

export function CartProvider({ children }) {

    const [cart, dispatch] = useReducer(cartReducer, [])


    return <CartContext.Provider value={cart} >
        <CartDispatchContext.Provider value={dispatch}>
            {children}
        </CartDispatchContext.Provider>
    </CartContext.Provider>
}

export const actions = {
    add: 'add',
    remove: 'remove_one',
    clear: 'clear'
}
function cartReducer(cart, action) {
    switch (action.type) {
        case 'add':
            console.log(cart)
            const found = cart.find(item => item.id === action.payload.id)
            if (found) {
                return cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...cart, { ...action.payload, quantity: 1 }]
        case 'remove_one':
            const item = cart.find(item => item.id === action.payload.id)
            if (item.quantity > 1) {
                return cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item)
            } else if (item.quantity === 1) {
                return cart.filter(item => item.id !== action.payload.id)
            }
        case 'clear':
            return []
        default:
            return cart
    }
}

export function useCart() {
    return useContext(CartContext)
}

export function useCartDispatch() {
    return useContext(CartDispatchContext)
}
