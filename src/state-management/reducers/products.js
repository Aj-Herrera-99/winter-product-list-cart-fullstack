function productsReducer(state, action) {
    if (action.type === "FETCH_INIT")
        return { ...state, prods: action.payload };

    if (action.type === "INCREMENT") {
        const prodSel = state.prods.find(
            (prod) => prod.id === action.payload.id
        );
        let newState;
        if (prodSel) {
            newState = state.prods.map((prod) => {
                return prod.id === prodSel.id
                    ? { ...prodSel, quantity: action.payload.quantity + 1 }
                    : prod;
            });
        } else {
            newState = [...state.prods, { ...action.payload, quantity: 1 }];
        }
        return {
            prods: newState,
            count: state.count + 1,
            total: state.total + action.payload.price,
        };
    }
    if (action.type === "DECREMENT") {
        const prodSel = state.prods.find(
            (prod) => prod.id === action.payload.id
        );
        let newState;
        if (action.payload.quantity === 1) {
            newState = state.prods.filter(
                (prod) => prod.id !== action.payload.id
            );
        } else {
            newState = state.prods.map((prod) => {
                return prod.id === prodSel.id
                    ? { ...prodSel, quantity: action.payload.quantity - 1 }
                    : prod;
            });
        }
        return {
            prods: newState,
            count: state.count - 1,
            total: state.total - action.payload.price,
        };
    }
    if (action.type === "REMOVE") {
        const subCount = action.payload.quantity;
        const subTotal = action.payload.price * action.payload.quantity;
        const newState = state.prods.filter(
            (prod) => prod.id !== action.payload.id
        );
        return {
            prods: newState,
            count: state.count - subCount,
            total: state.total - subTotal,
        };
    }

    if (action.type === "RESET") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return { prods: [], count: 0, total: 0 };
    }
}

export default productsReducer;
