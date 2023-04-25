package com.example.demo.repository;

import com.example.demo.domain.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MovieRepository extends JpaRepository<Movies, Integer> {
    Movies findByTitle(String title);
}
