import styled from "styled-components";
import CardButtons from "./CardButtons";
import { Link } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";
import "../App.css"

const CardWrapper = styled.div`
    font-weight: 600;
`;
const CardImage = styled.div`
    position: relative;
    margin-bottom: 2.25rem;
    aspect-ratio: 16/9;
    @media (min-width: 1024px) {
        aspect-ratio: 1;
    }
`;
const Picture = styled.picture`
    position: relative;
    display: block;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
`;

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: all 0.25s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        opacity: 1;
    }
`;
const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddedCartText = styled.span`
    position: absolute;
    animation: anim 1s ease-out 1;
    @keyframes anim {
        from {
            bottom: 30px;
        }
        to {
            bottom: 50%;
            transform: translateY(50%);
        }
    }
`;

function Card({ product }) {
    const { cartBtnRef } = useContext(GlobalContext);
    const addedTextRef = useRef(null);
    let prevQty = useRef(product.quantity);

    useEffect(() => {
        if (product.quantity !== 0 && product.quantity > prevQty.current) {
            addedTextRef.current.style.display = "flex";
            console.log("test");
            cartBtnRef.current.classList.add("cart-img-active")
            setTimeout(() => {
                addedTextRef.current.style.display = "none";
                cartBtnRef.current.classList.remove("cart-img-active")
            }, 1250);
        } else {
            addedTextRef.current.style.display = "none";
        }
        prevQty.current = product.quantity;
    }, [product.quantity]);
    // document.body.style.fi = "0";
    return (
        <CardWrapper>
            <CardImage>
                <Link to={`/${product.id}`} state={product}>
                    <Picture>
                        <Overlay>
                            <i className="text-5xl fa-solid fa-circle-info text-stone-100"></i>
                        </Overlay>
                        <Overlay
                            ref={addedTextRef}
                            className="text-3xl font-bold tracking-wide text-center !opacity-100 text-stone-950"
                        >
                            <AddedCartText>Added to Cart!</AddedCartText>
                        </Overlay>
                        <source
                            media="(min-width:1024px)"
                            srcSet={product.image.desktop}
                        />
                        <source
                            media="(min-width:640px)"
                            srcSet={product.image.tablet}
                        />
                        <img
                            src={product.image.mobile}
                            alt={product.name}
                            className={`object-cover w-full h-full rounded-2xl ${
                                product.quantity !== 0 &&
                                "border-2 border-[#b3330c]"
                            }`}
                        />
                    </Picture>
                </Link>
                <CardButtons product={product}></CardButtons>
            </CardImage>
            <CardInfo>
                <span className="text-sm font-medium text-[#87635a]">
                    {product.category}
                </span>
                <span className="text-[#260f08]">{product.name}</span>
                <span className="text-[#c73a0f]">
                    ${product.price.toFixed(2)}
                </span>
            </CardInfo>
        </CardWrapper>
    );
}

export default Card;
