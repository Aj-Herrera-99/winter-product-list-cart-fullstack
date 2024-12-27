import styled from "styled-components";
import CardButtons from "./CardButtons";
import { Link, useLocation } from "react-router";

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
    &:hover {
        opacity: 1;
    }
`;
const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

function Card({ product }) {
    return (
        <CardWrapper>
            <CardImage>
                <Link to={`/${product.id}`} state={product}>
                    <Picture>
                        <Overlay>
                            <i className="absolute text-5xl -translate-x-1/2 -translate-y-1/2 fa-solid fa-circle-info top-1/2 left-1/2 text-stone-100"></i>
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
