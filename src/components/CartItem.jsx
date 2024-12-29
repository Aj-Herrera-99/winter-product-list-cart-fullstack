import { useContext } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";

function CartItem({ product, name }) {
    const { remProdSel } = useContext(GlobalContext);
    return (
        <div className="relative flex items-center py-5 border-b border-b-stone-300">
            <div className="flex flex-wrap w-full gap-2 h-14">
                {name === "modal" && (
                    <div className="h-full">
                        <img
                            src={product.image.thumbnail}
                            alt=""
                            className="object-cover h-full rounded-md "
                        />
                    </div>
                )}
                <div className="flex flex-col justify-between ">
                    <span className="text-[#260f08]">{product.name}</span>
                    <div className="flex gap-2 lg:gap-4">
                        <span className="text-[#c73a0f]">
                            {product.quantity}x
                        </span>
                        <span className="text-[#87635a] font-normal">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[#87635a]">
                            ${(product.quantity * product.price).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
            {name === "cart" && (
                <i
                    onClick={() => remProdSel(product)}
                    className="flex items-center justify-center w-6 border border-[#87635a] text-[#87635a] rounded-full cursor-pointer fa-solid fa-xmark scale-90 hover:scale-100 aspect-square hover:text-[#260f08] hover:border-[#260f08]"
                ></i>
            )}
        </div>
    );
}

export default CartItem;
