<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class JwtRefreshMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {        
        try {            
            JWTAuth::parseToken()->authenticate();         
        } catch (\Exception $e) {              
            $messages = ["status" => "Failed"];

            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){            
                $messages['message'] = 'Token is blacklisted';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages['message'] = 'Token is expired';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = 'Token is invalid';        
            }else{            
                $messages['message'] = 'Token not found';
            }

            if($messages["message"] != 'Token is expired'){
                return response()->json($messages);
            }
        }

        return $next($request);
    }
}