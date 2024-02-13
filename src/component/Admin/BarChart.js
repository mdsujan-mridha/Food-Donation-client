import React from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({chartData }) => {
    return (
        <div className='chart-container'>
            <h2 style={{ textAlign: 'center' }}> Bar Chart </h2>

            <Bar
                data={chartData}

                options={{
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Years',
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Users',
                            },
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Users Gained between 2016-2020',
                        },
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;