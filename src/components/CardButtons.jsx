import { useContext } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";
import { useState, useEffect } from "react";

function CardButtons({ product }) {
    const { incProdSel, decProdSel } = useContext(GlobalContext);

    const [isZero, setIsZero] = useState(true);

    useEffect(() => {
        if (product.quantity === 0) {
            setIsZero(true);
        }
    }, [product]);

    const operation = (e) => {
        e.stopPropagation();
        if (e.target.closest(".fa-minus")) {
            decProdSel(product);
        } else if (e.target.closest(".fa-plus")) {
            incProdSel(product);
        } else if (e.target.closest("div")) {
            if (isZero) {
                incProdSel(product);
                setIsZero(false);
            }
        }
    };

    return (
        <div
            onClick={operation}
            className={`absolute min-w-40 w-1/2 sm:w-3/5 lg:w-3/4 xl:w-1/2 left-1/2 -translate-x-1/2 text-center py-3 rounded-3xl bottom-[-20px] border-1 border border-[#ad8985] 
             ${
                 !isZero
                     ? "bg-[#b3330c] border-[#b3330c] text-white"
                     : "bg-white hover:border-[#b3330c] hover:text-[#b3330c] cursor-pointer"
             }
            `}
        >
            {isZero ? (
                <div className="flex items-center justify-center gap-2">
                    <img
                        src="assets/images/icon-add-to-cart.svg"
                        alt="icon add to cart"
                    />
                    <span>Add to Cart</span>
                </div>
            ) : (
                <>
                    <i
                        onClick={operation}
                        className="absolute p-1 -translate-y-1/2 border border-white rounded-full cursor-pointer left-2 top-1/2 fa-solid fa-minus hover:bg-white hover:text-[#b3330c]"
                    ></i>
                    <span>{product.quantity}</span>
                    <i
                        onClick={operation}
                        className="absolute p-1 -translate-y-1/2 border border-white rounded-full cursor-pointer right-2 top-1/2 fa-solid fa-plus hover:bg-white hover:text-[#b3330c]"
                    ></i>
                </>
            )}
        </div>
    );
}

export default CardButtons;
