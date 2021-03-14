/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {days} from '../../controller/helper/helper';
import libur from '../../services/json/libur-indo.json';

const Calendar = ({activeDate, onDateSelected, markedDate}) => {
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

  const isMarkedDate = (item) => {
    const date = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
      item < 10 ? `0${item}` : item
    }`;
    return markedDate.hasOwnProperty(date) && markedDate[date].length > 0;
  };

  return (
    <View>
      {matrix.map((row, rowIndex) => {
        let rowItems = row.map((item, colIndex) => {
          return (
            <TouchableOpacity
              key={`days_${colIndex}`}
              onPress={() => _onPress(item)}
              style={{
                height: 32,
                width: 32,
                backgroundColor:
                  item === activeDate.getDate() ? '#ddd' : '#ffffff00',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textItem,
                  {
                    // Highlight Sundays
                    color: colIndex === 0 || isHoliday(item) ? '#a00' : '#000',
                    // Highlight current date
                    fontWeight:
                      item === activeDate.getDate() || isHoliday(item)
                        ? 'bold'
                        : '100',
                  },
                ]}>
                {item !== -1 ? item : ''}
              </Text>
              {isMarkedDate(item) && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        });
        return (
          <View key={`week_${rowIndex}`} style={styles.weekRow}>
            {rowItems}
          </View>
        );
      })}
    </View>
  );
};

export default Calendar;

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
    alignItems: 'center',
  },
});
