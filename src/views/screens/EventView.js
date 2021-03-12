/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import Calendar from '../components/Calendar';
import libur from '../../services/json/libur-indo.json';

const EventView = () => {
  const [activeDate, setActiveDate] = useState(new Date());

  const changeMonth = (n) => {
    setActiveDate((date) => {
      return new Date(date.setMonth(date.getMonth() + n));
    });
  };

  const getFormatedDate = () => {
    const item = activeDate.getDate();
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();

    return `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${
      item < 10 ? `0${item}` : item
    }`;
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 24, margin: 8}} onPress={() => changeMonth(-1)}>
          {'<'}
        </Text>
        <View style={{flex: 1}} />
        <Text style={{fontSize: 24, margin: 8}} onPress={() => changeMonth(+1)}>
          {'>'}
        </Text>
      </View>
      <Calendar
        activeDate={activeDate}
        onDateSelected={(date) => {
          setActiveDate(date.dateObject);
        }}
      />
      <View style={{padding: 16}}>
        {libur.hasOwnProperty(getFormatedDate()) && (
          <>
            <Text>Keterangan libur :</Text>
            <Text>{libur[getFormatedDate()].deskripsi}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default EventView;
