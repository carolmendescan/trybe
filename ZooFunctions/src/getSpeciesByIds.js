const { species } = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => species
  .filter((specie) => ids.includes(specie.id));

console.log(getSpeciesByIds('89be95b3-47e4-4c5b-b687-1fabf2afa274'));

module.exports = getSpeciesByIds;
