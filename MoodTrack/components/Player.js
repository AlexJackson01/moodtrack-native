import * as React from 'react';
import SoundPlayer from 'react-native-sound-player'



// import Light from '../assets/RobotoSlab_Light.ttf';

export default function Player({ token, uri, preview }) {

    if (!token) return null;

  return (
    <View>
        <Video source={{uri: uri}} />
    </View>             


  );
}
