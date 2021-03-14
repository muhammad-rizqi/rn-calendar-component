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
  '2021-03-01': [
    {
      title: 'Pelajaran React Native',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
    {
      title: 'Tes aja kali bisa mereun',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
    {
      title: 'Tes Lagi',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'yellow',
    },
    {
      title: 'Tes yang banyak',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
    },
  ],
  '2021-03-11': [
    {
      title: 'Pelajaran React Native',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
    {
      title: 'Tes aja kali bisa mereun',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
    {
      title: 'Tes Lagi',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'yellow',
    },
    {
      title: 'Tes yang banyak',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
    },
  ],
  '2021-03-12': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'black',
    },
  ],
  '2021-03-13': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'purple',
    },
  ],
  '2021-03-14': [
    {
      title: 'Pelajaran React Native',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
    {
      title: 'Tes aja kali bisa mereun',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
    {
      title: 'Tes Lagi',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'yellow',
    },
    {
      title: 'Tes yang banyak',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
    },
  ],
  '2021-03-16': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
  ],
  '2021-03-18': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
  ],
  '2021-03-20': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
    },
  ],
  '2021-03-22': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'black',
    },
  ],
  '2021-03-24': [
    {
      title: 'Pelajaran React Native',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
    {
      title: 'Tes aja kali bisa mereun',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
    {
      title: 'Tes Lagi',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'yellow',
    },
    {
      title: 'Tes yang banyak',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
    },
  ],
  '2021-03-26': [
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'purple',
    },
  ],
  '2021-03-31': [
    {
      title: 'Pelajaran React Native',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'red',
    },
    {
      title: 'Tes aja kali bisa mereun',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'blue',
    },
    {
      title: 'Tes',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'green',
    },
    {
      title: 'Tes Lagi',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'yellow',
    },
    {
      title: 'Tes yang banyak',
      location: 'Kretek',
      description: 'Halo ini event 1',
      color: 'orange',
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
