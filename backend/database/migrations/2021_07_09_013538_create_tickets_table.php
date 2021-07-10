<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string("name",50);
            $table->string("photo")->default('ticket.png');
            $table->timestamp("start_at")->nullable();
            $table->timestamp("end_at")->nullable();
            $table->text("form_destination");
            $table->text("to_destination");
            $table->bigInteger("price")->default(0);
            $table->bigInteger("sold")->default(0);
            $table->text("description")->nullable();
            $table->boolean("active")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
