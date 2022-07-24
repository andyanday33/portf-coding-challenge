import { ResponsiveBar } from '@nivo/bar';
import React, { useState, useMemo, useRef, useEffect } from 'react';

/**
 * Helper function to get the previous props.
 * 
 * @param {React.ComponentProps} value component props to store
 * @returns Previous props
 */
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

/**
 * ResponsiveBar component for rendering a bar chart.
 * 
 * @param {React.ComponentProps} props A prop object
 * containing the data to be displayed in the chart.
 * @returns {JSX.Element} A React component that displays a bar chart.
 */
const ResponsiveBeerBar = (props) => {
    // There was an awful visual bug I couldn't fix,
    // so I am just going to cheat here by forcing a 
    // conditional re-render.
    const { data } = props;
    const prevProps = usePrevious(props);
    const [key, setKey] = useState(0);
    useMemo(() => {
        if (prevProps && data > prevProps.data) {
            // Force a re-render
            setKey((prev) => prev + 1);
        }
    }, [data, prevProps]);    
    return (
        <ResponsiveBar key={key}
            data={data}
            keys={[
                'abv',
            ]}
            animate={false}
            indexBy='date'
            margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'category10' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderWidth={2}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        3
                    ]
                ]
            }}
            enableGridX={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 60,
                legend: 'Date',
                legendPosition: 'middle',
                legendOffset: 60
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ABV',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'brighter',
                        3
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Beer bar chart"
        />
    )
}

export default ResponsiveBeerBar;