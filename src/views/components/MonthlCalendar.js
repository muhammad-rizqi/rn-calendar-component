/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {days} from '../../controller/helper/helper';
import libur from '../../services/json/libur-indo.json';
import color from '../styles/color';

const MonthlyCalendar = ({
  activeDate,
  onDateSelected,
  markedDate,
  onEventSelected,
}) => {
  const endDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let year = activeDate.getFullYear();
  let month = activeDate.getMonth();
  let firstDay = new Date(year, month, 1).getDay();

  let maxDays = endDays[month];

  if (month === 1) {
    if ((year % 4 === 0 && year && 100 !== 0) || year % 400 === 0) {
      maxDays += 1;
    }
  }

  const generateMatrix = () => {
    var matrix = [];
    // Create header
    matrix[0] = days;

    // More code here
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  let matrix = generateMatrix();

  const _onPress = (item) => {
    if (onDateSelected && !item.match && item !== -1) {
      onDateSelected({
        dateObject: new Date(activeDate.setDate(item)),
        date: item,
        month: month,
        year: year,
      });
    }
  };

  const isHoliday = (item) => {
    return libur.hasOwnProperty(
      `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${
        item < 10 ? `0${item}` : item
      }`,
    );
  };

  const formatDate = (date) => {
    return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
      date < 10 ? `0${date}` : date
    }`;
  };

  const isMarkedDate = (item) => {
    const date = formatDate(item);
    return markedDate.hasOwnProperty(date) && markedDate[date].length > 0;
  };

  return (
    <View style={{flex: 1}}>
      {matrix.map((row, rowIndex) => {
        let rowItems = row.map((item, colIndex) => {
          return (
            <View
              key={`days_${colIndex}`}
              style={{
                flex: 1,
                backgroundColor: item % 2 === 0 ? '#f3f3f3' : '#fff',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor:
                    item === activeDate.getDate() ? '#aef' : '#00000000',
                }}>
                <Text
                  style={[
                    styles.textItem,
                    {
                      textAlign: 'center',
                      // Highlight Sundays
                      color:
                        colIndex === 0 || isHoliday(item) ? '#a00' : '#000',
                      // Highlight current date
                      fontWeight:
                        item === activeDate.getDate() || isHoliday(item)
                          ? 'bold'
                          : '100',
                    },
                  ]}
                  onPress={() => _onPress(item)}>
                  {item !== -1 ? item : ''}
                </Text>
                {isMarkedDate(item) &&
                  markedDate[formatDate(item)].map((v, index) => (
                    <TouchableOpacity
                      key={`${v}_${index}`}
                      onPress={() => {
                        _onPress(item);
                        onEventSelected(v, index);
                      }}
                      style={{
                        borderRadius: 5,
                        backgroundColor: color[v.color],
                        padding: 2,
                        margin: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                        }}
                        numberOfLines={1}>
                        {v.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          );
        });
        return (
          <View
            key={`week_${rowIndex}`}
            style={[rowIndex !== 0 && {flex: 1}, styles.weekRow]}>
            {rowItems}
          </View>
        );
      })}
    </View>
  );
};

export default MonthlyCalendar;

const styles = StyleSheet.create({
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
