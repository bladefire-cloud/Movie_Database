package com.example.demo.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movie_crew")
public class MovieCrew {

    @Id
    @GeneratedValue
    private int movie_crew_id;
    private int movie_id;
    private String name;
    private String job;
    private String department;

}
