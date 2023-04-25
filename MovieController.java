package com.example.demo.controller;


import com.example.demo.domain.Movies;
import com.example.demo.repository.MovieRepository;
import exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.MoviesService;

import javax.persistence.Table;
import java.lang.module.ResolutionException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.AttributedString;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class MovieController {

    @Autowired
    private MoviesService service;

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/addMovie")
    public Movies addMovie(@RequestBody Movies movie){
        System.out.println("***x`"+ findMoviesByTitle(movie.getTitle()));
        return service.saveMovies(movie);
    }

    @PostMapping("/addMovies")
    public List<Movies> addMovies(@RequestBody List<Movies> movies){
        return service.saveMovies(movies);
    }

    @GetMapping("/movies")
    public List<Movies> findAllMovies(){
        return service.getMovies();
    }


    @GetMapping("/movieById/{id}")
    public Movies findMoviesById(@PathVariable int id){
        return service.getMovieById(id);
    }

    @GetMapping("/movie/{title}")
    public Movies findMoviesByTitle(@PathVariable String title){
        return service.getMovieByTitle(title);
    }

    @PutMapping("/updateMovie/{id}")
    public ResponseEntity<Movies> updateMovie(@PathVariable int id, @RequestBody Movies movie) {
        Movies updateMovie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        updateMovie.setTitle(movie.getTitle());
        updateMovie.setYear(movie.getYear());
        updateMovie.setGenre(movie.getGenre());
        updateMovie.setRating_percentage(movie.getRating_percentage());
        updateMovie.setServices(movie.getServices());
        updateMovie.setProducer(movie.getProducer());
        updateMovie.setDirector(movie.getDirector());
        updateMovie.setStudio(movie.getStudio());
        updateMovie.setTrailer(movie.getTrailer());

        movieRepository.save(updateMovie);

        return ResponseEntity.ok(updateMovie);
    }

    @DeleteMapping("/delete/movie/{id}")
    public String deleteMovie(@PathVariable int id){
        return service.deleteMovie(id);
    }


}
