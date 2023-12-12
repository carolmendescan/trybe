export async function getCategories() {
  try {
    const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const dataCategories = await categories.json();
    return dataCategories;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categorieQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const dataCategorieQuery = await categorieQuery.json();
  return dataCategorieQuery;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

export async function buscaPorTermo(QUERY) {
  const termoBuscado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const dataTermoBuscado = await termoBuscado.json();
  return dataTermoBuscado.results;
}

export async function buscaPorCategoria(CATEGORY_ID) {
  const categoriaBuscada = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`);
  const dataCategoriaBuscada = await categoriaBuscada.json();
  return dataCategoriaBuscada.results;
}
