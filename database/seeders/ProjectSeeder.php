<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear existing projects
        Project::truncate();
        
        $projects = [
            [
                'name' => 'BBrain',
                'url' => '#',
                'description' => 'An AI-powered chatbot app (marketed as a "second brain") that helps with Q&A, writing assistance, learning, and creative content. Complete mobile app with backend infrastructure.',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
                'category' => 'AI/Mobile',
                'is_featured' => true
            ],
            [
                'name' => 'Aile Properties',
                'url' => 'https://aileproperties.com',
                'description' => 'A Dubai real estate agency website focused on buying/selling/renting properties including luxury and investment options with related services.',
                'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
                'category' => 'Real Estate',
                'is_featured' => true
            ],
            [
                'name' => 'Design Iconic',
                'url' => 'https://designiconic.com',
                'description' => 'An online logo maker that lets users design and download custom logos through an intuitive web-based tool.',
                'image' => 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80',
                'category' => 'Design/Tools',
                'is_featured' => false
            ],
            [
                'name' => 'Go4 World Business',
                'url' => 'https://go4worldbusiness.com',
                'description' => 'A global B2B marketplace connecting buyers and suppliers across many product categories with import/export leads and supplier discovery.',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                'category' => 'B2B/Marketplace',
                'is_featured' => false
            ],
            [
                'name' => 'Easy Campus',
                'url' => 'https://easycampus.io',
                'description' => 'A comprehensive learning management and school platform for institutional management and e-learning from schools to higher education.',
                'image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
                'category' => 'Education/LMS',
                'is_featured' => false
            ],
            [
                'name' => 'Trade Mate Sports',
                'url' => 'https://tradematesports.com',
                'description' => 'A sports trading and betting analytics platform offering advanced tools, strategies, and analysis for identifying value opportunities.',
                'image' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
                'category' => 'Sports/Analytics',
                'is_featured' => false
            ],
            [
                'name' => 'Quick Delivery SLU',
                'url' => 'https://quickdeliveryslu.com',
                'description' => 'A local delivery and courier service in Saint Lucia offering food, groceries, and courier-style delivery services.',
                'image' => 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=800&q=80',
                'category' => 'Delivery/Logistics',
                'is_featured' => false
            ],
            [
                'name' => 'Solo.to',
                'url' => 'https://solo.to',
                'description' => 'A "link-in-bio" landing page tool for creating personal microsites and digital business cards with one link for everything.',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                'category' => 'Social/Tools',
                'is_featured' => false
            ],
            [
                'name' => 'Stella\'s Kitchen Co',
                'url' => 'https://stellaskitchenco.com',
                'description' => 'A meal delivery service website offering fresh and healthy meal plans positioned as gluten-free and whole-food focused.',
                'image' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
                'category' => 'Food/Health',
                'is_featured' => false
            ],
            [
                'name' => 'BlaBlaCar UK',
                'url' => 'https://blablacar.co.uk',
                'description' => 'A ride-sharing (carpool) and coach/bus booking platform for affordable travel, with extensive routes in the UK and Europe.',
                'image' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
                'category' => 'Transportation',
                'is_featured' => false
            ],
            [
                'name' => 'Laptop Lelo',
                'url' => 'https://laptoplelo.com',
                'description' => 'An e-commerce marketplace specializing in laptops (new/used) with comprehensive delivery options and competitive pricing.',
                'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
                'category' => 'E-commerce',
                'is_featured' => false
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
