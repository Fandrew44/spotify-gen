import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {Album} from '../../types';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { Shadow } from 'react-native-shadow-2';

import FastImage from 'react-native-fast-image';

export type AlbumHeaderProps = {
  album: Album;
};

const AlbumHeader = (props: AlbumHeaderProps) => {

  const {album} = props;

  const [toggle, setToggle] = useState(false);

  const toggleSwitch = () => props.setIsPrivatePlaylist(previousState => !previousState);

  const [title, setTitle] = useState("My Playlist");
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => { 
    setIsEditing(previousState => !previousState); 
    if (isEditing) {
      props.setName(title);
    }
  }

  const createThreeButtonAlert = () => { 
    props.updateSaved();
  }

  return (
    <View>
      <View style={styles.container}>
        {/* cover image */}
        <View style={styles.center}>
          <Shadow distance={10} containerViewStyle={{marginVertical: 10}} startColor={'hsla(252,56.5%,24.3%, 0.2)'} radius={3}>
            {props.album.length>4? 
            <View style={styles.image}>
              <View style={{flexDirection: 'row'}}>
                <FastImage source={{uri: props.album[0].imageUrl}} style={styles.miniImage}/>
                <FastImage source={{uri: props.album[1].imageUrl}} style={styles.miniImage}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <FastImage source={{uri: props.album[2].imageUrl}} style={styles.miniImage}/>
                <FastImage source={{uri: props.album[3].imageUrl}} style={styles.miniImage}/>
              </View>
            </View>:<View style={styles.image}>
              <FastImage source={{uri: props.album[0].imageUrl}} style={styles.largeImage}/>
            </View>}
            
          </Shadow>
        </View>

        {/* Header text */}

      <View style={styles.title}>
        <TouchableOpacity style={[styles.title]}>
          <View style={styles.leftContainer}>
          <TextInput
            autoCorrect={false}
            onChangeText={t => setTitle(t)}
            onFocus={toggleEditing}
            onEndEditing={toggleEditing}
            defaultValue={props.name}
            style={[styles.name]}
          />
          </View>

          <View style={styles.rightContainer}>
              {isEditing?
            <MaterialIcons
              name="mode-edit"
              size={25}
              color={'dodgerblue'}
              style={styles.edit}
            />: 
            <MaterialIcons
              name="mode-edit"
              size={25}
              color={'#3700AB'}
              style={styles.edit}
            />}
          </View>
        </TouchableOpacity>

        
      </View>
      <View style={styles.divider}>
        {isEditing? <View style={styles.line} />:<View style={styles.lineOff} />}
      </View>

        {/* public or private toggle*/}
        <View style={styles.headerInfo}>
          <View style={styles.headerText}>
            {/* Name */}
            <View>
              <View>
                
                <View style={styles.creatorContainer}>
                  {/* TODO: need to rename style names*/}
                  {props.album.length==1? 
                    <Text style={styles.middleText}>{props.album.length} song</Text>
                    :<Text style={styles.middleText}>{props.album.length} songs</Text>
                  }
                  <Entypo
                    name="dot-single"
                    size={25}
                    color={'#867CC0'}
                  />
                  <Text style={styles.middleText}>1h 28m</Text>
                </View>
              </View>
            </View>
            {/* creator... number of likes */}
            <View style={styles.rightContainer}></View>
          </View>
          <View style={styles.visibility}>
            <View style={styles.leftContainer}>
              <Text style={styles.promptText}>Make playlist private</Text>
            </View>
            <View style={styles.rightContainer}>
              <Switch
                trackColor={{false: 'white', true: '#7432FF'}}
                thumbColor={props.privatePlaylist ? 'hsl(0, 0%, 95%)' : 'hsl(0, 0%, 95%)'}
                ios_backgroundColor="#C4C4C4"
                onValueChange={toggleSwitch}
                value={props.privatePlaylist}
              />
            </View>
          </View>
        </View>

        {/* play button */}
        <TouchableOpacity onPress={createThreeButtonAlert} style={{flexDirection: 'row', marginTop: 10}}>
          <View style={styles.button}>
            <MaterialCommunityIcons name="spotify" size={30} color={'white'} />
            <Text style={styles.buttonText}>ADD TO SPOTIFY</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.findInPlaylist}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.findContents}>
            <Feather name="search" size={25} color={'#3700AB'} />
            <Text style={[styles.promptText, styles.gapAfterIcon]}>
              Find in playlist
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumHeader;
