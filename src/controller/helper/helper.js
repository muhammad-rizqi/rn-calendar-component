/* eslint-disable prettier/prettier */
export const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const week = (activeDate) => {
  let matrix = [];
  const date = new Date(activeDate);
  const selectedDay = date.getDay();
  const startDay = date.getDate() - selectedDay;

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date.setDate(startDay + i));
    const formatedDate = newDate.toISOString().substr(0, 10);
    matrix.push(formatedDate);
  }

  return matrix;
};

export const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const getFormatedDate = (activeDate) => {
  const item = activeDate.getDate();
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();

  return `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${
    item < 10 ? `0${item}` : item
  }`;
};
