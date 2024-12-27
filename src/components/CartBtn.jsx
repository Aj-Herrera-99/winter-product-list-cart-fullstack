import { useContext } from "react";
import { GlobalContext } from "../state-management/stores/GlobalContext";

function CartBtn({ name, children }) {
    const { resetQuantities, setIsModal } = useContext(GlobalContext);

    const handleClick = () => {
        setIsModal((curr) => !curr);
        if (name && name === "modal") {
            resetQuantities();
        }
    };
    return (
        <button
            onClick={handleClick}
            className="w-full py-3 text-white bg-[#c73a0f] rounded-3xl hover:bg-[#b3330c]"
        >
            {children}
        </button>
    );
}

export default CartBtn;
