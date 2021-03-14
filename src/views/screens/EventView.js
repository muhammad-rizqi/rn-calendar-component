/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

import Calendar from '../components/Calendar';
import libur from '../../services/json/libur-indo.json';
import {useDispatch, useSelector} from 'react-redux';
import Event from '../../controller/redux/eventAction';
import colors from '../styles/color';
import {days, months} from '../../controller/helper/helper';
import {StatusBar} from 'react-native';
import {styles} from '../styles/styles';
import DailyView from '../components/DailyView';
import MonthlyCalendar from '../components/MonthlCalendar';
import WeeklyCalendar from '../components/WeeklyCalendar';

const EventView = () => {
  const [viewType, setViewType] = useState('monthly');
  const [activeDate, setActiveDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dateEvent = activeDate.toISOString().substr(0, 10);
  const [showCalendar, setShowCalendar] = useState(false);
  const {event} = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeMonth = (n) => {
    setActiveDate((date) => {
      return new Date(date.setMonth(date.getMonth() + n));
    });
  };

  const addTodo = () => {
    dispatch(
      Event.addEvent(dateEvent, {
        title,
        location,
        description,
        color: selectedColor,
      }),
    );
    closeModal();
  };

  const deleteTodo = () => {
    dispatch(Event.deleteEvent(dateEvent, selectedIndex));
    closeModal();
  };

  const updateTodo = () => {
    dispatch(
      Event.updateEvent(dateEvent, selectedIndex, {
        title,
        location,
        description,
        color: selectedColor,
      }),
    );
    closeModal();
  };

  const setUpdate = (item, index) => {
    setSelectedIndex(index);
    setSelectedColor(item.color);
    setTitle(item.title);
    setLocation(item.location);
    setDescription(item.description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedIndex(null);
    setSelectedColor('blue');
    setTitle('');
    setLocation('');
    setDescription('');
  };

  return (
    <View style={styles.flex1}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Modal visible={modalVisible} transparent>
        <StatusBar backgroundColor="#00000088" barStyle="light-content" />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.flex1}>
            <ScrollView contentContainerStyle={styles.containerScrollview}>
              <View style={styles.screenContainer}>
                <Text style={[styles.textBold, styles.margin8]}>
                  {selectedIndex !== null ? 'Edit' : 'Tambah'} Acara
                </Text>
                <View style={styles.marginV8}>
                  <Text>Hari</Text>
                  <Text>{activeDate.toLocaleString('id')}</Text>
                </View>
                <View style={styles.marginV8}>
                  <Text>Judul Acara</Text>
                  <TextInput
                    style={styles.inputBorder}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nama Acara"
                  />
                </View>
                <View style={styles.marginV8}>
                  <Text>Warna</Text>
                  <View style={styles.flexRow}>
                    {Object.keys(colors).map((colour) => (
                      <TouchableOpacity
                        key={colour}
                        onPress={() => setSelectedColor(colour)}
                        style={
                          colour === selectedColor && [
                            {
                              borderColor: colors[colour],
                            },
                            styles.colorPickerBorder,
                          ]
                        }>
                        <View
                          style={[
                            {
                              backgroundColor: colors[colour],
                            },
                            styles.colorPicker,
                          ]}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.marginV8}>
                  <Text>Lokasi</Text>
                  <TextInput
                    style={styles.inputBorder}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Lokasi"
                  />
                </View>
                <View style={styles.marginV8}>
                  <Text>Deskripsi</Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Deskripsi"
                    multiline
                    style={[{maxHeight: 100}, styles.inputBorder]}
                  />
                </View>
                <Button
                  title={selectedIndex !== null ? 'Ubah' : 'Simpan'}
                  onPress={selectedIndex !== null ? updateTodo : addTodo}
                />
                {selectedIndex !== null && (
                  <View style={{marginTop: 16}}>
                    <Button
                      title="Hapus"
                      color={colors.red}
                      onPress={deleteTodo}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.flexRow}>
          <Text style={styles.calendarButton} onPress={() => changeMonth(-1)}>
            {'<'}
          </Text>
          <View style={styles.flex1Center}>
            <Text
              style={[styles.textBold, {fontSize: 18}]}
              onPress={() => setShowCalendar(!showCalendar)}>
              {days[activeDate.getDay()]}, {activeDate.getDate()}{' '}
              {months[activeDate.getMonth()]} {activeDate.getFullYear()}
            </Text>
          </View>
          <Text style={styles.calendarButton} onPress={() => changeMonth(+1)}>
            {'>'}
          </Text>
        </View>
        {showCalendar && (
          <Calendar
            markedDate={event}
            activeDate={activeDate}
            onDateSelected={(date) => {
              setActiveDate(date.dateObject);
            }}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 8,
            alignItems: 'center'
          }}>
          <Text
            style={{fontSize: viewType === 'daily' ? 18 : 14}}
            onPress={() => setViewType('daily')}>
            Harian
          </Text>
          <Text
            style={{fontSize: viewType === 'weekly' ? 18 : 14}}
            onPress={() => setViewType('weekly')}>
            Pekanan
          </Text>
          <Text
            style={{fontSize: viewType === 'monthly' ? 18 : 14}}
            onPress={() => setViewType('monthly')}>
            Bulanan
          </Text>
        </View>

        {viewType === 'daily' ? (
          <DailyView
            activeDate={activeDate}
            nationalDay={libur}
            event={event}
            onEventPress={setUpdate}
          />
        ) : viewType === 'monthly' ? (
          <MonthlyCalendar
            activeDate={activeDate}
            markedDate={event}
            onDateSelected={(date) => {
              setActiveDate(date.dateObject);
            }}
            onEventSelected={setUpdate}
          />
        ) : (
          <WeeklyCalendar
            activeDate={activeDate}
            weeklyEvent={event}
            nationalDay={libur}
            onDateSelected={(date) => {
              setActiveDate(date.dateObject);
            }}
            onEventSelected={setUpdate}
          />
        )}
      </ScrollView>
      <View style={styles.fabContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.fabButton}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventView;
