import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { GlobalContext } from "./state-management/stores/GlobalContext";
import productsReducer from "./state-management/reducers/products";
import styled from "styled-components";
import Header from "./components/Header";
import Card from "./components/Card";
import Cart from "./components/Cart";
import "./App.css";

const CardsSection = styled.section`
    width: 100%;
    @media (min-width: 768px) {
        width: calc(100% * (4 / 6));
    }
`;
const CartSection = styled.section`
position: relative;
z-index: 20;
    width: 100%;
    @media (min-width: 640px) {
        padding-inline: 2rem;
    }
    @media (min-width: 768px) {
        width: calc(100% * (2 / 6));
    }
`;

const Main = styled.main`
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`;

const ModalContainer = styled.div`
    display: ${(props) => (props.$isModal ? "flex" : "none")};
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100dvh;
    top: 0;
    left: 0;
    position: fixed;
    justify-content: center;
    align-items: end;
    z-index: 30;
    @media (min-width: 640px) {
        padding-inline: 25%;
        align-items: center;
    }
    @media (min-width: 1024px) {
        padding-inline: 35%;
    }
`;

const CartButton = styled.div`
    display: none;
    @media (max-width: 640px) {
        display: block;
        position: fixed;
        bottom: 35px;
        right: 35px;
        z-index: 10;
        background-color: rgba(255, 0, 0, 0.8);
        padding: 0.75rem;
        aspect-ratio: 1;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0.6;
        &:hover {
            scale: 1.1;
            opacity: 1;
        }
    }
`;
const CartImg = styled.img`
    filter: brightness(0) saturate(100%) invert(95%) sepia(100%) saturate(14%)
        hue-rotate(213deg) brightness(104%) contrast(104%);
`;


function App() {
    const [initData, setInitData] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [products, dispatchProducts] = useReducer(productsReducer, {
        prods: [],
        count: 0,
        total: 0,
    });

    const cartBtnRef = useRef(null);

    const getProdsSaved = (products) => {
        dispatchProducts({
            type: "GET_SAVED",
            payload: products,
        });
    };

    const incProdSel = (product) => {
        dispatchProducts(
            {
                type: "INCREMENT",
                payload: product,
                initData: initData,
            },
        );
        const newData = initData.map((prod) =>
            prod.id === product.id
                ? { ...prod, quantity: prod.quantity + 1 }
                : prod
        );
        setInitData(newData);
        localStorage.setItem(
            product.id,
            JSON.stringify({
                ...product,
                quantity: product.quantity + 1,
            })
        );
    };

    const decProdSel = (product) => {
        dispatchProducts({ type: "DECREMENT", payload: product });
        const newData = initData.map((prod) =>
            prod.id === product.id
                ? { ...prod, quantity: prod.quantity - 1 }
                : prod
        );
        setInitData(newData);
        if (product.quantity <= 1) {
            localStorage.removeItem(product.id);
        } else {
            localStorage.setItem(
                product.id,
                JSON.stringify({
                    ...product,
                    quantity: product.quantity - 1,
                })
            );
        }
    };

    const remProdSel = (product) => {
        dispatchProducts({ type: "REMOVE", payload: product });
        const newData = initData.map((prod) =>
            prod.id === product.id ? { ...prod, quantity: 0 } : prod
        );
        setInitData(newData);
        localStorage.removeItem(product?.id);
    };

    const resetQuantities = () => {
        dispatchProducts({ type: "RESET", payload: initData });
        const resetData = initData.map((prod) =>
            prod.quantity != 0 ? { ...prod, quantity: 0 } : prod
        );
        setInitData(resetData);
        products.prods.forEach((prod) => localStorage.removeItem(prod.id));
    };

    const scrollToCart = () => {
        document.body.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    useEffect(() => {
        fetch("./assets/data.json")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item, index) => {
                    item.id = index + 1;
                    item.quantity = 0;
                });
                if (!localStorage.length) {
                    setInitData(data);
                } else {
                    data.forEach((prod) => {
                        if (localStorage.getItem(prod.id)) {
                            const prodSaved = JSON.parse(
                                localStorage.getItem(prod.id)
                            );
                            prod.quantity = prodSaved.quantity;
                        }
                    });
                    console.log(data);
                    setInitData(data);
                    getProdsSaved(data);
                }
                localStorage.setItem("initData", JSON.stringify(data));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                products,
                incProdSel,
                decProdSel,
                remProdSel,
                resetQuantities,
                isModal,
                setIsModal,
                cartBtnRef,
            }}
        >
            <CartButton ref={cartBtnRef}>
                <CartImg
                    onClick={scrollToCart}
                    src="./assets/images/icon-add-to-cart.svg"
                    alt="icon add to
                    cart"
                    className="w-8"
                ></CartImg>
            </CartButton>
            <CardsSection>
                <Header title="Desserts" />
                <Main>
                    {initData.map((product) => (
                        <Card key={product.id} product={product}></Card>
                    ))}
                </Main>
            </CardsSection>
            <CartSection>
                <Cart name="cart" />
            </CartSection>
            <ModalContainer $isModal={isModal}>
                <Cart name="modal" />
            </ModalContainer>
        </GlobalContext.Provider>
    );
}

export default App;
