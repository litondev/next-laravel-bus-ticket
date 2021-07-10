<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IsValidPhone implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {        
        $phone = intval($value);
                    
        if($phone === 0){
            return false;
        }

        $rest = substr(strval($phone),0,1);
        
        if($rest == 8){
            return true;
        }else if($rest == 6){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'No telp tidak valid';
    }
}
