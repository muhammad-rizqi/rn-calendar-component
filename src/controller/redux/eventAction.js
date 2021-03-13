import store from './store';

const addEvent = (date, event) => {
  return {
    type: 'ADD_EVENT',
    payload: {
      date,
      event,
    },
  };
};

const deleteEvent = (date, index) => {
  return {
    type: 'DELETE_EVENT',
    payload: {
      date,
      index,
    },
  };
};

const updateEvent = (date, index, event) => {
  return {
    type: 'EDIT_EVENT',
    payload: {
      date,
      index,
      event,
    },
  };
};

const getEventWeekly = (date) => {
  const {event} = store.getState();
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth();
  const dayOfWeek = parsedDate.getDay();
  const startDateofWeek = parsedDate.getDate() - dayOfWeek;
  const endDateofWeek = startDateofWeek + 6;

  const formatedDate = (i) => {
    return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
      i < 10 ? `0${i}` : i
    }`;
  };

  let filtered = {};
  for (let i = startDateofWeek; i <= endDateofWeek; i++) {
    if (event.hasOwnProperty(formatedDate(i))) {
      filtered[formatedDate(i)] = event[formatedDate(i)];
    }
  }

  return filtered;
};

export default {
  addEvent,
  deleteEvent,
  updateEvent,
  getEventWeekly,
};
