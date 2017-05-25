import _ from "lodash";
import React, { Component } from "react";
import { observer } from "mobx-react";

import PropTypes from "prop-types";
import Product from "./Product";
import "./Brand.css";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import BRANDS from "./brands";

@observer class Brand extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    brand: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired
  };

  populateProducts = (props = this.props) => {
    const { history, brand, store } = props;

    if (!store.hasFetched(brand)) {
      store.fetchBrand(brand);
    } else if (brand === "") {
      const newBrand = _.sample(BRANDS);
      history.replace(`/${newBrand}`);
    }
  };

  componentWillMount() {
    this.populateProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.populateProducts(nextProps);
  }

  render() {
    const { history, brand, store } = this.props;
    const products = store.getProducts(brand);

    return (
      <div className="BrandProducts">
        <DropDownMenu
          value={brand}
          onChange={(e, i, brand) => history.push(`/${brand}`)}
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

export default Brand;
