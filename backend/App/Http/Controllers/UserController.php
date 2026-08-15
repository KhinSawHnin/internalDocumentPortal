<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Service\DocumentService;
use App\Service\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserService $user_service;
    public function __construct(UserService $user_service)
    {
        $this->user_service= $user_service;
    }
    public function getUsers(){
       $users= $this->user_service->getUsers();
        return response()->json(
            [
                'code'=>200,
                'data'=>$users
            ]);
    }
    public function storeUsers(UserRequest $request){
        $users=$this->user_service->storeUsers($request->validated());
        return response()->json([
            'code'=>201,
            'message'=>'user created successfully',
        ],201);
    }
    public function updateUser(UserRequest $request,int $id){
        $user=$this->user_service->updateUser($id,$request->validated());
        if (!$user) {
            return response()->json([
                'code' => 404,
                'message' => 'User not found',
            ], 404);
        }
        return response()->json([
            'code' => 200,
            'message' => 'User updated successfully',

        ]);
    
    }
    public function removeUser(int $id){
        $user=$this->user_service->removeUser($id);
        if (!$user) {
            return response()->json([
                'code' => 404,
                'message' => 'User not found',
            ], 404);
        }
        return response()->json([
            'code' => 200,
            'message' => 'User removed successfully',
        ], 200);
    
    }

}
