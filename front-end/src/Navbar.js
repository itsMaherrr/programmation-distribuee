import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';


const MyNavbar = () => {

    const [session, setSession] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('session') !== null) {
            const fullName = JSON.parse(localStorage.getItem('session'))['fullName'];
            const id = JSON.parse(localStorage.getItem('session'))['userId'];
            setSession({
                fullName: fullName,
                id: id
            });
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('session');
        setSession(null);
        window.location.href = "/";
    }


    return (

        <div className="mynavbar">
            <Navbar key={'xxl'} bg="dark" variant="dark" expand={'xxl'} className="mb-3" fixed="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to={"/"}>Books Library</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'xxl'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'xxl'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'xxl'}`}
                        placement="end"
                    >
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to={"/list"} key={1}>List</Nav.Link>
                                {session == null && <Nav.Link as={Link} to={"/login"} key={2}>Login</Nav.Link>}
                                {session !== null &&
                                    <NavDropdown title={session.fullName}>
                                        <NavDropdown.Item as={Link} onClick={logout} >Log out</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default MyNavbar;