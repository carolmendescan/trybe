const { species, employees } = require('../data/zoo_data');

const getEmployee = ({ name, id }) => employees.find(({ firstName, lastName, id: id2 }) =>
  id2 === id || firstName === name || lastName === name);

const getSpecies = (funcionario2) => {
  const trabalhador = getEmployee(funcionario2);
  const especies = trabalhador.responsibleFor;
  return especies;
};
const getLocation = (funcionario3) => {
  const responsible = getSpecies(funcionario3);
  return species.filter((specie) => responsible.includes(specie.id)).map((local) => local.location);
};

const objInfo = (busca) =>
  ({
    id: getEmployee(busca).id,
    fullName: `${getEmployee(busca).firstName} ${getEmployee(busca).lastName}`,
    species: getSpecies(busca).map((specieId) => species
      .find((especie) => especie.id === specieId).name),
    locations: getLocation(busca),
  });

const getEmployeesCoverage = (busca) => {
  if (!busca) {
    return employees.map((employee) => objInfo(employee)); // sem parametro traz um obj no formato {id, fullName, species, location} trazido na funcao objInfo.
  }
  if (!getEmployee(busca)) {
    throw new Error('Informações inválidas');
  }
  return objInfo(busca);
};

// console.log(getEmployeesCoverage());
module.exports = getEmployeesCoverage;
