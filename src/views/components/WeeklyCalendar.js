/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {days, week} from '../../controller/helper/helper';
import color from '../styles/color';

const WeeklyCalendar = ({
  activeDate,
  weeklyEvent,
  onDateSelected,
  onEventSelected,
  nationalDay,
}) => {
  const now = new Date(activeDate);
  const onPress = (item) => {
    if (onDateSelected && !item.match && item !== -1) {
      const dateObject = new Date(activeDate.setDate(item));
      const date = item;
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      onDateSelected({
        dateObject,
        date,
        month,
        year,
      });
    }
  };

  const isHoliday = (item) => {
    const dateObject = new Date(activeDate.setDate(item));
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    return nationalDay.hasOwnProperty(
      `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${
        item < 10 ? `0${item}` : item
      }`,
    );
  };

  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      {week(now).map((w, i) => (
        <View key={w} style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => onPress(new Date(w).getDate())}
            key={`${w + i}`}
            style={{
              flex: 1,
              backgroundColor: i % 2 === 0 ? '#f3f3f3' : '#fff',
            }}>
            <View
              style={{
                backgroundColor: now.getDay() === i ? '#aef' : '#00000000',
              }}>
              <Text style={{textAlign: 'center'}}>{days[i]}</Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: isHoliday(new Date(w).getDate()) ? color.red : 'black',
                }}>
                {new Date(w).getDate()}
              </Text>
            </View>
            {w in weeklyEvent &&
              weeklyEvent[w].map((ev, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onPress(new Date(w).getDate());
                    onEventSelected(ev, index);
                  }}
                  style={{
                    backgroundColor: color[ev.color],
                    padding: 4,
                    borderRadius: 4,
                    margin: 2,
                  }}>
                  <Text style={{color: 'white', fontSize: 12}}>{ev.title}</Text>
                </TouchableOpacity>
              ))}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default WeeklyCalendar;
