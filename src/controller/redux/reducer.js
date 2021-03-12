/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const event = {
  '2021-03-11': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 2',
      color: 'red',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 3',
      color: 'green',
    },
  ],
};

const eventReducer = (state = event, {type, payload}) => {
  switch (type) {
    case 'ADD_EVENT':
      if (state.hasOwnProperty(payload.date)) {
        state[payload.date][state[payload.date].length] = payload.event;
        return state;
      } else {
        state[payload.date] = [payload.event];
        return state;
      }
    case 'EDIT_EVENT':
      state[payload.date][payload.index] = payload.event;
      return state;
    case 'DELETE_EVENT':
      state[payload.date] = state[payload.date].filter(
        (i, index) => index !== payload.index,
      );
      return state;
    default:
      return state;
  }
};

export default combineReducers({tokenReducer, event: eventReducer});
