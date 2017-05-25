import autobind from "autobind-decorator";
import { extendObservable, action, observable } from "mobx";
const brandUrl = brand =>
  `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand.toLowerCase()}`;

export default class BrandStore {
  constructor(preloadedState) {
    const { brandProducts = {} } = preloadedState || {};

    extendObservable(this, {
      brandProducts: observable.map(brandProducts),

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
    return !this.isBeingFetched(brand) && !!this.getProducts(brand);
  }

  @autobind getProducts(brand) {
    return this.brandProducts.get(brand);
  }
}
