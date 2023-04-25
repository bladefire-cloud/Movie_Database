package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;
import javax.persistence.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movies {

    @Id
    @GeneratedValue
    private int movie_id;
    private String title;
    private int year;
    private int rating_percentage;
    private String genre;
    private String services;
    private String producer;
    private String director;
    private String studio;
    private String trailer;

}
