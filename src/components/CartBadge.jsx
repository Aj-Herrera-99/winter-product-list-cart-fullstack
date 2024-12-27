function CartBadge() {
    return (
        <div className="flex gap-2 py-3 justify-center mb-5 bg-[#f4edeb] rounded-md">
            <img
                src="assets/images/icon-carbon-neutral.svg"
                alt="icon carbon neutral"
            />
            <span className="text-[#260f08] font-medium">
                This is a <strong>carbon-neutral </strong> delivery
            </span>
        </div>
    );
}

export default CartBadge;
