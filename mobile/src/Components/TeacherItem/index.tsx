import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

const TeacherItem: React.FC = () => {
  const { navigate } = useNavigation();

  function handle() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://avatars1.githubusercontent.com/u/18315899?s=460&u=54d9c6ea66f2b27120bf39dabe1d36ff22a92b9d&v=4',
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Gustavo Moreira</Text>
          <Text style={styles.subject}>Matemática</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Você não sabe com quem está falando seu merdinha.
        {'\n'}
        {'\n'}
        Você provavelmente já ouviu o ditado, primeira impressão é a última
        impressão? Bem, isso é verdade nas mídias sociais, como é na vida real,
        e muitas vezes ainda mais julgador. Muitas vezes, as pessoas criam sua
        persona on-line para refletir o que realmente querem ser, nem sempre o
        que são.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora
          {'   '}
          <Text style={styles.priceValue}>R$ 20.00</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>
          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
