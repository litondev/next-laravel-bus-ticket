<?php

namespace App\Http\Middleware;

use Closure;

class Maintaince
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
        // abort(response()->json([
        //     "status" => "Failed",
        //     "message" => "Maintaince"
        // ],503));

        return $next($request);
    }
}
