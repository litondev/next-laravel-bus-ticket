<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(["namespace" => "User","middleware" => ["api","maintaince"]],function(){
	Route::get("check",function(){
		return response()->json([
			"status" => "Success",
			"message" => "Ok"
		]);
	});

	Route::post("/signup","AuthController@signup")->name('signup');
	Route::post("/signin","AuthController@signin")->name("signin");

	Route::group(["middleware" => "jwt-refresh"],function(){
		Route::post("/refresh","AuthController@refresh")->name("refresh");
	});

	Route::group(["middleware" => "jwt"],function(){
		Route::post("/logout","AuthController@logout")->name("logout");		
		// Route::get("/home","HomeController@index")->name("home");
		Route::get("/me","AuthController@me")->name("me");

		// Route::apiResource("status","StatusController");

		// Route::group(["prefix" => "profil"],function(){
			// Route::post("/upload","ProfilController@upload")->name("profil.upload");
			// Route::post("/update","ProfilController@update")->name("profil.update");
		// });
	});
});