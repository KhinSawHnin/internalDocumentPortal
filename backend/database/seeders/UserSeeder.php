<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@workspace.com',
            'password' => Hash::make(config('app.default_password')),
            'role' => Roles::ADMIN->value,
        ]);
        User::create([
            'name'=>'member1',
            'email'=>'member1@workspace.com',
            'password'=> Hash::make(config('app.default_password')),
            'role'=>Roles::MEMBER->value,
        ]);
        User::create([
            'name' => 'member2',
            'email' => 'member2@workspace.com',
            'password' => Hash::make(config('app.default_password')),
            'role' => Roles::MEMBER->value,
        ]);
    }
}
