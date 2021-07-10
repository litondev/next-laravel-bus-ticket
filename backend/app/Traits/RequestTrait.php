<?php
namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

trait RequestTrait{
	/**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /** 
     * Custom Error
     *
     * @return json     
    */
    public function failedValidation(Validator $validator){
        throw new HttpResponseException(
            response()->json([
                "status" => "Failed",
                "error" => $validator->errors()->first()
            ],422)
        );
    }
}