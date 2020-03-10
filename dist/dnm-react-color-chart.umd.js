(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global = global || self, global.DnmColorChart = factory(global.React, global.PropTypes));
}(this, (function (React, PropTypes) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var DnmColorChartItem = /*#__PURE__*/function (_React$PureComponent) {
    _inherits(DnmColorChartItem, _React$PureComponent);

    function DnmColorChartItem() {
      _classCallCheck(this, DnmColorChartItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(DnmColorChartItem).apply(this, arguments));
    }

    _createClass(DnmColorChartItem, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            rgba = _this$props.rgba,
            className = _this$props.className;
        return React.createElement("div", {
          className: className || '',
          style: {
            backgroundColor: "rgba(".concat(rgba[0], ", ").concat(rgba[1], ", ").concat(rgba[2], ", ").concat(rgba[3], ")")
          }
        });
      }
    }]);

    return DnmColorChartItem;
  }(React.PureComponent);

  var DnmColorChart = /*#__PURE__*/function (_React$Component) {
    _inherits(DnmColorChart, _React$Component);

    function DnmColorChart(props) {
      var _this;

      _classCallCheck(this, DnmColorChart);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DnmColorChart).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "hexToRgb", function (hex) {
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
          return "#".concat(r).concat(r).concat(g).concat(g).concat(b).concat(b);
        }).substring(1).match(/.{2}/g).map(function (x) {
          return parseInt(x, 16);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "rgbToHsl", function (r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255; // Find greatest and smallest channel values

        var cmin = Math.min(r, g, b);
        var cmax = Math.max(r, g, b);
        var delta = cmax - cmin;
        var h = 0;
        var s = 0;
        var l = 0; // Calculate hue
        // No difference

        if (delta == 0) {
          h = 0;
        } // Red is max
        else if (cmax == r) {
            h = (g - b) / delta % 6;
          } // Green is max
          else if (cmax == g) {
              h = (b - r) / delta + 2;
            } // Blue is max
            else {
                h = (r - g) / delta + 4;
              }

        h = Math.round(h * 60); // Make negative hues positive behind 360°

        if (h < 0) {
          h += 360;
        } // Calculate lightness


        l = (cmax + cmin) / 2; // Calculate saturation

        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Multiply l and s by 100

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return [h, s, l];
      });

      _defineProperty(_assertThisInitialized(_this), "hslToRgb", function (h, s, l) {
        // Must be fractions of 1
        s /= 100;
        if (s > 1) s = 1;else if (s < 0) s = 0;
        l /= 100;
        if (l > 1) l = 1;else if (l < 0) l = 0;

        while (h < 0) {
          h += 360;
        }

        h %= 360;
        var c = (1 - Math.abs(2 * l - 1)) * s;
        var x = c * (1 - Math.abs(h / 60 % 2 - 1));
        var m = l - c / 2;
        var r = 0;
        var g = 0;
        var b = 0;

        if (h >= 0 && h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (h >= 60 && h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (h >= 120 && h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (h >= 180 && h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (h >= 240 && h < 300) {
          r = x;
          g = 0;
          b = c;
        } else if (h >= 300 && h < 360) {
          r = c;
          g = 0;
          b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return [r, g, b];
      });

      _defineProperty(_assertThisInitialized(_this), "getRgbaValue", function (value) {
        var offset_hsl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (typeof value === 'string') {
          value = _this.hexToRgb(value);
          value.push(1);
        }

        if (offset_hsl) {
          value = _this.offsetHslFromRgba(value, parseFloat(offset_hsl.h) * 3.6, parseFloat(offset_hsl.s), parseFloat(offset_hsl.l));
        }

        return value;
      });

      _defineProperty(_assertThisInitialized(_this), "offsetHslFromRgba", function (rgba, h, s, l) {
        var hsl = _this.rgbToHsl(rgba[0], rgba[1], rgba[2]);

        var rgb = _this.hslToRgb(hsl[0] + h, hsl[1] + s, hsl[2] + l);

        return [rgb[0], rgb[1], rgb[2], rgba[3]];
      });

      return _this;
    } // https://stackoverflow.com/users/3853934/micha%c5%82-per%c5%82akowski


    _createClass(DnmColorChart, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            classes = _this$props2.classes,
            layout = _this$props2.layout,
            colors = _this$props2.colors;
        var rgba_colors = [];
        var new_static_colors = {};

        for (var key in colors) {
          var color_in_layout = layout[key];

          if (color_in_layout) {
            var rgba = this.getRgbaValue(colors[key]);
            if (!color_in_layout["static"]) rgba_colors.push(rgba);else new_static_colors[key] = rgba;
          }
        }

        for (var _key in layout) {
          var _layout$_key = layout[_key],
              offset_hsl = _layout$_key.offset_hsl,
              offset_from = _layout$_key.offset_from;

          if (offset_hsl && offset_from && colors[offset_from]) {
            rgba_colors.push(this.getRgbaValue(colors[offset_from], offset_hsl));
          }
        }

        for (var _key2 in layout) {
          if (layout[_key2]["static"]) {
            if (!new_static_colors[_key2]) rgba_colors.push(this.getRgbaValue(layout[_key2]["static"]));else rgba_colors.push(new_static_colors[_key2]);
          }
        }

        return React.createElement("div", {
          className: classes && classes.root ? classes.root : ''
        }, rgba_colors.map(function (rgba, index) {
          return React.createElement(DnmColorChartItem, {
            key: index,
            className: classes && classes.item ? classes.item : '',
            rgba: rgba
          });
        }));
      }
    }]);

    return DnmColorChart;
  }(React.Component);

  DnmColorChart.propTypes = {
    classes: PropTypes.shape({
      item: PropTypes.string,
      root: PropTypes.string
    }),
    layout: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      offset_from: PropTypes.string,
      offset_hsl: PropTypes.shape({
        h: PropTypes.number,
        s: PropTypes.number,
        l: PropTypes.number
      }),
      "static": PropTypes.string
    })).isRequired,
    colors: PropTypes.objectOf(PropTypes.string).isRequired
  };

  return DnmColorChart;

})));
