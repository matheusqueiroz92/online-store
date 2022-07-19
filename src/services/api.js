export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(url);
  const requestJson = await response.json();

  return requestJson;
}

export async function getProductsFromCategoryAndQuery(id = '', query = '') {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`;

  const response = await fetch(url);
  const jsonId = response.json();

  return jsonId;
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;

  const response = await fetch(url);
  const jsonId = response.json();

  return jsonId;
}

export function getItemsFromLocalStorage() {
  if (localStorage.getItem('cartItems')) {
    return JSON.parse(localStorage.getItem('cartItems'));
  }
  return undefined;
}

export function setItemsToLocalStorage(newItem) {
  const newItemstr = JSON.stringify(newItem);
  localStorage.setItem('cartItems', newItemstr);
}
