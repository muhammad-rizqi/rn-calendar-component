/* eslint-disable prettier/prettier */
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
import {months} from '../../controller/helper/helper';
import {StatusBar} from 'react-native';

const EventView = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dateEvent = activeDate.toISOString().substr(0, 10);
  const {event} = useSelector((state) => state);
  const dispatch = useDispatch();

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
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Modal visible={modalVisible} transparent>
        <StatusBar backgroundColor="#00000088" barStyle="light-content" />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: '#00000088',
                flexGrow: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  margin: 16,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 18, marginVertical: 8}}>
                  {selectedIndex !== null ? 'Edit' : 'Tambah'} Acara
                </Text>
                <View style={{marginVertical: 8}}>
                  <Text>Hari</Text>
                  <Text>{activeDate.toLocaleString('id')}</Text>
                </View>
                <View style={{marginVertical: 8}}>
                  <Text>Judul Acara</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                    }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nama Acara"
                  />
                </View>
                <View style={{marginVertical: 8}}>
                  <Text>Warna</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {Object.keys(colors).map((colour) => (
                      <TouchableOpacity
                        key={colour}
                        onPress={() => setSelectedColor(colour)}
                        style={
                          colour === selectedColor && {
                            borderRadius: 18,
                            borderWidth: 2,
                            borderColor: colors[colour],
                            padding: 2,
                          }
                        }>
                        <View
                          style={{
                            backgroundColor: colors[colour],
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{marginVertical: 8}}>
                  <Text>Lokasi</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                    }}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Lokasi"
                  />
                </View>
                <View style={{marginVertical: 8}}>
                  <Text>Deskripsi</Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Deskripsi"
                    multiline
                    style={{
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                      maxHeight: 100,
                    }}
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
      <ScrollView style={{padding: 8, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', padding: 8, alignItems: 'center'}}>
          <Text
            style={{fontSize: 24, marginHorizontal: 16}}
            onPress={() => changeMonth(-1)}>
            {'<'}
          </Text>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {months[activeDate.getMonth()]} {activeDate.getFullYear()}
            </Text>
          </View>
          <Text
            style={{fontSize: 24, marginHorizontal: 16}}
            onPress={() => changeMonth(+1)}>
            {'>'}
          </Text>
        </View>
        <Calendar
          markedDate={event}
          activeDate={activeDate}
          onDateSelected={(date) => {
            setActiveDate(date.dateObject);
          }}
        />
        {libur.hasOwnProperty(getFormatedDate()) && (
          <>
            <Text style={{fontWeight: '700', margin: 8}}>Hari Nasional</Text>
            <View
              style={{
                borderLeftWidth: 3,
                borderLeftColor: colors.red,
                borderRadius: 8,
                padding: 16,
                margin: 8,
                backgroundColor: 'white',
                elevation: 5,
              }}>
              <Text style={{fontWeight: '700'}}>
                {libur[getFormatedDate()].deskripsi}
              </Text>
            </View>
          </>
        )}
        {event.hasOwnProperty(dateEvent) && event[dateEvent].length > 0 ? (
          <View>
            <Text style={{fontWeight: '700', margin: 8}}>List Acara </Text>
            {event[dateEvent].map((ev, index) => (
              <TouchableOpacity
                onPress={() => setUpdate(ev, index)}
                key={index}
                style={{
                  borderLeftWidth: 3,
                  borderLeftColor: colors[ev.color],
                  borderRadius: 8,
                  padding: 16,
                  margin: 8,
                  backgroundColor: 'white',
                  elevation: 5,
                }}>
                <Text style={{fontWeight: '700'}}>{ev.title}</Text>
                <Text numberOfLines={3}>{ev.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 24, right: 24}}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center',
            width: 52,
            borderRadius: 26,
            height: 52,
            backgroundColor: colors.blue,
          }}>
          <Text style={{fontSize: 24, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventView;
