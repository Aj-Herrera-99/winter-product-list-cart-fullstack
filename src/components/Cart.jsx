import { useContext, useEffect, useRef } from "react";
import CartBtn from "./CartBtn";
import CartDesc from "./CartDesc";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { GlobalContext } from "../state-management/stores/GlobalContext";
import CartBadge from "./CartBadge";
import CartEmptyIcon from "./CartEmptyIcon";
import styled from "styled-components";

const ItemContainer = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 50vh;
    @media (orientation: landscape) and (max-height: 640px) {
        max-height: 100px;
    }
`;

function Cart({ name }) {
    const { products } = useContext(GlobalContext);

    const itemWrapperRef = useRef(null);

    // fixme: deve funzionare solo per tablet e desktop
    useEffect(() => {
        if (document.body.offsetWidth > 768) {
            if (itemWrapperRef.current?.childElementCount) {
                itemWrapperRef.current.lastElementChild.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }
        }
    }, [products]);

    return (
        <div
            className={`bg-white rounded-lg p-5 mt-5 w-full font-semibold max-h-[95vh] ${
                name == "cart" && "md:fixed md:max-w-[25vw]"
            }`}
        >
            <CartDesc name={name} />
            <ItemContainer
                $name={name}
                className="item-wrapper"
                ref={itemWrapperRef}
            >
                {products.prods
                    .filter((product) => product.quantity > 0)
                    .map((product) => (
                        <CartItem
                            key={product.id}
                            name={name}
                            product={product}
                        />
                    ))}
            </ItemContainer>
            {products.count !== 0 ? (
                <>
                    <CartTotal />
                    {name === "cart" ? (
                        <>
                            <CartBadge></CartBadge>

                            <CartBtn>Confirm Order</CartBtn>
                        </>
                    ) : (
                        <CartBtn name={name}>Start New Order</CartBtn>
                    )}
                </>
            ) : (
                <CartEmptyIcon />
            )}
        </div>
    );
}

export default Cart;
