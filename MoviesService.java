package com.example.demo.service;

import com.example.demo.domain.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.MovieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MoviesService {

    @Autowired
    private MovieRepository repository;

    public Movies saveMovies(Movies movie){
        return repository.save(movie);
    }

    public List<Movies> saveMovies(List<Movies> movies){
        return repository.saveAll(movies);
    }

    public List<Movies> getMovies(){
        return repository.findAll();
    }

    public Movies getMovieById(int id){
        return repository.findById(id).orElse(null);
    }

    public Movies getMovieByTitle(String title){
        return repository.findByTitle(title);
    }

    public String deleteMovie(int id){
        repository.deleteById(id);
        return "product removed !! " + id;
    }

    /*
    public String updateMovie(Movies movie){
        boolean movieFound = false;
        for(Movies currentMovie: getMovies()) {
            if(currentMovie.getMovie_id() == movie.getMovie_id()) {
                movieFound=true;
                currentMovie.setMovie_id((movie.getMovie_id()));
                currentMovie.setTitle(movie.getTitle());
                currentMovie.setYear(movie.getYear());
                currentMovie.setGenre(movie.getGenre());
                currentMovie.setProducer(movie.getProducer());
                currentMovie.setDirector(movie.getDirector());
                currentMovie.setStudio(movie.getStudio());
            }
        }
        if(!movieFound){
            getMovies().add(movie);
            return "Movie Added Successfully";
        }
        return "Movie Updated Succesfully";
    }

     */

    /*
    public Movies updateMovies(Movies movie){
        Movies existingMovie = repository.findById(movie.getMovie_id()).orElse(movie);
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setYear(movie.getYear());
        existingMovie.setRating_percentage(movie.getRating_percentage());
        existingMovie.setGenre(movie.getGenre());
        existingMovie.setServices(movie.getServices());
        existingMovie.setProducer(movie.getProducer());
        existingMovie.setDirector(movie.getDirector());
        existingMovie.setStudio(movie.getStudio());
        return repository.save(existingMovie);
    }

     */
}
