import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Offcanvas, Table } from 'react-bootstrap';
import MovieCrew from './MovieCrew';

const Movie = ({ movie }) => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        handleEdit();
        
    }

    const [showCrew, setShowCrew] = useState(false);

    const handleCloseCrew = () => setShowCrew(false);
    const handleShowCrew = () => setShowCrew(true);
        


    const [updatedMovie, setUpdatedMovie] = useState({
        title: movie.title,
        year: '',
        rating_percentage: '',
        genre: '',
        services: '',
        producer: '',
        director: '',
        studio: ''
    });

    const onInputChange = (e) => {
        console.log(e);
        setUpdatedMovie({
            ...updatedMovie,[e.target.name]: e.target.value
        });
    }

    const handleDelete=(e)=>{
        e.preventDefault()
          console.log(movie)
          fetch("http://localhost:9191/delete/movie/"+ movie.movie_id, {
            method:'DELETE',
            headers:{"Content-Type":"application/json", 'Accept': 'application/json'},
            credentials: 'same-origin',
            body:JSON.stringify(movie),
          }).then((res)=>{
          console.log("Movie deleted")
          window.location.href="/movietable"
          })

    }

    const handleSubmit=(e)=>{
      e.preventDefault()
        console.log(updatedMovie)
        fetch("http://localhost:9191/updateMovie/"+ movie.movie_id, {
          method:'PUT',
          headers:{"Content-Type":"application/json", 'Accept': 'application/json'},
          credentials: 'same-origin',
          body:JSON.stringify(updatedMovie),
        }).then((res)=>{
        console.log("Movie Updated")
        window.location.href="/movietable"
        })
    }


    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

const [manager, setManager] = useState(false);
 
function handleEdit () {
       
    fetch("http://localhost:9191/user/ManagerChecking/"+userToken.user, {method:"GET"})
    .then(res =>res.json())
    .then(res=>{
        setManager(res);})

} 

const[movieCrews, setMovieCrews]=useState([])

useEffect(()=>{
    fetch("http://localhost:9191/movieCrews")
    .then(res=>res.json())
    .then((result)=>{
        setMovieCrews(result);
    }
)
},[])

    return (
        <>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.rating_percentage}</td>
            <td>{movie.genre}</td>
            <td>{movie.services}</td>
            <td>{movie.producer}</td>                
            <td>{movie.director}</td>
            <td>{movie.studio}</td>
            <td><a href = {movie.trailer}>{movie.title} Trailer</a></td>
            <td><Button variant='warning' onClick={handleShow}>Edit</Button></td>
            <td><Button variant='warning' onClick={handleShowCrew}>Cast/Crew</Button></td>
            

        <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{movie.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form noValidate>
            <Form.Label>Year:</Form.Label>
                <Form.Control required type="text" name="year" placeholder= {movie.year} onChange={ (e) => onInputChange(e)}  />
             <Form.Label>Rating:</Form.Label>
                 <Form.Control required type="text" name="rating_percentage" placeholder= {movie.rating_percentage} onChange={ (e) => onInputChange(e)}/>
            <Form.Label>Genre:</Form.Label>
                <Form.Control required  type="text" name="genre" placeholder = {movie.genre} onChange={ (e) => onInputChange(e)}/>
            <Form.Label>Services:</Form.Label>
                <Form.Control required  type="text" name="services" placeholder = {movie.services} onChange={ (e) => onInputChange(e)}/>
            <Form.Label>Producer:</Form.Label>
                <Form.Control required  type="text" name="producer" placeholder = {movie.producer} onChange={ (e) => onInputChange(e)}/>
            <Form.Label>Director:</Form.Label>
                <Form.Control required  type="text" name="director" placeholder = {movie.director} onChange={ (e) => onInputChange(e)}/>
            <Form.Label>Studio:</Form.Label>
                <Form.Control required  type="text" name="studio" placeholder = {movie.studio} onChange={(e) => onInputChange(e)}/>
                <Form.Label>Trailer:</Form.Label>
                <Form.Control required  type="text" name="studio" placeholder = {movie.trailer} onChange={(e) => onInputChange(e)}/>

            <Button variant='outline-warning' style={{marginTop: '5%'}} onClick={handleSubmit} disabled={!manager}>Save</Button>
            <Button variant='outline-warning' style={{marginTop: '5%', marginLeft: '5%'}}  onClick={handleDelete} disabled={!manager} > Delete</Button>
         </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal 
      show={showCrew} 
      onHide = {handleCloseCrew}
      backdrop="static"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {movie.title} Crew 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <Table striped bordered hover size="sm" responsive="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Department</th>
                </tr>
            </thead>
            <tbody>
                {movieCrews.filter((movieCrew) => {
                    if(movie.movie_id === movieCrew.movie_id){
                        return movieCrew
                    }
                }).map((movieCrew)=>(
                    <tr key={movieCrew.movie_id}>
                    <MovieCrew movieCrew = {movieCrew}/>
                </tr>
                
                    ))}
            </tbody>
        </Table>
        </Container>


      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
      </Modal>

        </>
    );
};

export default Movie;