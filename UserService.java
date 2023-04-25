package com.example.demo.service;

import com.example.demo.domain.Login;
import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;
import exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users saveUsers(Users user) { return userRepository.save(user); }

    public List<Users> saveUsers(List<Users> users) { return userRepository.saveAll(users); }

    public List<Users> getUsers() { return userRepository.findAll(); }

    public Users getUserById(int id) { return userRepository.findById(id).orElse(null); }

    public Users getUserByName(String name) { return userRepository.findByName(name); }

    public Users getUserByEmail(String email) { return userRepository.findByEmail(email); }

    public String deleteUser(int id){
        userRepository.deleteById(id);
        return "product removed !! " + id;
    }

    public boolean validateUserLogin(Login login) {
        Optional<Users> user = Optional.ofNullable(userRepository.findByEmail(login.getEmail()));
        System.out.println("login pass " + login.getPassword());
        System.out.println("login email " + login.getEmail());
        System.out.println("login user id " + login.getUser_id());
        System.out.println("database pass " + user.get().getPassword());

        if(!user.isPresent()) {
            return false;
        }

        return login.getPassword().equals(user.get().getPassword());
    }

    public boolean ManagerChecking(String email) {
        Optional<Users> user = Optional.ofNullable(userRepository.findByEmail(email));
        Users user1 = user.get();
        if(user1.isManager()) return true;
        return false;
    }
}
