import { useContext } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";

function CartDesc({ name }) {

    const {products} = useContext(GlobalContext)

    return (
        <>
            {name === "cart" ? (
                <h2 className="text-2xl font-bold text-[#c73a0f]">
                    Your Cart ({products.count})
                </h2>
            ) : (
                <div className="">
                    <i className="p-2 mb-3 text-green-500 border-2 border-green-500 rounded-full fa-solid fa-check"></i>
                    <h2 className="text-2xl font-bold">Order Confirmed</h2>
                    <p>We hope you enjoy your food!</p>
                </div>
            )}
        </>
    );
}

export default CartDesc;
