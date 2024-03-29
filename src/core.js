import React, { memo } from 'react';
import PropTypes from 'prop-types';


const DnmColorChartItem = memo(function DnmColorChartItem({ rgba, privateColor, className, onClick }) {

  const value = typeof rgba === 'string' ? rgba : null;

  return (
    <div className={className || ''} style={{ backgroundColor: value ? 'unset' : `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`, position: 'relative', opacity: privateColor ? '0.3' : 1 }} onClick={onClick}>
      {privateColor && '/'}
      {value}
    </div>
  )
});

class DnmColorChart extends React.Component {
  constructor(props) {
    super(props);
  }

  // https://stackoverflow.com/users/3853934/micha%c5%82-per%c5%82akowski
  hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

  // https://css-tricks.com/converting-color-spaces-in-javascript/
  rgbToHsl = (r, g, b) => {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) { h = 0; }
    // Red is max
    else if (cmax == r) { h = ((g - b) / delta) % 6; }
    // Green is max
    else if (cmax == g) { h = (b - r) / delta + 2; }
    // Blue is max
    else { h = (r - g) / delta + 4; }

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) { h += 360; }

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
  }

  hslToRgb = (h, s, l) => {
    // Must be fractions of 1
    s /= 100;
    if (s > 1) s = 1;
    else if (s < 0) s = 0;
    l /= 100;
    if (l > 1) l = 1;
    else if (l < 0) l = 0;
    while (h < 0) h += 360;
    h %= 360;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }

  getRgbaValue = (value, offset_hsl = null) => {
    if (typeof value === 'string') {
      value = this.hexToRgb(value);
      value.push(1);
    }
    if (offset_hsl) {
      value = this.offsetHslFromRgba(value, parseFloat(offset_hsl.h) * 3.6, parseFloat(offset_hsl.s), parseFloat(offset_hsl.l));
    }
    return value;
  }

  offsetHslFromRgba = (rgba, h, s, l) => {
    const hsl = this.rgbToHsl(rgba[0], rgba[1], rgba[2]);
    const rgb = this.hslToRgb(hsl[0] + h, hsl[1] + s, hsl[2] + l);
    return [rgb[0], rgb[1], rgb[2], rgba[3]];
  }

  handleColorClick = (event, rgba) => {
    const { onColorClick } = this.props;
    if (onColorClick) onColorClick(event, rgba);
  }

  render() {
    const {
      classes, layout, colors, children
    } = this.props;
    const rgba_colors = [];
    const new_static_colors = {};
    for (const key in colors) {
      const color = colors[key];
      const color_in_layout = layout[key];
      if (color && color_in_layout) {
        // if color match the pattern {{ color_name }}, should return the color value of color_name
        if (color.match(/{{\s*[\w\.]+\s*}}/))
          switch (color) {

            case '{{ mainColor }}':
              rgba_colors.push({ id: key, value: 'P' });
              break;
            case '{{ secondaryColor }}':
              rgba_colors.push({ id: key, value: 'S' });
              break;
            case '{{ extraColor }}':
              rgba_colors.push({ id: key, value: 'A' });
              break;
            case '{{ readableExtraColor }}':
              rgba_colors.push({ id: key, value: 'T' });
              break;
            case '{{ lightColor }}':
              rgba_colors.push({ id: key, value: 'B' });
              break;
            case '{{ darkColor }}':
              rgba_colors.push({ id: key, value: 'N' });
              break;
            case '{{ mainGradientColor }}':
              rgba_colors.push({ id: key, value: 'gP' });
              break;
            case '{{ secondaryGradientColor }}':
              rgba_colors.push({ id: key, value: 'gS' });
              break;
          }
        else {
          const rgba = this.getRgbaValue(color);
          if (!color_in_layout.static) rgba_colors.push({ id: key, value: rgba });
          else new_static_colors[key] = rgba;
        }
      } else if (color_in_layout === null) {
        const rgba = this.getRgbaValue(color);
        rgba_colors.push({ id: key, value: rgba, private: true });
      }
    }
    for (const key in layout) {
      const layout_item = layout[key];
      if (!layout_item) continue;
      const { offset_hsl, offset_from } = layout[key];
      if (offset_hsl && offset_from && colors[offset_from]) {
        if (colors[offset_from].match(/{{\s*[\w\.]+\s*}}/))
          switch (colors[offset_from]) {
            case '{{ mainColor }}':
              rgba_colors.push({ id: key, value: '_P' });
              break;
            case '{{ secondaryColor }}':
              rgba_colors.push({ id: key, value: '_S' });
              break;
            case '{{ extraColor }}':
              rgba_colors.push({ id: key, value: '_A' });
              break;
            case '{{ readableExtraColor }}':
              rgba_colors.push({ id: key, value: '_T' });
              break;
            case '{{ lightColor }}':
              rgba_colors.push({ id: key, value: '_B' });
              break;
            case '{{ darkColor }}':
              rgba_colors.push({ id: key, value: '_N' });
              break;
            case '{{ mainGradientColor }}':
              rgba_colors.push({ id: key, value: '_gP' });
              break;
            case '{{ secondaryGradientColor }}':
              rgba_colors.push({ id: key, value: '_gS' });
              break;
          }
        else
          rgba_colors.push({ id: key, value: this.getRgbaValue(colors[offset_from], offset_hsl) });
      }
    }
    for (const key in layout) {
      const layout_item = layout[key];
      if (!layout_item) continue;
      if (layout[key].static) {
        if (!new_static_colors[key]) rgba_colors.push({ id: key, value: this.getRgbaValue(layout[key].static) });
        else rgba_colors.push({ id: key, value: new_static_colors[key] });
      }
    }
    return (
      <div className={classes && classes.root ? classes.root : ''}>
        {
          rgba_colors.map((rgba, index) => (
            <DnmColorChartItem key={index} className={classes && classes.item ? classes.item : ''} rgba={rgba.value} privateColor={rgba?.private ?? false} onClick={event => this.handleColorClick(event, rgba)} />
          ))
        }
        {children}
      </div >
    );
  }
}

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
    static: PropTypes.string
  })).isRequired,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
  onColorClick: PropTypes.func
};

export default DnmColorChart;
