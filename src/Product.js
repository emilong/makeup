import _ from "lodash";
import React from "react";
import { Card, CardMedia, CardTitle, CardText } from "material-ui/Card";
import ProductColors from "./ProductColors";
import "./Product.css";

export default function Product({
  brand,
  name,
  price,
  image_link,
  product_link,
  website_link,
  description,
  rating,
  product_type,
  product_colors
}) {
  const capBrand = _.capitalize(brand);
  return (
    <Card className="ProductCard">
      <CardMedia mediaStyle={{ backgroundColor: "#333333" }}>
        <img src={image_link} alt={name} />
      </CardMedia>
      <CardTitle
        actAsExpander
        showExpandableButton
        title={name}
        subtitle={capBrand}
        titleStyle={{ fontSize: "12pt", lineHeight: "1.2em" }}
      />

      <CardText expandable>{description}</CardText>
      <CardText expandable>
        <ProductColors {...{ product_colors }} />
      </CardText>
    </Card>
  );
}
