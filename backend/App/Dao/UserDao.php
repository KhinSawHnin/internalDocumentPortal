<?php
namespace App\Dao;
use App\Models\User;
class UserDao{
  public function getUsers(){
    $users=User::all();
    return $users;
  }
  public function storeUsers(array $data){
    return User::create($data);
  }
  public function updateUser(int $id,array $data){
    $user=User::find($id);
    if (!$user) {
      return null;
    }
    $user->update($data);
    return $user;
  }
  public function removeUser(int $id){
    $user=User::find($id);
    return $user->delete();
  }
}