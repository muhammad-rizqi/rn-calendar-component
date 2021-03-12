import React from 'react';
import {Provider} from 'react-redux';
import store from './src/controller/redux/store';
import EventView from './src/views/screens/EventView';

const App = () => {
  return (
    <Provider store={store}>
      <EventView />
    </Provider>
  );
};

export default App;
