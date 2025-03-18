import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResultItem from "./ResultItem";

const Results = (props) => {

    const data = props.data;
    const browse = props.browse;
    const read = props.read;

    return (
        <div className="results">
            <Container fluid>
                <Row className="result-row">
                    {data.map((elem) => (
                        <Col className="result-row" key={elem['id']}>
                            <ResultItem item = {elem} browse={browse} read={read}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Results;