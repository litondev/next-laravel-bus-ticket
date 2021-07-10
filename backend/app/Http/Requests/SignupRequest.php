<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\RequestTrait;
use App\Rules\IsValidPhone;

class SignupRequest extends FormRequest
{
    use RequestTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "username" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8",
            "phone" => [new IsValidPhone(),"required","unique:users"]
        ];
    }
}
