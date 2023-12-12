const { employees } = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  let infoEmployee = {};
  employees.forEach((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      infoEmployee = employee;
    }
  });
  return infoEmployee;
};
console.log(getEmployeeByName('Burl'));

module.exports = getEmployeeByName;
