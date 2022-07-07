export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const requestJson = await response.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(id, categoria) {
  const urlId = 'https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID';
  const urlQuery = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

  const responseId = await fetch(urlId);
  const responseQuery = await fetch(urlQuery);

  const jsonId = responseId.json();
  const jsonQuery = responseQuery.json();

  if (id) {
    return jsonId;
  }
  if (categoria) {
    return jsonQuery;
  }
}
