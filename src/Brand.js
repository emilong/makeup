import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import "./Brand.css";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import BRANDS from "./brands";

const brandUrl = brand =>
  `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand.toLowerCase()}`;

export default class Brand extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {};
  }

  fetchBrand = (brand = this.props.match.params.brand) => {
    const { history } = this.props;

    fetch(brandUrl(brand)).then(response => response.json()).then(products => {
      if (_.isEmpty(products)) {
        const newBrand = _.sample(BRANDS);
        history.replace(`/${newBrand}`);
        this.fetchBrand(newBrand);
      } else {
        this.setState({ products });
      }
    });
  };

  componentWillMount() {
    this.fetchBrand();
  }

  render() {
    const { history } = this.props;
    const { brand } = this.props.match.params;
    const { products } = this.state;

    return (
      <div className="BrandProducts">
        <DropDownMenu
          value={brand}
          onChange={(e, i, brand) => {
            history.push(`/${brand}`);
            this.fetchBrand(brand);
          }}
        >
          {BRANDS.map(brand => (
            <MenuItem
              key={brand}
              value={brand}
              primaryText={_.capitalize(brand)}
            />
          ))}
        </DropDownMenu>

        <hr />
        {products &&
          products.map(product => <Product key={product.id} {...product} />)}
      </div>
    );
  }
}
