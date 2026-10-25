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

    // Remote images (e.g. stock photos) are used as-is; local paths go through asset().
    public function getImageUrlAttribute()
    {
        $image = (string) $this->image;

        return preg_match('#^https?://#i', $image) ? $image : asset($image);
    }
}
