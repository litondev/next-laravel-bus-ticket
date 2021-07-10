<?php

namespace App\Helpers;

class FormatResponse{
	public static function success($message,$code = 200){
		$response = [
			"status" => "Success",
			"message" => $message
		];				

		return response()->json($response,$code);
	}

	public static function failed($error,$code = 500){
		$response = [
			"status" => "Failed"
		];

		if($error->getCode() != 422){
			\Log::channel("coex")->info($error->getMessage());
			
			$response["message"] = "Terjadi Kesalahan";
		}else{
			$response["message"] = $error->getMessage();
		}

		return response()->json($response,$code);
	}	
}