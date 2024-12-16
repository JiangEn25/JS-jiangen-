import React from 'react';
import Plot from 'react-plotly.js';
import { ListBase, WithListContext } from 'react-admin';
import { Grid } from '@mui/material';

export const MysecondPage = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by year
                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Extract the required data for 3D scatter plot
                const augRainfall = dataArray.map(item => parseFloat(item.AUG));
                const junSepRainfall = dataArray.map(item => parseFloat(item['Jun-Sep']));
                const annualRainfall = dataArray.map(item => parseFloat(item.ANNUAL));

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h2>3D Scatter Plot of Rainfall Data</h2>
                            <Plot
                                data={[
                                    {
                                        x: augRainfall,
                                        y: junSepRainfall,
                                        z: annualRainfall,
                                        mode: 'markers',
                                        type: 'scatter3d',
                                        marker: {
                                            size: 5,
                                            color: annualRainfall,
                                            colorscale: 'Viridis', // Color scale for markers
                                            showscale: true // Adds a color scale legend
                                        }
                                    }
                                ]}
                                layout={{
                                    title: 'August Rainfall vs Jun-Sep Rainfall vs Annual Rainfall',
                                    scene: {
                                        xaxis: { title: 'AUG Rainfall (mm)' },
                                        yaxis: { title: 'Jun-Sep Rainfall (mm)' },
                                        zaxis: { title: 'Annual Rainfall (mm)' },
                                    },
                                    width: 800,
                                    height: 600,
                                    margin: { l: 0, r: 0, b: 0, t: 40 }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            }}
        />
    </ListBase>
);