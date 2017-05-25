import autobind from "autobind-decorator";
import { extendObservable, action } from "mobx";
const brandUrl = brand =>
  `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand.toLowerCase()}`;

export default class BrandStore {
  constructor(preloadedState) {
    const {
      brandProducts = {},
      brandsBeingFetched = {}
    } = preloadedState || {};

    const brandProductsMap = new Map();
    for (const brand of Object.keys(brandProducts)) {
      brandProductsMap.set(brand, brandProducts[brand]);
    }

    extendObservable(this, {
      brandProducts: brandProductsMap,

      // ignore any brandsBeingFetched passed in on initialization.
      // they definitely are _not_ being fetched.
      brandsBeingFetched: new Set()
    });
  }

  @action.bound fetchBrand(brand) {
    this.brandsBeingFetched.add(brand);

    fetch(brandUrl(brand))
      .then(response => response.json())
      .then(products => this.storeBrandProducts(brand, products));
  }

  @action.bound storeBrandProducts(brand, products) {
    this.brandsBeingFetched.delete(brand);
    this.brandProducts.set(brand, products);
  }

  @autobind isBeingFetched(brand) {
    return this.brandsBeingFetched.has(brand);
  }

  @autobind hasFetched(brand) {
    return (
      !this.isBeingFetched(brand) && Array.isArray(this.getProducts(brand))
    );
  }

  @autobind getProducts(brand) {
    return this.brandProducts.get(brand);
  }
}
