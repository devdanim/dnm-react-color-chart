## Get started

`npm install dnm-react-color-chart`

## Example

```javascript
import DnmColorChart from '../dist/dnm-react-color-chart.es';
 
const layout = {
    "main-darker": {
        "name": "Main Darker",
        "offset_from": "main",
        "offset_hsl": {
            "h": 0,
            "s": -10,
            "l": -20
        }
    },
    "main": {
        "name": "Main Color"
    },
    "secondary-color": {
        "name": "Secondary Color"
    },
    "background-color": {
        "name": "Background Color",
        "static": "#648fb5"
    }
};

const colors = {
    "main": "#49dc5b",
    "secondary-color": "#3d78ab"
}

const handleColorClick = (event, { id, value }) => {
    console.log(event, { id, value });
}

const root = createRoot(document.getElementById('root'));
root.render(
    <DnmColorChart
        classes={{
            item: "color-chart-item",
            root: "color-chart-root"
        }}
        layout={layout}
        colors={colors}
        onColorClick={handleColorClick}
    />
);

```


## Read more

<https://docs.danim.com/docs/danim-docs/en/latest/dev/json-structure.html>
