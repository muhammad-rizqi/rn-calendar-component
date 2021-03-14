import {week} from '../helper/helper';
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
  const weeklyEvent = {};

  week(date).map((key) =>
    event.hasOwnProperty(key) ? (weeklyEvent[key] = event[key]) : null,
  );

  return weeklyEvent;
};

export default {
  addEvent,
  deleteEvent,
  updateEvent,
  getEventWeekly,
};
