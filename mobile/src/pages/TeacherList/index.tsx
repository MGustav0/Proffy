import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';

import PageHeader from '../../Components/PageHeader';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          },
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bcc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escolha o dia"
                  placeholderTextColor="#c1bcc"
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escolha a hora"
                  placeholderTextColor="#c1bcc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 245,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
