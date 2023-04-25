package com.example.demo.controller;


import com.example.demo.domain.MovieCrew;
import com.example.demo.service.MovieCrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class MovieCrewController {

    @Autowired
    private MovieCrewService service;

    @PostMapping("addMovieCrew")
    public MovieCrew addMovieCrew(@RequestBody MovieCrew movieCrew){
        return service.saveMovieCrew(movieCrew);
    }

    @GetMapping("/movieCrews")
    public List<MovieCrew> findAllMovieCrews() { return service.getMovieCrews();}

    @GetMapping("/movieCrew/{movie_id}")
    public MovieCrew findMovieCrewByMovieId(@PathVariable int movie_id){
        return service.getMovieCrewByMovieId(movie_id);}

    @GetMapping("/movieCrew/{movie_crew_id}")
    public MovieCrew findMovieCrewById(@PathVariable int id){
        return service.getMovieCrewById(id);
    }

}
