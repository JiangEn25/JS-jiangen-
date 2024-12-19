import { Grid,Typography, useTheme  } from "@mui/material"
import React, { useState } from "react"
import { Pie } from 'react-chartjs-2';
import { Line } from "react-chartjs-2"
import { Bar } from 'react-chartjs-2';
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


import 'chart.js/auto';
const rainfallStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // 深灰色
    backgroundColor: '#f9f9f9', // 浅灰色背景
    padding: '10px 20px',
    borderRadius: '8px',
    display: 'inline-block',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();

const RainfallChart = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                const theme = useTheme();
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by year
                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Calculate total rainfall for each month of the year
                const calculateYearlyRainfall = (item: any) => {
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
                            color: theme.palette.text.primary,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Year',
                                color: theme.palette.text.secondary,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Rainfall (mm)',
                                color: theme.palette.text.secondary,
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
const QuarterlyRainfallChart = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                // Convert data object to an array and sort by year
                //const dataArray = Object.values(data).sort((a, b) => a.YEAR - b.YEAR);
                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Calculate average rainfall for each quarter
                const calculateQuarterlyAverages = (item: any) => {
                    const quarters = ['Jan-Feb', 'Mar-May', 'Jun-Sep', 'Oct-Dec'];
                    const totals = quarters.map(() => 0);
                    let count = 0;

                    item.forEach((yearData: any) => {
                        quarters.forEach((quarter, index) => {
                            totals[index] += parseFloat(yearData[quarter]) || 0;
                        });
                        count++;
                    });

                    return totals.map(total => total / count);
                };

                const quarterlyAverages = calculateQuarterlyAverages(dataArray);

                const pieChartData = {
                    labels: ['Jan-Feb', 'Mar-May', 'Jun-Sep', 'Oct-Dec'],
                    datasets: [
                        {
                            label: 'Average Rainfall',
                            data: quarterlyAverages,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                    ],
                };



                return (
                    <Grid item xs={12}>
                        <h2>Quarterly Average Rainfall</h2>
                        <Pie data={pieChartData} />
                    </Grid>
                );
            }}
        />
    </ListBase>
);
const MonthlyAverageRainfallBarChart = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Calculate average rainfall for each month across all years
                const calculateMonthlyAverages = (data: any[]) => {
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    const monthlySums = months.map(() => ({ sum: 0, count: 0 }));

                    data.forEach(item => {
                        months.forEach((month, index) => {
                            const value = parseFloat(item[month]);
                            if (!isNaN(value)) {
                                monthlySums[index].sum += value;
                                monthlySums[index].count++;
                            }
                        });
                    });

                    return monthlySums.map(({ sum, count }) => sum / count);
                };

                const monthlyAverages = calculateMonthlyAverages(dataArray);

                const barChartData = {
                    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    datasets: [
                        {
                            label: 'Average Monthly Rainfall',
                            data: monthlyAverages,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };



                return (
                    <Grid item xs={12}>
                        <h2>Average Monthly Rainfall</h2>
                        <Bar data={barChartData} />
                    </Grid>
                );
            }}
        />
    </ListBase>
);


const OverallAverageRainfall = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];

                // Calculate overall average rainfall across all years
                const calculateOverallAverage = (data: any[]) => {
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    let totalAnnualRainfall = 0;
                    let validYearsCount = 0;

                    data.forEach(item => {
                        let annualRainfall = 0;
                        let validMonthsCount = 0;

                        months.forEach(month => {
                            const value = parseFloat(item[month]);
                            if (!isNaN(value)) {
                                annualRainfall += value;
                                validMonthsCount++;
                            }
                        });

                        // Only consider years with complete or partially complete data
                        if (validMonthsCount > 0) {
                            totalAnnualRainfall += annualRainfall;
                            validYearsCount++;
                        }
                    });

                    return validYearsCount > 0 ? (totalAnnualRainfall / validYearsCount).toFixed(2) : 'N/A'; // Round to 2 decimal places or N/A if no data
                };

                const overallAverage = calculateOverallAverage(dataArray);

                

                return (
                    <Grid item xs={12} style={{ textAlign: 'center', padding: '16px' }}>
                        <h2>Overall Average Annual Rainfall</h2>
                        <p style={rainfallStyle} > {overallAverage} mm</p>
                    </Grid>
                );
            }}
        />
    </ListBase>
);


const CurrentMonthAverage = () => (
    <ListBase resource="rain" disableSyncWithLocation perPage={100}>
        <WithListContext
            render={({ data, isLoading }) => {
                if (isLoading) {
                    return <p>Loading...</p>;
                }

                const dataArray = data ? Object.values(data).sort((a, b) => a.YEAR - b.YEAR) : [];
                const currentDate = new Date();
                const currentMonthIndex = currentDate.getMonth(); // 0-based index for months

                // Calculate average rainfall for each month across all years
                const calculateMonthlyAverages = (data: any[]) => {
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    const monthlySums = months.map(() => ({ sum: 0, count: 0 }));

                    data.forEach(item => {
                        months.forEach((month, index) => {
                            const value = parseFloat(item[month]);
                            if (!isNaN(value)) {
                                monthlySums[index].sum += value;
                                monthlySums[index].count++;
                            }
                        });
                    });

                    return monthlySums.map(({ sum, count }) => count > 0 ? sum / count : null);
                };

                const monthlyAverages = calculateMonthlyAverages(dataArray);

                const currentMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 
                                          'July', 'August', 'September', 'October', 'November', 'December'][currentMonthIndex];

                return (
                    <Grid item xs={12} style={{ textAlign: 'center', padding: '16px'}}>
                        <h2> Average rainfall for {currentMonthName} </h2>
                       <p></p>
                                               <p style={rainfallStyle}>
                             
                            {monthlyAverages[currentMonthIndex] !== null ? `${monthlyAverages[currentMonthIndex].toFixed(2)} mm` : 'N/A'}.
                        </p>
                    </Grid>
                );
            }}
        />
    </ListBase>
);

export default CurrentMonthAverage;

export const MyFirstPage = (props: any) => {
    return (
        <div style={{ padding: 16 }}>
            <Grid container>
                <Grid item xs={8} md={8} >
                    <RainfallChart />
                </Grid>

                <Grid item xs={3} md={3} >
                    <QuarterlyRainfallChart />
                </Grid>
                <Grid item xs={6} md={6} >
                    <MonthlyAverageRainfallBarChart />
                </Grid>
                <Grid item xs={3} md={3} >
                <OverallAverageRainfall />
                </Grid>
                <Grid item xs={3} md={3} >
                <CurrentMonthAverage />
                </Grid>

            </Grid>
        </div>
    )


}
