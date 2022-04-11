"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlPreviewBubble = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UrlPreviewBubble = props => {
  const {
    url,
    title,
    description,
    image
  } = props;
  const onPressLink = (0, _react.useCallback)(async () => {
    const canOpen = await _reactNative.Linking.canOpenURL(url);

    if (canOpen) {
      _reactNative.Linking.openURL(url);
    }
  }, [url]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressLink
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: {
      uri: image
    },
    style: styles.previewImage
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.subContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, description.slice(0, 50), "..."), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.url
  }, url))));
};

exports.UrlPreviewBubble = UrlPreviewBubble;

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    maxHeight: 100,
    overflow: 'hidden'
  },
  subContainer: {
    marginLeft: 10
  },
  previewImage: {
    width: 30,
    height: 30,
    borderRadius: 10
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12,
    color: '#888'
  },
  url: {
    marginTop: 40,
    color: '#3C91E6'
  }
});
//# sourceMappingURL=UrlPreviewBubble.js.map