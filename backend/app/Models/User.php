<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $guarded = ['id'];
    
    protected $hidden = [
        'password'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function setPasswordAttribute($value){
        $this->attributes['password'] = \Hash::make($value); 
    }

    public function setPhoneAttribute($value){
        $phone = intval($value);            

        $rest = substr(strval($phone),0,1);
        
        if($rest == 8){
            $phone = "0".$phone;
        }else if($rest == 6){
            $phone = "+".$phone;
        }
        
        $this->attributes["phone"] = $phone;
    }

    public function getPhotoAttribute($value){
        return asset("/assets/images/users/" . $value);
    }

    public function getPhotoOriginalAttribute($value){
        return $this->attributes["photo"];
    }
}
