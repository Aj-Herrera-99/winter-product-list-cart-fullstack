import { useContext } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";

function CartTotal() {
    const {products} = useContext(GlobalContext)
    return (
        <div className="flex items-center justify-between py-5">
            <>
                <span className="text-[#260f08] font-normal">Order Total</span>

                <span className="text-2xl font-bold text-[#260f08]">
                    ${products.total.toFixed(2)}
                </span>
            </>
        </div>
    );
}

export default CartTotal;
