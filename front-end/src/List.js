import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';

const Browse = () => {

    const [data, setData] = useState([]);

    const API_URL = process.env.REACT_APP_ClientService_URL;

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

    }, []);

    return (
        <Result data={data} browse={false} read={true} />
    );
}

export default Browse;