<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => Auth::guard('api')->user(),
        ]);
    }

    public function me()
    {
        return response()->json([
            'user' => Auth::guard('api')->user(),
        ]);
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out.',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'access_token' => Auth::guard('api')->refresh(),
            'token_type' => 'Bearer',
        ]);
    }
}
