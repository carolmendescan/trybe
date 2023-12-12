const { prices } = require('../data/zoo_data');

const countEntrants = (entrants) => entrants
  .reduce((acc, curr) => {
    if (curr.age < 18) acc.child += 1;
    if (curr.age >= 18 && curr.age < 50) acc.adult += 1;
    if (curr.age >= 50) acc.senior += 1;
    return acc;
  },
  { adult: 0, child: 0, senior: 0 });

console.log(countEntrants([
  { name: 'Lara Carvalho', age: 5 },
  { name: 'Frederico Moreira', age: 5 },
  { name: 'Pedro Henrique Carvalho', age: 5 },
  { name: 'Maria Costa', age: 18 },
  { name: 'Núbia Souza', age: 18 },
  { name: 'Carlos Nogueira', age: 50 },
]));
const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { adult, child, senior } = countEntrants(entrants);
  return adult * prices.adult + child * prices.child + senior * prices.senior;
};
console.log(calculateEntry([
  { name: 'Lara Carvalho', age: 5 },
  { name: 'Frederico Moreira', age: 5 },
  { name: 'Pedro Henrique Carvalho', age: 5 },
  { name: 'Maria Costa', age: 18 },
  { name: 'Núbia Souza', age: 18 },
  { name: 'Carlos Nogueira', age: 50 },
]));
// prices: {
//   adult: 49.99,
//   senior: 24.99,
//   child: 20.99,
// },
module.exports = { calculateEntry, countEntrants };
