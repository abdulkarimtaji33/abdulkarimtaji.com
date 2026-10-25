<?php

namespace App\Http\Controllers;

use App\Models\Project;

class PortfolioController extends Controller
{
    public function index()
    {
        $order = config('portfolio.featured_order', []);
        $featuredProjects = Project::where('is_featured', true)->get()
            ->sortBy(function ($project) use ($order) {
                $position = array_search($project->name, $order, true);

                return $position === false ? 999 : $position;
            })
            ->values();
        $otherProjects = Project::where('is_featured', false)->get();
        $categories = $otherProjects->pluck('category')->filter()->unique()->values();

        return view('portfolio.index', [
            'featuredProjects' => $featuredProjects,
            'otherProjects' => $otherProjects,
            'categories' => $categories,
            'profile' => config('portfolio.profile'),
            'stats' => config('portfolio.stats'),
            'skillGroups' => config('portfolio.skill_groups'),
            'skills' => collect(config('portfolio.skills'))->groupBy('group'),
            'companies' => config('portfolio.companies'),
            'marquee' => config('portfolio.marquee'),
        ]);
    }

    public function sitemap()
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'
            . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'
            . e(route('portfolio'))
            . '</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
