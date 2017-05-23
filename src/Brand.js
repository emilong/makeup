import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Product from "./Product";
import "./Brand.css";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import BRANDS from "./brands";
import { fetchBrand } from "./api";

class Brand extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    brand: PropTypes.string,
    products: PropTypes.array,
    hasFetched: PropTypes.bool,
    fetchProducts: PropTypes.func.isRequired
  };

  populateProducts = (props = this.props) => {
    const { history, brand, hasFetched, fetchProducts } = props;

    if (!hasFetched) {
      fetchProducts();
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
    const { history, brand, products } = this.props;

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

const mapStateToProps = (state, props) => {
  const brand = props.match.params.brand;
  const products = state.brandProducts[brand];
  const isBeingFetched = !!state.brandsBeingFetched[brand];
  const hasFetched = !isBeingFetched && Array.isArray(products);

  return { brand, products, hasFetched };
};

const mapDispatchToProps = (dispatch, props) => {
  const brand = props.match.params.brand;

  return {
    fetchProducts() {
      return dispatch(fetchBrand(brand));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
