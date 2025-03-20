import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import config from './Config';

const Browse = () => {

    const [data, setData] = useState([]);
    const [sentence, setSentence] = useState("");

    const API_URL = config.ctgsUrl;

    const researchFor = async (sentence) => {
        await axios.get(`${API_URL}/books/search?query=${sentence}`)
            .then((response) => {
                setData(response['data']);
            })
            .catch((response) => {
                console.log('RIP');
            }
            )
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${API_URL}/books`);
            setData(response.data);
          } catch (error) {
            console.log('RIP', error);
          }
        };
      
        fetchData();

      }, [API_URL]);

    return (
        <div className="create">
            <div className="input">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={e => setSentence(e.target.value)}
                    />
                    <Button variant="outline-success" onClick={e => researchFor(sentence)}>Search</Button>
                </Form>
            </div>
            <Result data={data} browse={true} read={false} />
        </div>
    );
}

export default Browse;