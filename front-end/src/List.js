import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Browse = () => {

    const [data, setData] = useState([]);
    const [sentence, setSentence] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('session')).userId;
                const response = await axios.get(`http://localhost:8081/users/${userId}/books`);
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