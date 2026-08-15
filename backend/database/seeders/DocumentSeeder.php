<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = User::where('role', 'member')->get();
        $admin= User::where('role','admin')->first();
        $documents = [
            [
                'title' => 'Company Policy',
                'file_name' => 'company-policy.txt',
                'content' => 'This document contains the company policy and rules.',
                'user_id' => $members[1]->id,
            ],
            [
                'title' => 'Employee Handbook',
                'file_name' => 'employee-handbook.txt',
                'content' => 'This document contains the employee handbook and employee guidelines.',
                'user_id' => $members[0]->id,
            ],
            [
                'title' => 'Safety Guidelines',
                'file_name' => 'safety-guidelines.txt',
                'content' => 'This document contains workplace safety guidelines.',
                'user_id' => $members[1]->id,
            ],
            [
                'title' => 'IT Security Policy',
                'file_name' => 'it-security-policy.txt',
                'content' => 'This document contains the IT security policy and security rules.',
                'user_id' => $admin->id,
            ],
            [
                'title' => 'Internal Procedures',
                'file_name' => 'internal-procedures.txt',
                'content' => 'This document contains internal company procedures.',
                'user_id' => $members[0]->id,
            ],
        ];

        foreach ($documents as $document) {
            $path = 'documents/' . $document['file_name'];

            Storage::disk('local')->put(
                $path,
                $document['content']
            );

            Document::create([
                'title' => $document['title'],
                'file_name' => $document['file_name'],
                'file_path' => $path,
                'file_size' => Storage::disk('local')->size($path),
                'mime_type' => 'text/plain',
                'user_id' => $document['user_id'],
            ]);
        }

        $this->command->info('5 sample documents created successfully.');
    }
}
