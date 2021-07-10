<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\FormatResponse;
use App\Http\Requests\{
    SigninRequest,
    SignupRequest
};

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        try{
    	    throw_if(
                !User::create($request->validated()),
                new \Exception("Terjadi Kesalahan")
            );
            
            return FormatResponse::success("Berhasil Daftar");        
        }catch(\Exception $e){
            return FormatResponse::failed($e);         
        }
    }

    public function signin(SigninRequest $request)
    {
        try{            
            throw_if(
                !$token = auth('api')->attempt($request->validated()),
                new \Exception("Password atau email salah",422)
            );
            
            return $this->respondWithToken($token);
        }catch(\Exception $e){
            return FormatResponse::failed($e);   
        }
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return FormatResponse::success("Berhasil Keluar");    
    }

    public function refresh()
    {
        try{            
            return $this->respondWithToken(auth('api')->refresh());
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());
            
            $messages = ["status" => "Failed"];

            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){            
                $messages['message'] = 'Token is blacklisted';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages["message"] = 'Token is expired but is failed when refresh token';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = 'Token is invalid';        
            }else{            
                $messages['message'] = 'Token not found';
            }

            return response()->json($messages,401);            
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            "status" => "Success",
            "message" => "Berhasil Masuk",
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }
}