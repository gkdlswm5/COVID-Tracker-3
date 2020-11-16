import React, { useState, useEffect } from 'react';
import { fetchDailyData, fetchDaily } from '../../utils/api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css';

const Chart = ( { data , country }) => {
    const [dailyData, setDailyData] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchDailyData()            
            setDailyData(fetchedData)
        }

        fetchAPI()

        }, [])

        // console.log(dailyData)
        


    const lineChart = (
        dailyData[0] ? (
            <Line
                data={{
                    labels: dailyData.map( ({ date }) => date ),
                    datasets: [{
                        data: dailyData.map(( { positive } ) => positive),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(( { deaths } ) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rbga(255, 0, 0, 0.5)',
                        fill: true,
                    }]
                }}
            />
        ) : null
    )
    
    const barChar = (
        data.confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: '# of People',
                        backgroundColor: [ 
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display : false },
                    title: { display : true, text: `Current state in ${country}`}
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChar : lineChart}
        </div>
    )
}

export default Chart