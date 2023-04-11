package com.example.restapi.model.endUser;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndUserController {
  private EndUserRepository endUserRepository;

  public EndUserController(EndUserRepository endUserRepository) {
    this.endUserRepository = endUserRepository;
  }

  // @PostMapping("user-login")
  // public EndUser loginUser(@RequestBody Login login) {

  //   EndUser endUser = endUserRepository.findOneByUsernameAndPassword(login.getUsername(), login.getPassword());

  //   if(endUser == null){
  //     throw new EndUserNotFoundException(String.format("User %s not found.", login.getUsername()));
  //   }

  //   return null;

  // }

}
