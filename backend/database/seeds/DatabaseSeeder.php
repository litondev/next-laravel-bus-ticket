<?php

use Illuminate\Database\Seeder;
use App\Models\{
	User,
	Ticket,
	Config
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	Config::create([
    		"name" => "site_name",
    		"value" => "ticketin"
    	]);

        User::create([
        	"username" => "admin",
        	"password" => "12345678",
        	"email" => "admin@admin.com",
        	"phone" => "089"
        ]);

        User::create([
        	"username" => "user",
        	"password" => "12345678",
        	"email" => "user@user.com",
        	"phone" => "088"
        ]);

        for($i=0;$i<100;$i++){
        	Ticket::create([
	        	"name" => "Ticket From A : " . $i . " To B : " . $i,
        		"form_destination" => "A : " . $i,
        		"to_destination" => "B : " . $i,        	
        	]);
        }
    }
}
