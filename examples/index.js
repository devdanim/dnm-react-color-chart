import React from 'react';
import { createRoot } from 'react-dom/client';
import DnmColorChart from '../dist/dnm-react-color-chart.es';

const App = () => {
    const layout = {
        "main-color": {
            "name": "Main Color",
            "offset_from": "background-color",
            "offset_hsl": {
                "h": 0,
                "s": -5,
                "l": -10
            }
        },
        "background-color": {
            "name": "Secondary Color"
        },
        "text-color": {
            "name": "Text Color",
            "static": "#FFFFFF"
        }
    };

    const variants = [
        {
            "main-color": "#49dc5b",
            "background-color": "#3d78ab"
        },
        {
            "main": "#4d49dc",
            "background-color": "#d01a1a"
        },
        {
            "main": "{{ mainColor }}",
            "background-color": "{{ lightColor }}"
        }
    ]


    const handleColorClick = (event, { id, value }) => {
        console.log('handleColorClick', event, { id, value });
    }

    return (
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
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);