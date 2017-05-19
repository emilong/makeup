import React from "react";
import "./Product.css";

export default function ProductColors({ product_colors }) {
  console.log(product_colors);
  return (
    <div className="ProductColors">
      {product_colors &&
        product_colors.map(({ hex_value: backgroundColor, colour_name }) => (
          <div
            key={colour_name}
            className="ProductColor"
            style={{ backgroundColor }}
            title={colour_name}
          />
        ))}
    </div>
  );
}
