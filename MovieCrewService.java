package com.example.demo.service;

import com.example.demo.domain.MovieCrew;
import com.example.demo.repository.MovieCrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieCrewService {

    @Autowired
    private MovieCrewRepository repository;

    public MovieCrew saveMovieCrew(MovieCrew movieCrew) {
        return repository.save(movieCrew);
    }

    public List<MovieCrew> saveMovieCrews(List<MovieCrew> movieCrews) {
        return repository.saveAll(movieCrews);
    }

    public List<MovieCrew> getMovieCrews() { return repository.findAll();}

    public MovieCrew getMovieCrewById(int id) { return repository.findById(id).orElse(null);}

    public MovieCrew getMovieCrewByMovieId(int movie_id) { return repository.findById(movie_id).orElse(null);}

    public String deleteMovieCrew(int id) {
        repository.deleteById(id);
        return "product removed !! " + id;
    }
}
