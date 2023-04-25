import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, Table } from 'react-bootstrap';
import Movie from '../components/Movie';

const SearchPage = () => {



    const[movies, setMovies]=useState([])

    useEffect(()=>{
        fetch("http://localhost:9191/movies")
        .then(res=>res.json())
        .then((result)=>{
            setMovies(result);
        }
    )
    },[])

    const [searchTerm, setSearchTerm] = useState('')

    const handleBack=(e)=>{
        window.location.href="/movietable"
  
      }

    return (
        <>
        <Navbar variant= "dark" style={{backgroundColor: 'darkOrange', marginBottom: '5%'}} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Movie Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-light" onClick={handleBack}>Back</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div className="search">
            <input type="text" placeholder="Search... movie title, producer, director" onChange={e => {setSearchTerm(e.target.value)}} style={{marginBottom: '2%'}}/>
        <Container>
        <Table striped bordered hover size="sm" responsive="sm">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Rating</th>
                    <th>Genre</th>
                    <th>Services</th>
                    <th>Producer</th>
                    <th>Director</th>
                    <th>Studio</th>
                    <th>Trailer</th>
                </tr>
            </thead>
            <tbody>

            {movies.filter((val) => { 
                if(searchTerm == "") {
                    return val
                } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                } else if(val.producer.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                } else if(val.director.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((movie)=>(
                    <tr key={movie.id}>
                    <Movie movie = {movie}/>
                </tr>
                    ))}
            </tbody>
        </Table>
        </Container>
        </div>
        </>
    );
};

export default SearchPage;


/*

 {movies.filter((val) => { 
                if(searchTerm == "") {
                    return val
                } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            }).map((val, key)=>  {
                return (
                    <div className='movie' key={key}> 
                        <p> {val.title} </p>
                        
                    </div>
                );
            })}



            */