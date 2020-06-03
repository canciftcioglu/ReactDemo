import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCTS_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCTS_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  return fetch(
    "https://localhost:44348/api/products/"+ (product.productId ? "update" : "add"),
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    }
  )
    .then(handleResponse)
    .catch(handleError);


}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then(savedProduct => {
        product.productId
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json()
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.log("hata");
  throw error;
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "https://localhost:44348/api/products";
    if (categoryId) {
      url = url + "/getlistbycategory?categoryId=" + categoryId;
    } else {
      url = url + "/getall";
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}
