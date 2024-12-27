import { useReducer, useState, useEffect } from "react";
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
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    justify-content: center;
    align-items: end;
    @media (min-width: 640px) {
        padding-inline: 25%;
        align-items: center;
    }
    @media (min-width: 1024px) {
        padding-inline: 35%;
    }
`;

function App() {
    const [initData, setInitData] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [products, dispatchProducts] = useReducer(productsReducer, {
        prods: [],
        count: 0,
        total: 0,
    });

    const incProdSel = (product) => {
        dispatchProducts({
            type: "INCREMENT",
            payload: product,
            initData: initData,
        });
        const newData = initData.map((prod) =>
            prod.id === product.id
                ? { ...prod, quantity: prod.quantity + 1 }
                : prod
        );
        setInitData(newData);
    };

    const decProdSel = (product) => {
        dispatchProducts({ type: "DECREMENT", payload: product });
        const newData = initData.map((prod) =>
            prod.id === product.id
                ? { ...prod, quantity: prod.quantity - 1 }
                : prod
        );
        setInitData(newData);
    };

    const remProdSel = (product) => {
        dispatchProducts({ type: "REMOVE", payload: product });
        const newData = initData.map((prod) =>
            prod.id === product.id ? { ...prod, quantity: 0 } : prod
        );
        setInitData(newData);
    };

    const resetQuantities = () => {
        dispatchProducts({ type: "RESET", payload: initData });
        const resetData = initData.map((prod) =>
            prod.quantity != 0 ? { ...prod, quantity: 0 } : prod
        );
        setInitData(resetData);
    };

    useEffect(() => {
        fetch("./assets/data.json")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item, index) => {
                    item.id = index + 1;
                    item.quantity = 0;
                });
                setInitData(data);
                localStorage.setItem("initData", JSON.stringify(data));
            })
            .catch((err) => console.error(err));
    }, []);

    // TODO: salvataggio del carrello anche al ricaricamento della pag
    useEffect(() => {
        products.prods.forEach((prod) => {
            if (!prod.quantity) {
                localStorage.removeItem(prod.id);
            } else {
                localStorage.setItem(prod.id, JSON.stringify(prod));
            }
        });
    }, [products]);

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
            }}
        >
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
