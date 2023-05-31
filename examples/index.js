import React from 'react';
import { createRoot } from 'react-dom/client';
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
    "extra-color": {
        "name": "Extra Color",
    }
};

const variants = [
    {
        "main": "#49dc5b",
        "secondary-color": "#3d78ab",
        "extra-color": "#d01a1a"
    },
    {
        "main": "#4d49dc",
        "secondary-color": "#d01a1a",
        "extra-color": "#3d78ab"
    },
    {
        "main": "{{ mainColor }}",
        "secondary-color": "{{ secondaryColor }}",
        "extra-color": "{{ extraColor }}"
    }
]

const handleColorClick = (event, { id, value }) => {
    console.log(event, { id, value });
}

const root = createRoot(document.getElementById('root'));
root.render(
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
                    onColorClick={handleColorClick}
                >
                    <span>Theme {i + 1}</span>
                </DnmColorChart>
            ))
        }
    </React.Fragment>  
);
