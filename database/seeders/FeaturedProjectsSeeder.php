<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

/**
 * Adds the product builds to the work lists (some featured, the rest under
 * "More projects"). Safe to re-run:
 * rows are matched by name. Empty url = no public link is shown.
 */
class FeaturedProjectsSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                'name' => 'ClearEarth ERP',
                'category' => 'ERP/SaaS',
                'image' => 'images/projects/clearearth-erp.svg',
                'description' => 'Multi-tenant ERP for a UAE recycling and waste-management company. CRM, quotations with PIN approval, inspections, work orders, GRN, UAE-VAT invoicing, full accounting and HR with payroll, across roughly 100 data models.',
            ],
            [
                'name' => 'Jyotish Astrology',
                'category' => 'Astrology/Ai',
                'image' => 'images/projects/jyotish-astrology.svg',
                'description' => 'Vedic birth-chart app built on Swiss Ephemeris: planetary positions, dashas, transits, Ai readings, name numerology and email transit reminders, with an admin back-office for the reference data.',
            ],
            [
                'name' => 'Business Idea Generator',
                'category' => 'Ai/Reports',
                'image' => 'images/projects/business-idea-generator.svg',
                'description' => 'Turns a rough idea into an investor-style report of 21 sections streamed live, with follow-up chat, section regeneration, comparison, PDF/DOCX export, share links and a daily Ai budget cap.',
            ],
            [
                'name' => 'Building Management',
                'category' => 'Property/SaaS',
                'image' => 'images/projects/building-management.svg',
                'description' => 'Property-management system for buildings, units and residents: maintenance requests, complaints, assets, finance, vendor tenders, visitor and patrol security, with separate dashboards for admins, residents, technicians and gatekeepers.',
            ],
            [
                'name' => 'CGA Games',
                'category' => 'E-commerce',
                'image' => 'images/projects/cga-games.svg',
                'description' => 'Live gaming store for the GCC selling gift cards, game codes and consoles. Supplier-API auto-fulfilment with retries and a circuit breaker, buy-now-pay-later, loyalty, bilingual storefront and a full admin panel.',
            ],
            [
                'name' => 'Lunchbox Ai',
                'category' => 'Ai/Mobile',
                'image' => 'images/projects/lunchbox-ai.svg',
                'description' => 'Parents photograph a lunchbox and ingredients; vision and image models design an allergy-safe packed lunch. Child profiles, credit packs through Stripe, push notifications and an admin dashboard.',
            ],
            [
                'name' => 'Pulse Ai',
                'category' => 'Ai/Analytics',
                'image' => 'images/projects/pulse.svg',
                'description' => '"Ask your database": an Ai agent connects to Postgres, MySQL or MongoDB, writes guarded read-only queries and builds live dashboards with KPIs, charts and maps, streamed tile by tile.',
            ],
            [
                'name' => 'Socialposter',
                'category' => 'Marketing/Ai',
                'image' => 'images/projects/socialposter.svg',
                'description' => 'Daily Ai-generated image and caption per business, published automatically to LinkedIn, Facebook and Instagram, with per-business schedules, logo tools and product posts.',
            ],
            [
                'name' => 'Upwork Automation',
                'category' => 'Automation/Ai',
                'image' => 'images/projects/upwork-automation.svg',
                'description' => 'Finds relevant freelance jobs the moment they appear, scores them with Ai, suggests milestones and pricing, sends email alerts and tracks proposals with evidence screenshots.',
            ],
            [
                'name' => 'Video Generator',
                'category' => 'Ai/Media',
                'image' => 'images/projects/video-generator.svg',
                'description' => 'One idea becomes a short cinematic video: story, a consistent main character, shot breakdown, per-shot images and image-to-video clips, run as an automatic pipeline.',
            ],
            [
                'name' => 'Jobber',
                'category' => 'Automation/Ai',
                'image' => 'images/projects/jobber.svg',
                'description' => 'Job-application automation: completes LinkedIn Easy Apply and Indeed Apply from a link list, answers questions from the CV with Ai under strict rules, and tracks every application in a dashboard.',
            ],
        ];

        // Only these stay in the pinned showcase; the rest list under "More projects".
        $featured = ['Pulse Ai', 'Lunchbox Ai', 'Socialposter', 'Upwork Automation'];

        // BBrain is featured too; the other older projects sit under "More projects".
        // Display order of the featured ones lives in config/portfolio.php (featured_order).
        Project::where('name', 'BBrain')->update(['is_featured' => true]);
        Project::whereIn('name', ['UAE Entry Visa', 'Aile Properties', 'Design Iconic'])
            ->update(['is_featured' => false]);

        // Renamed: keep re-runs from creating duplicates.
        Project::where('name', 'Lunchbox AI')->update(['name' => 'Lunchbox Ai']);

        // "Pulse" was renamed; keep re-runs from creating a duplicate row.
        Project::where('name', 'Pulse')->update(['name' => 'Pulse Ai']);

        foreach ($items as $item) {
            Project::updateOrCreate(
                ['name' => $item['name']],
                $item + ['url' => '', 'is_featured' => in_array($item['name'], $featured, true)]
            );
        }

        // House style: "Ai" with a small i, everywhere it is displayed.
        foreach (Project::all() as $project) {
            foreach (['name', 'category', 'description'] as $field) {
                $project->{$field} = preg_replace('/\bAI\b/', 'Ai', (string) $project->{$field});
            }
            $project->save();
        }
    }
}
