<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Setting;

class PortfolioController extends Controller
{
    public function index()
    {
        $featuredProjects = Project::where('is_featured', true)->get();
        $otherProjects = Project::where('is_featured', false)->get();
        
        // Get theme settings
        $themeColor = Setting::get('theme_color', 'purple');
        $themes = json_decode(Setting::get('themes', '{}'), true);
        $currentTheme = $themes[$themeColor] ?? $themes['purple'];
        
        return view('portfolio.index', compact('featuredProjects', 'otherProjects', 'currentTheme', 'themeColor'));
    }
}
