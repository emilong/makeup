const START_BRAND_FETCH = "makeup/api/START_BRAND_FETCH";
const STORE_BRAND_PRODUCTS = "makeup/api/STORE_BRAND_PRODUCTS";

const EMPTY_STATE = { brandsBeingFetched: [], brandProducts: {} };

// Reducer
export default function reducer(state = EMPTY_STATE, action = {}) {
  const { type, brand, products } = action;
  const { brandsBeingFetched = [], brandProducts = {} } = state;

  switch (type) {
    case START_BRAND_FETCH:
      return Object.assign({}, state, {
        brandsBeingFetched: brandsBeingFetched.concat([brand])
      });

    case STORE_BRAND_PRODUCTS:
      return Object.assign({}, state, {
        brandsBeingFetched: brandsBeingFetched.filter(b => b !== brand),
        brandProducts: Object.assign({}, brandProducts, { [brand]: products })
      });

    default:
      return state;
  }
}

export function startBrandFetch(brand) {
  return { type: START_BRAND_FETCH, brand };
}

export function storeBrandProducts(brand, products) {
  return { type: STORE_BRAND_PRODUCTS, brand, products };
}

const brandUrl = brand =>
  `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand.toLowerCase()}`;

export function fetchBrand(brand) {
  return dispatch => {
    dispatch(startBrandFetch(brand));

    fetch(brandUrl(brand))
      .then(response => response.json())
      .then(products => dispatch(storeBrandProducts(brand, products)));
  };
}
