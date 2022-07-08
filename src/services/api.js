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
