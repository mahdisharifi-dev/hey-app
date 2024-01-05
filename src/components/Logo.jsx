import React from "react";

export default function Logo(props) {
    return (
        <h3
            className={`text-2xl font-extrabold ${props.white ? "text-white" : "text-teal-500"} ${
                props.loading ? "animate-bounce" : ""
            }`}
        >
            Hey 👋
        </h3>
    );
}
