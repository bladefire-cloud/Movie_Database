import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import Movie from "./Movie";






const MovieList = () => {
   
    const[movies, setMovies]=useState([])

    useEffect(()=>{
        fetch("http://localhost:9191/movies")
        .then(res=>res.json())
        .then((result)=>{
            setMovies(result);
        }
    )
    },[])

   
    
    

    return(
        <>
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
                {movies.map((movie)=>(
                    <tr key={movie.id}>
                    <Movie movie = {movie}/>
                </tr>
                
                    ))}
            </tbody>
        </Table>
        </Container>
        </>
    )
}

export default MovieList
