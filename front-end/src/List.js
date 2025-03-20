import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';
import config from './Config';

const Browse = () => {

    const [data, setData] = useState([]);

    const API_URL = config.clnsUrl;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('session')).userId;
                const response = await axios.get(`${API_URL}/users/${userId}/books`);
                setData(response.data);
            } catch (error) {
                console.log('RIP', error);
            }
        };

        fetchData();

    }, [API_URL]);

    return (
        <Result data={data} browse={false} read={true} />
    );
}

export default Browse;