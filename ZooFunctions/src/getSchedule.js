const { species, hours } = require('../data/zoo_data');

const weekSchedule = {
  Monday: { officeHour: '', exhibition: [] },
  Tuesday: { officeHour: '', exhibition: [] },
  Wednesday: { officeHour: '', exhibition: [] },
  Thursday: { officeHour: '', exhibition: [] },
  Friday: { officeHour: '', exhibition: [] },
  Saturday: { officeHour: '', exhibition: [] },
  Sunday: { officeHour: '', exhibition: [] },
};

const stringOfficeHour = (day) => {
  const { open, close } = hours[day];
  if (open === 0) return 'CLOSED';
  const officeHour = `Open from ${open}am until ${close}pm`;
  return officeHour;
};

const arrayExhibition = (day) => {
  if (day === 'Monday') return 'The zoo will be closed!';
  const exhibition = species
    .filter((specie) => specie.availability.includes(day))
    .map((specie) => specie.name);
  return exhibition;
};

const getSchedule = (parametro) => {
  const disponibilidade = species.find((specie) => specie.name === parametro);
  const { availability } = disponibilidade || !parametro;
  Object.keys(weekSchedule).forEach((day) => {
    weekSchedule[day].officeHour = stringOfficeHour(day);
    weekSchedule[day].exhibition = arrayExhibition(day);
  });
  if (Object.keys(weekSchedule)
    .includes(parametro)) return { [parametro]: weekSchedule[parametro] };
  if (species.some((specie) => specie.name === parametro)) return availability;
  return weekSchedule;
};

console.log(getSchedule());
module.exports = getSchedule;
