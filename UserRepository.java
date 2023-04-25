package com.example.demo.repository;

import com.example.demo.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;




public interface UserRepository extends JpaRepository<Users, Integer> {

    Users findByName(String name);

    Users findByEmail(String email);
}
