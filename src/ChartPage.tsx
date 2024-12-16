import React from 'react';
import { ListBase, WithListContext } from 'react-admin';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Grid } from '@mui/material';

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export const ChartPage = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by year
                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Calculate total rainfall for each month of the year
                const calculateYearlyRainfall = (item:any) => {
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    return months.reduce((total, month) => total + (parseFloat(item[month]) || 0), 0);
                };

                // Chart data and options
                const lineChartData = {
                    labels: dataArray.map((item) => item.YEAR), // X-axis labels
                    datasets: [
                        {
                            label: 'Total Monthly Rainfall',
                            data: dataArray.map(calculateYearlyRainfall), // Total monthly rainfall data
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                        },
                    ],
                };

                const lineChartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Annual Total Monthly Rainfall',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Year',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Rainfall (mm)',
                            },
                        },
                    },
                };

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h2>Annual Total Monthly Rainfall</h2>
                            <Line data={lineChartData} options={lineChartOptions} />
                        </Grid>
                    </Grid>
                );
            }}
        />
    </ListBase>
);
