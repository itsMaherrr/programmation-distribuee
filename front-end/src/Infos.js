import { Card } from "react-bootstrap";
import React from "react";

const Infos = (props) => {

    const title = props.title;
    const year = props.year;

    return ( 
        <div className="card-title">
            <Card.Title style={{ fontSize: '1.10rem' }}>{title}</Card.Title>
            <h6>{year}</h6>
        </div>
     );
}
 
export default Infos;