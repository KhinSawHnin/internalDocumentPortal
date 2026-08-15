<?php

namespace App\Models;
use app\Models\User;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
