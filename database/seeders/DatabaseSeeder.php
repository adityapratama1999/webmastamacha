<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run():void
    {
        User::create([
            'name' => 'Adita Eka Pratama',
            'email' => 'Apratama25064@mastamacha.com',
            'password' => Hash::make('AditSerang99'),
            'role'=> 'karyawan'
        ]);
    }
}
