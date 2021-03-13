import {StyleSheet} from 'react-native';
import colors from './color';

export const styles = StyleSheet.create({
  screen: {padding: 8, backgroundColor: 'white'},
  flex1: {flex: 1},
  flex1Center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colorPicker: {width: 30, height: 30, borderRadius: 15},
  colorPickerBorder: {
    borderRadius: 18,
    borderWidth: 2,
    padding: 2,
  },
  fabButton: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    borderRadius: 26,
    height: 52,
    backgroundColor: colors.blue,
  },
  fabContainer: {position: 'absolute', bottom: 24, right: 24},
  fabText: {fontSize: 24, color: 'white'},
  textBold: {fontWeight: '700'},
  margin8: {margin: 8},
  listItem: {
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: 'white',
    elevation: 5,
  },
  calendarButton: {fontSize: 24, marginHorizontal: 16},
  containerScrollview: {
    backgroundColor: '#00000088',
    flexGrow: 1,
    justifyContent: 'center',
  },
  screenContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 10,
  },
  marginV8: {marginVertical: 8},
  inputBorder: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
  },
});
