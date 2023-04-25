package com.example.demo.controller;

import com.example.demo.domain.Login;
import com.example.demo.domain.Users;
import com.example.demo.service.SecurityService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    SecurityService securityService;

    @PostMapping("/addUser")
    public Users addUser(@RequestBody Users user){
        return service.saveUsers(user);
    }

    @PostMapping("/addUsers")
    public List<Users> addUsers(@RequestBody List<Users> users) { return service.saveUsers(users); }

    @GetMapping("/users")
    public List<Users> findAllUsers() { return service.getUsers(); }

    @GetMapping("/userById/{id}")
    public Users findUserById(@PathVariable int id) { return service.getUserById(id); }

    @GetMapping("/user/{name}")
    public Users findUserByName(@PathVariable String name) { return service.getUserByName(name); }

    @DeleteMapping("/delete/user/{id}")
    public String deleteMovie(@PathVariable int id) { return service.deleteUser(id); }

    @PostMapping(path = "/login")
    public ResponseEntity<Map<String,Object>> validateUserLogin(@RequestBody Login login) {
        System.out.println("Login Server TEST");
        System.out.println(login.getEmail());
        System.out.println(login.getPassword());


        String token = securityService.createToken(login.getEmail(),(1*1000*10));
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("token", token);
        map.put("user", login.getEmail());

        System.out.println("validation" + service.validateUserLogin(login));

        if (service.validateUserLogin(login)) {
            return ResponseEntity.status(200).body(map);
        }
        return ResponseEntity.status(400).body(null);

    }

    @GetMapping("/user/ManagerChecking/{email}")
    public boolean ManagerChecking(@PathVariable String email){
        boolean flg = service.ManagerChecking(email);
        System.out.println("flag "+flg);
        return flg;
    }


}
