<?php
namespace App\Service;

use App\Dao\UserDao;
use Illuminate\Support\Facades\Hash;
class UserService{
  protected UserDao $userDao;
  public function __construct(UserDao $userDao)
  {
    $this->userDao= $userDao;
  }
  public function getUsers(){
    return $this->userDao->getUsers();
  }
  public function storeUsers(array $data){

    $data['password'] = Hash::make(config('app.default_password'));

    return $this->userDao->storeUsers($data);
  }
  public function updateUser(int $id,array $data){
    return $this->userDao->updateUser($id,$data);
  }
  public function removeUser(int $id){
    return $this->userDao->removeUser($id);
  }
}