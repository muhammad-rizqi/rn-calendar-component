import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getFormatedDate} from '../../controller/helper/helper';
import color from '../styles/color';
import {styles} from '../styles/styles';

const DailyView = ({nationalDay, event, activeDate, onEventPress}) => {
  const dateEvent = activeDate.toISOString().substr(0, 10);
  return (
    <>
      {nationalDay.hasOwnProperty(getFormatedDate(activeDate)) && (
        <>
          <Text style={[styles.textBold, styles.margin8]}>Hari Nasional</Text>
          <View style={[styles.listItem, {borderLeftColor: color.red}]}>
            <Text style={styles.textBold}>
              {nationalDay[getFormatedDate(activeDate)].deskripsi}
            </Text>
          </View>
        </>
      )}
      {event.hasOwnProperty(dateEvent) && event[dateEvent].length > 0 ? (
        <View>
          <Text style={[styles.textBold, styles.margin8]}>List Acara</Text>
          {event[dateEvent].map((ev, index) => (
            <TouchableOpacity
              onPress={() => onEventPress(ev, index)}
              key={index}
              style={[{borderLeftColor: color[ev.color]}, styles.listItem]}>
              <Text style={styles.textBold}>{ev.title}</Text>
              <Text numberOfLines={3}>{ev.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </>
  );
};

export default DailyView;
