import React from 'react';
import { render } from 'react-dom';
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

const variants = [
    {
        "main": "#49dc5b",
        "secondary-color": "#3d78ab"
    },
    {
        "main": "#4d49dc",
        "secondary-color": "#d01a1a"
    },
    {
        "main": "#4d49dc",
        "secondary-color": "#3d78ab"
    }
]

render(
    <React.Fragment>
        {
            variants.map((colors, i) => (
                <DnmColorChart
                    key={i}
                    classes={{
                        item: "color-chart-item",
                        root: "color-chart-root"
                    }}
                    layout={layout}
                    colors={colors}
                />
            ))
        }
    </React.Fragment>,
    document.getElementById('root')
);
