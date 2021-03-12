/* eslint-disable prettier/prettier */
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

export default {
  addEvent,
  deleteEvent,
  updateEvent,
};
