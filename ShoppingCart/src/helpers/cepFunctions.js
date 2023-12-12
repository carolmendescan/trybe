export const getAddress = async (CEP) => {
  if (!CEP) {
    throw new Error('CEP não informado');
  }
  const firstApi = fetch(`https://cep.awesomeapi.com.br/json/${CEP}`);
  const secondApi = fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`);
  const ceps = await Promise.any([firstApi, secondApi]);
  const address = await ceps.json();
  return address;
};

export const searchCep = async () => {
  const showAddress = document.querySelector('.cart__address');
  try {
    const cep = document.querySelector('.cep-input');
    const foundedAddress = await getAddress(cep.value);
    showAddress.innerHTML = `${foundedAddress.street
      || foundedAddress.address} - ${foundedAddress.neighborhood
      || foundedAddress.district} - ${foundedAddress.city} - ${foundedAddress.state}`;
  } catch (error) {
    showAddress.innerHTML = 'CEP não encontrado';
  }
};
