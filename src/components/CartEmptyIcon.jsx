function CartEmptyIcon() {
    return (
        <div className="flex justify-center">
            <figure>
                <img
                    className="mx-auto"
                    src="assets/images/illustration-empty-cart.svg"
                    alt="illustration empty cart"
                />
                <figcaption>Your added items will appear here</figcaption>
            </figure>
        </div>
    );
}

export default CartEmptyIcon;
