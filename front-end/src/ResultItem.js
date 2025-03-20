import Infos from "./Infos";
import Author from "./Author";
import IconButton from '@mui/material/IconButton';
import { BookmarkAdded, BookmarkAdd } from "@mui/icons-material";
import { Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResultItem = (props) => {

    const [style, setStyle] = useState({ display: 'none' });


    const elem = props.item;
    const browse = props.browse;
    const read = props.read;

    const API_URL = process.env.REACT_APP_ClientService_URL;

    const addToReadList = async (event) => {
        event.preventDefault();

        const bookId = elem.id;
        const userId = JSON.parse(localStorage.getItem('session')).userId;
        try {
            await axios.post(`${API_URL}/users/${userId}/books/${bookId}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('Bingo')
                    }
                })
        } catch (error) {
            alert('You have already added this book to your list');
        }
    }

    const updateToDoneList = async (event) => {
        event.preventDefault();

        const bookId = elem.id;
        const userId = JSON.parse(localStorage.getItem('session')).userId;
        
        console.log("elem" + elem);
        try {
            await axios.put(`${API_URL}/users/${userId}/books/${bookId}/mark-read`)
                .then((response) => {
                    if (response.status === 200 && response.data.success === true) {
                        console.log('Bingo')
                    }
                })
        } catch (error) {
            alert('You have already marked this book as read');
        }
    }

    return (
        <div className="search-result">
            <Link className="card-link">
                <Card style={{ width: '22rem' }} className="element" alignment='end' id={elem['id']} onMouseEnter={e => setStyle({ display: 'flex' })} onMouseLeave={e => setStyle({ display: 'none' })}>
                    <div className="card-layout">
                        <Card.Img variant="top" src={elem['imageUrl']} />
                        <div className="card-buttons" style={style}>
                            {
                                browse && !read &&
                                <div className="media-button">
                                    <IconButton aria-label="library-add-check" size="large" color="success" onClick={addToReadList}>
                                        <BookmarkAdd />
                                    </IconButton>
                                </div>
                            }
                            {!browse && read &&
                                <div className="media-button">
                                    <IconButton aria-label="delete" size="large" color="success" onClick={updateToDoneList}>
                                        <BookmarkAdded />
                                    </IconButton>
                                </div>
                            }
                        </div>
                    </div>
                    <Card.Body style={{ textAlign: 'left' }}>
                        <Card.Title as={Infos} title={elem['title']} year={elem['publishDate']} />
                        <h6>Category :</h6>
                        <p>{elem['category']}</p>
                        <Card.Text as={Author} author={elem['author']} isbn={elem['isbn']} />
                        {/*<Button variant="primary">Go somewhere</Button>*/}
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}

export default ResultItem;