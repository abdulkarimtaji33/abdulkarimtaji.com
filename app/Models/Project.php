<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'url', 
        'description',
        'image',
        'category',
        'is_featured'
    ];
    
    protected $casts = [
        'is_featured' => 'boolean'
    ];
}
