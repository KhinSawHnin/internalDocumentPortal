<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {

  Route::get('/me', [AuthController::class, 'me']);

  Route::post('/logout', [AuthController::class, 'logout']);

  Route::post('/refresh', [AuthController::class, 'refresh']);

  //documents
  Route::get('/docs', [DocumentController::class, 'getDocuments']);
  Route::post('/docs', [DocumentController::class, 'storeDocuments']);
  Route::get('/docs/{id}/download', [DocumentController::class, 'downloadDocument']);
  Route::delete('/docs/{id}', [DocumentController::class, 'removeDocument']);

  //users
  Route::middleware(['role:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/users', [UserController::class, 'storeUsers']);
    Route::put('/users/{id}',[UserController::class,'updateUser']);
    Route::delete('/users/{id}',[UserController::class,'removeUser']);

  });
});
////users
//Route::middleware(['auth:api', 'role:admin'])->group(function () {
//
//  Route::get('/users', [UserController::class, 'getUsers']);
//  Route::post('/users',[UserController::class, 'storeUsers']);
//});