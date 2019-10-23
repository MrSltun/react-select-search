"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _FlattenOptions = _interopRequireDefault(require("./lib/FlattenOptions"));

var _GroupOptions = _interopRequireDefault(require("./lib/GroupOptions"));

var _createClasses = _interopRequireDefault(require("./lib/createClasses"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectSearch =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SelectSearch, _React$PureComponent);

  function SelectSearch(props) {
    var _this;

    _classCallCheck(this, SelectSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectSearch).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onBlur", function () {
      var multiple = _this.props.multiple;
      var value = _this.state.value;
      var search = '';

      if (value && !multiple) {
        var option = _this.findByValue(null, value);

        if (option) {
          search = option.name;
        }
      }

      _this.setState({
        focus: false,
        highlighted: null,
        search: search
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onFocus", function () {
      _this.setState({
        focus: true,
        options: _this.state.defaultOptions,
        search: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (value) {
      var currentValue = _this.state.value.slice();

      var option;
      var search;

      if (!value) {
        var index = _this.state.highlighted;

        if (!index || _this.state.options.length - 1 < index) {
          index = 0;
        }

        option = _this.state.options[index];
      } else {
        option = _this.findByValue(_this.state.defaultOptions, value);
      }

      if (_this.props.multiple) {
        if (!currentValue) {
          currentValue = [];
        }

        var currentIndex = currentValue.indexOf(option.value);

        if (currentIndex > -1) {
          currentValue.splice(currentIndex, 1);
        } else {
          currentValue.push(option.value);
        }

        search = '';
      } else {
        currentValue = option.value;
        search = option.name;
      }

      var options = _this.state.defaultOptions;
      var highlighted = _this.props.multiple ? _this.state.highlighted : null;

      _this.setState({
        value: currentValue,
        search: search,
        options: options,
        highlighted: highlighted,
        focus: _this.props.multiple
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSearch", function (e) {
      var value = e.target.value;

      if (!value) {
        value = '';
      }

      var options = _this.state.defaultOptions;
      options = _this.getNewOptionsList(options, value);

      _this.setState({
        search: value,
        options: options
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyPress", function (e) {
      if (!_this.state.options || _this.state.options.length < 1) {
        return;
      }
      /** Enter */


      if (e.keyCode === 13) {
        _this.handleEnter();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (e) {
      if (!_this.state.focus) {
        return;
      }
      /** Tab */


      if (e.keyCode === 9) {
        _this.onBlur();

        return;
      }
      /** Arrow Down */


      if (e.keyCode === 40) {
        _this.handleArrowDown();
      }
      /** Arrow Up */


      if (e.keyCode === 38) {
        _this.handleArrowUp();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyUp", function (e) {
      /** Esc */
      if (e.keyCode === 27) {
        _this.handleEsc();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
      if (_this.state.focus) {
        _this.onBlur();
      } else {
        _this.onFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOutside", function () {
      _this.onBlur();
    });

    var _options = props.options,
        _value = props.value,
        _multiple = props.multiple,
        className = props.className;
    var stateValue = !_value && _multiple ? [] : _value;
    var flattenedOptions = (0, _FlattenOptions.default)(_options);
    var _search = '';

    if (stateValue) {
      var option = _this.findByValue(flattenedOptions, stateValue);

      if (option) {
        _search = option.name;
      }
    }

    _this.state = {
      search: _search,
      value: stateValue,
      defaultOptions: flattenedOptions,
      options: flattenedOptions,
      highlighted: null,
      focus: false
    };
    _this.classes = typeof className === 'string' ? (0, _createClasses.default)(className) : className;
    _this.parentRef = _react.default.createRef();
    _this.valueRef = _react.default.createRef();
    return _this;
  }

  _createClass(SelectSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autofocus = _this$props.autofocus,
          search = _this$props.search;

      if (autofocus && search && this.valueRef.current) {
        this.valueRef.current.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
          focus = _this$state.focus,
          highlighted = _this$state.highlighted;
      var prevFocus = prevState.prevFocus,
          prevHighlighted = prevState.prevHighlighted;

      if (prevFocus !== focus) {
        if (focus) {
          this.handleFocus();
        } else {
          this.handleBlur();
        }
      }

      if (highlighted !== null && highlighted !== prevHighlighted) {
        this.scrollToHighlighted();
      }
    }
  }, {
    key: "getNewOptionsList",
    value: function getNewOptionsList(options, value) {
      if (options && options.length > 0 && value && value.length > 0) {
        var fuse = new _fuse.default(options, this.props.fuse);
        return fuse.search(value).map(function (item, index) {
          return Object.assign({}, item, {
            index: index
          });
        });
      }

      return options;
    }
  }, {
    key: "getOptionsForRender",
    value: function getOptionsForRender() {
      var _this2 = this;

      var multiple = this.props.multiple;

      var _this$state2 = this.state,
          options = _this$state2.options,
          state = _objectWithoutProperties(_this$state2, ["options"]);

      return (0, _GroupOptions.default)(options.map(function (option, i) {
        var selected = multiple && state.value.indexOf(option.value) >= 0 || option.value === state.value;
        var highlighted = i === state.highlighted;
        return _objectSpread({}, option, {
          selected: selected,
          highlighted: highlighted,
          onChange: function onChange() {
            return _this2.onChange(option.value);
          },
          optionProps: {
            onClick: function onClick() {
              return _this2.onChange(option.value);
            },
            role: 'menuitem',
            'data-selected': selected ? 'true' : null,
            'data-highlighted': highlighted ? 'true' : null
          },
          key: "".concat(option.value, "-option")
        });
      }));
    }
  }, {
    key: "getValueProps",
    value: function getValueProps(value) {
      var _this$props2 = this.props,
          searchEnabled = _this$props2.search,
          autoComplete = _this$props2.autoComplete;
      var search = this.state.search;
      var val = value ? value.name : '';
      return {
        tabIndex: '0',
        onFocus: this.onFocus,
        onClick: this.onFocus,
        readOnly: !this.props.search,
        value: searchEnabled ? search : val,
        placeholder: this.props.placeholder,
        onChange: searchEnabled ? this.onSearch : null,
        type: searchEnabled ? 'search' : null,
        autoComplete: searchEnabled ? autoComplete : null
      };
    }
  }, {
    key: "findByValue",
    value: function findByValue(source, value) {
      var findSource = source;

      if (!source || source.length < 1) {
        findSource = this.state.defaultOptions;
      }

      if (!findSource) {
        return null;
      }

      return findSource.filter(function (object) {
        return object.value === value;
      })[0];
    }
  }, {
    key: "handleArrowDown",
    value: function handleArrowDown() {
      if (this.state.options.length < 1) {
        return;
      }

      var highlighted = null;

      if (this.state.highlighted != null) {
        highlighted = this.state.highlighted + 1;
      } else {
        highlighted = 0;
      }

      if (highlighted > this.state.options.length - 1) {
        highlighted = 0;
      }

      this.setState({
        highlighted: highlighted
      });
    }
  }, {
    key: "handleArrowUp",
    value: function handleArrowUp() {
      if (this.state.options.length < 1) {
        return;
      }

      var highlighted = this.state.options.length - 1;

      if (this.state.highlighted != null) {
        highlighted = this.state.highlighted - 1;
      }

      if (highlighted < 0) {
        highlighted = this.state.options.length - 1;
      }

      this.setState({
        highlighted: highlighted
      });
    }
  }, {
    key: "handleEnter",
    value: function handleEnter() {
      this.onChange();
    }
  }, {
    key: "handleEsc",
    value: function handleEsc() {
      this.onBlur();
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keypress', this.onKeyPress);
      document.addEventListener('keyup', this.onKeyUp);
      this.scrollToSelected();
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keypress', this.onKeyPress);
      document.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: "scrollToSelected",
    value: function scrollToSelected() {
      if (this.props.multiple || !this.state.value || !this.parentRef.current) {
        return;
      }

      var parent = this.parentRef.current;
      var selected = parent.querySelector('[data-selected="true"]');

      if (selected) {
        selected.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }
    }
  }, {
    key: "scrollToHighlighted",
    value: function scrollToHighlighted() {
      if (this.state.highlighted == null || !this.parentRef.current) {
        return;
      }

      var parent = this.parentRef.current;
      var highlighted = parent.querySelector('[data-highlighted="true"]');

      if (highlighted) {
        highlighted.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          value = _this$state3.value,
          defaultOptions = _this$state3.defaultOptions,
          options = _this$state3.options,
          focus = _this$state3.focus;
      var _this$props3 = this.props,
          search = _this$props3.search,
          multiple = _this$props3.multiple;
      var selectedOption = this.findByValue(defaultOptions, value);
      var mappedOptions = this.getOptionsForRender();
      var valueProps = this.getValueProps(selectedOption);
      var className = this.classes.main;

      if (search) {
        className += " ".concat(this.classes.main, "--search");
      }

      if (multiple) {
        className += " ".concat(this.classes.main, "--multiple");
      }

      return _react.default.createElement(_Context.default.Provider, {
        value: this.classes
      }, _react.default.createElement("div", {
        ref: this.parentRef,
        className: className
      }, (search || !multiple) && _react.default.createElement(_Value.default, _extends({
        ref: this.valueRef
      }, valueProps)), options.length > 0 && (focus || multiple) && _react.default.createElement("div", {
        className: this.classes.select
      }, _react.default.createElement(_Options.default, {
        options: mappedOptions
      }))));
    }
  }]);

  return SelectSearch;
}(_react.default.PureComponent);

_defineProperty(SelectSearch, "defaultProps", {
  search: false,
  value: '',
  multiple: false,
  placeholder: '',
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  className: 'select-search-box',
  autoComplete: 'on',
  autofocus: false
});

var _default = (0, _reactOnclickoutside.default)(SelectSearch);

exports.default = _default;