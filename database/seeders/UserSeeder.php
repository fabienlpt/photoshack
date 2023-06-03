<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $emails = [
            'flapert@normandiewebschool.fr',
            'fablap76710@gmail.com',
        ];

        foreach ($emails as $email) {
            $user = new \App\Models\User();
            $user->firstname = 'Fabien';
            $user->lastname = 'Lapert';
            $user->email = $email;
            $user->password = bcrypt('password');
            $user->save();
        }
    }
}
