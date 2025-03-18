import { Card } from "react-bootstrap";
import React from "react";

const Author = (props) => {

    const author = props.author;
    const isbn = props.isbn;

    return (
        <div className="card-title">
            <div className="author">
                <h6>Author :</h6>
                <Card.Text>{author}</Card.Text>
            </div>
            <div className="isbn">
                <h6>ISBN :</h6>
                <Card.Text>{isbn}</Card.Text>
            </div>
        </div>
    );
}

export default Author;