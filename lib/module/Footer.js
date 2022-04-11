import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { PropsContext } from './Chatty';
import { MediaType } from './types/Chatty.types';
import { selectImage } from './utils/imagePicker';

function _Footer(props) {
  var _props$mentionStyles3, _props$mentionStyles4, _props$replyStyles, _props$replyStyles2, _props$replyStyles3, _props$value, _props$placeholder;

  const propsContext = useContext(PropsContext);
  const [message, setMessage] = useState('');
  const [mentions] = useState(['JohnDoe']);
  const [foundedMentions, setFoundedMentions] = useState([]);
  const [image, setImage] = useState();
  const cuttedText = useMemo(() => {
    if (props.replyingTo) {
      return props.replyingTo.text.slice(0, 100) + '...';
    }

    return null;
  }, [props === null || props === void 0 ? void 0 : props.replyingTo]);
  const onChangeText = useCallback(text => {
    const foundedMentions = []; // Iterate over all text

    text.split(' ').forEach(word => {
      foundedMentions.push( // Check and push if word exists in mentions
      ...mentions.filter(mention => {
        console.log(text, mention.indexOf(word));
        return mention.toLowerCase().indexOf(word.toLowerCase().replace('@', '')) != -1;
      }));
    });
    setFoundedMentions(foundedMentions);
    props.onChangeText(text);
    setMessage(text);
  }, [props, mentions]);
  const onPressSend = useCallback(() => {
    props.onPressSend({
      text: message,
      repliedTo: props.replyingTo,
      media: image
    });
    setMessage('');
    setImage([]);
  }, [message, props, image]);

  const onPressMention = target => {
    setMessage(prev => {
      const messagesArray = prev.split(' ');
      const lastMessageIndex = messagesArray.length - 1;
      const lastMessage = messagesArray[lastMessageIndex];
      prev = prev.replace(lastMessage, '@' + target);
      return prev;
    });
    setFoundedMentions([]);
  };

  const renderMenu = useCallback(() => {
    if (message && foundedMentions.length > 0) {
      const splittedWords = message.split(' ');

      if (splittedWords[splittedWords.length - 1].startsWith('@')) {
        var _props$mentionStyles$, _props$mentionStyles;

        return /*#__PURE__*/React.createElement(Animated.View, {
          entering: FadeInDown,
          exiting: FadeOutDown,
          style: (_props$mentionStyles$ = (_props$mentionStyles = props.mentionStyles) === null || _props$mentionStyles === void 0 ? void 0 : _props$mentionStyles.containerStyle) !== null && _props$mentionStyles$ !== void 0 ? _props$mentionStyles$ : styles.mentionContainer
        }, foundedMentions.map(mention => {
          var _props$mentionStyles$2, _props$mentionStyles2;

          return /*#__PURE__*/React.createElement(TouchableOpacity, {
            onPress: () => onPressMention(mention)
          }, /*#__PURE__*/React.createElement(Text, {
            style: (_props$mentionStyles$2 = (_props$mentionStyles2 = props.mentionStyles) === null || _props$mentionStyles2 === void 0 ? void 0 : _props$mentionStyles2.labelStyle) !== null && _props$mentionStyles$2 !== void 0 ? _props$mentionStyles$2 : styles.mentionLabel
          }, "@", mention));
        }));
      }
    }

    return null;
  }, [foundedMentions, message, (_props$mentionStyles3 = props.mentionStyles) === null || _props$mentionStyles3 === void 0 ? void 0 : _props$mentionStyles3.containerStyle, (_props$mentionStyles4 = props.mentionStyles) === null || _props$mentionStyles4 === void 0 ? void 0 : _props$mentionStyles4.labelStyle]);
  const onKeyPress = useCallback(key => {
    if (key === ' ') {
      setFoundedMentions([]);
    }
  }, []);
  const onPressImage = useCallback(async () => {
    selectImage().then(r => {
      const assets = {
        type: MediaType.Image,
        uri: r !== null && r !== void 0 && r.assets ? r.assets[0].uri : r.uri,
        base64: r !== null && r !== void 0 && r.assets ? r.assets[0].base64 : r.base64
      };

      if (image) {
        setImage([...image, assets]);
      } else {
        setImage([assets]);
      }
    });
  }, [image]);
  return /*#__PURE__*/React.createElement(View, {
    style: image && image.length > 0 && {
      position: 'absolute',
      bottom: -70,
      backgroundColor: '#fff'
    }
  }, props.replyingTo && /*#__PURE__*/React.createElement(Animated.View, {
    entering: FadeInDown,
    exiting: FadeOutDown,
    style: [styles.reply, (_props$replyStyles = props.replyStyles) === null || _props$replyStyles === void 0 ? void 0 : _props$replyStyles.containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.replyBody
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.replyUsername, (_props$replyStyles2 = props.replyStyles) === null || _props$replyStyles2 === void 0 ? void 0 : _props$replyStyles2.usernameStyle]
  }, props.replyingTo.user.username), /*#__PURE__*/React.createElement(Text, {
    style: (_props$replyStyles3 = props.replyStyles) === null || _props$replyStyles3 === void 0 ? void 0 : _props$replyStyles3.labelStyle
  }, cuttedText)), propsContext.footerProps.closeReplyButton ? propsContext.footerProps.closeReplyButton(props) : /*#__PURE__*/React.createElement(Button, {
    title: "cancel",
    onPress: props.onPressCancelReply
  })), renderMenu(), /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.containerStyle]
  }, image && image.length > 0 && /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true,
    pagingEnabled: true
  }, image.map(_image => /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setImage(prev => prev && prev.filter(v => v !== _image)),
    style: styles.media
  }, /*#__PURE__*/React.createElement(ImageBackground, {
    style: [styles.mediaOverlay, {
      marginBottom: 15
    }],
    source: {
      uri: _image.uri
    },
    imageStyle: {
      borderRadius: 15
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.media
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.imageClearButton
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: '#fff',
      textAlign: 'center'
    }
  }, "x")))))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressImage
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.addMore
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 20,
      color: '#ccc'
    }
  }, "+")))), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : message,
    onChangeText: onChangeText,
    style: [propsContext !== null && propsContext !== void 0 && propsContext.enableImageUploads ? styles.shortedTextInput : styles.textInput, props === null || props === void 0 ? void 0 : props.inputStyle],
    placeholder: (_props$placeholder = props === null || props === void 0 ? void 0 : props.placeholder) !== null && _props$placeholder !== void 0 ? _props$placeholder : 'Type a message...',
    onKeyPress: e => onKeyPress(e.nativeEvent.key)
  }), (propsContext === null || propsContext === void 0 ? void 0 : propsContext.enableImageUploads) && /*#__PURE__*/React.createElement(React.Fragment, null, props !== null && props !== void 0 && props.renderImageAction ? props.renderImageAction({
    onPressImage
  }) : /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressImage,
    style: {
      paddingHorizontal: 10
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDCF7"))), props !== null && props !== void 0 && props.sendButton ? props.sendButton({
    onPressSend: onPressSend
  }) : /*#__PURE__*/React.createElement(Button, {
    title: "Send",
    onPress: onPressSend,
    color: "#0084ff"
  }))));
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  textInput: {
    padding: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  shortedTextInput: {
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  button: {
    width: '20%',
    backgroundColor: '#fcba03'
  },
  reply: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderLeftColor: '#c8faaf',
    borderLeftWidth: 6
  },
  replyBody: {
    flex: 1
  },
  replyUsername: {
    fontWeight: 'bold'
  },
  addMore: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc'
  },
  imageClearButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 18,
    height: 18,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  media: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10
  },
  mediaOverlay: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15
  },
  mentionContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    padding: 10,
    backgroundColor: '#E5EEFA'
  },
  mentionLabel: {
    padding: 10,
    color: '#1939B7'
  }
});
export const Footer = /*#__PURE__*/React.memo(_Footer);
//# sourceMappingURL=Footer.js.map