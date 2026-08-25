<?php

namespace App\Http\Controllers;

use App\Models\Project;

class PlaygroundController extends Controller
{
    public function index()
    {
        $featuredProjects = Project::where('is_featured', true)->get();
        $otherProjects = Project::where('is_featured', false)->get();

        $projects = $featuredProjects->concat($otherProjects)->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'category' => $project->category,
                'description' => $project->description,
                'url' => $project->url,
            ];
        })->values();

        $gameData = [
            'companies' => config('portfolio.companies', []),
            'skills' => config('portfolio.skills', []),
            'projects' => $projects,
        ];

        return view('portfolio.playground', compact('gameData'));
    }
}
