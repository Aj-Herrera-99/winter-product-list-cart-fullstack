import React from "react";
import { useLocation } from "react-router";
import Header from "../../components/Header";

// todo: da spostare in una cartella db
const flavorColors = [
    { flavor: "almond", color: "#f5deb3" },
    { flavor: "custard", color: "#fff8dc" },
    { flavor: "chocolate", color: "#d2691e" },
    { flavor: "cream cheese", color: "#fffdd0" },
    { flavor: "butter", color: "#ffff99" },
    { flavor: "meringue", color: "#ffffff" },
    { flavor: "buttermilk", color: "#faebd7" },
    { flavor: "raspberry", color: "#e30b5d" },
    { flavor: "cocoa", color: "#4b3621" },
    { flavor: "vanilla", color: "#f3e5ab" },
    { flavor: "salt", color: "#d3d3d3" },
    { flavor: "coffee", color: "#6f4e37" },
    { flavor: "honey", color: "#ffc30b" },
    { flavor: "blueberry", color: "#4f86f7" },
    { flavor: "lemon", color: "#fff44f" },
    { flavor: "red velvet", color: "#c40233" },
    { flavor: "sugar", color: "#ffffff" },
    { flavor: "berry", color: "#8a2be2" },
    { flavor: "mascarpone", color: "#fff8e7" },
    { flavor: "pistachio", color: "#93c572" },
    { flavor: "cream", color: "#fffdd0" },
    { flavor: "cinnamon", color: "#d2691e" },
    { flavor: "toffee", color: "#d2b48c" },
    { flavor: "fudge", color: "#3e2723" },
    { flavor: "caramel", color: "#ffa07a" },
    { flavor: "strawberry", color: "#ff6347" },
];

function CardDetail() {
    const location = useLocation();
    const product = location.state;
    // todo: migrare su styled-components per maggiore leggibilità
    // todo: (non necessario) sistemare layout usando grid
    // todo: strutturare in componenti
    return (
        <div className="max-w-full">
            <Header title={product.name} />
            <div className="sm:my-12 lg:flex lg:my-8 lg:gap-8">
                <div>
                    <section className="flex mt-4 h-[30vh] sm:h-[37vh] lg:h-[50vh] rounded-sm overflow-hidden gap-1 md:gap-2">
                        <div className="flex flex-col w-1/4 gap-1 p-1 overflow-y-auto rounded-md md:gap-2 shrink-0">
                            <picture>
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
                                    className={`object-cover w-full rounded-md 
                                    `}
                                />
                            </picture>
                            <picture>
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
                                    className={`object-cover w-full rounded-md 
                                    `}
                                />
                            </picture>
                            <picture>
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
                                    className={`object-cover w-full rounded-md 
                                    `}
                                />
                            </picture>
                            <picture>
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
                                    className={`object-cover w-full rounded-md 
                                    `}
                                />
                            </picture>
                        </div>
                        <div className="grow">
                            <picture>
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
                                    className={`object-cover w-full h-full rounded-md 
                                        border-2 border-[#b3330c]
                                    `}
                                />
                            </picture>
                        </div>
                        <div className="flex flex-col justify-between w-1/5 ml-1 text-xl h-2/3 shrink-0 sm:text-3xl">
                            <div className="flex items-center justify-center font-bold border-b border-b-stone-400 grow">
                                ${product.price.toFixed(2)}
                            </div>
                            <div className="flex items-center justify-center border-b grow border-b-stone-300">
                                <i className="fa-regular fa-heart"></i>
                            </div>
                            <div className="flex items-center justify-center border-b grow border-b-stone-200">
                                <img
                                    src="assets/images/icon-add-to-cart.svg"
                                    alt="icon add to cart"
                                    className="sm:w-10"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="lg:w-2/5">
                    <section className="w-full my-3 sm:my-4">
                        <ul className="flex gap-2 overflow-x-auto text-xs lg:flex-wrap">
                            {product.flavors.map((flavor, index) => (
                                <li
                                    key={index}
                                    style={{
                                        backgroundColor: findColor(flavor),
                                    }}
                                    className={`flex items-center pl-1 overflow-hidden uppercase  rounded-sm min-w-24 h-9 tracking-widest font-semibold`}
                                >
                                    {flavor}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="flex gap-2 sm:my-4">
                        <p className="w-4/5 p-2 text-lg font-medium bg-white rounded-md">
                            {product.description}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

function findColor(myFlavor) {
    const flavor = flavorColors.find((flav) => flav.flavor == myFlavor);
    return flavor ? flavor.color : "#d3d3d3";
}

export default CardDetail;
