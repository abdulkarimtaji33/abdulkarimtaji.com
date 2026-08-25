<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear existing settings
        Setting::truncate();
        
        // Available themes: green, blue, purple, orange, red, pink, teal, indigo
        Setting::set('theme_color', 'purple', 'string');
        
        // Theme configurations
        $themes = [
            'green' => [
                'primary' => '#10B981',
                'dark' => '#059669',
                'light' => '#D1FAE5',
                'emerald' => '#047857',
                'accent' => '#6EE7B7',
                'forest' => '#064E3B',
                'secondary' => '#84CC16',
                'tertiary' => '#14B8A6',
            ],
            'blue' => [
                'primary' => '#3B82F6',
                'dark' => '#1D4ED8',
                'light' => '#DBEAFE',
                'emerald' => '#1E40AF',
                'accent' => '#60A5FA',
                'forest' => '#1E3A8A',
                'secondary' => '#0EA5E9',
                'tertiary' => '#06B6D4',
            ],
            'purple' => [
                'primary' => '#A855F7',
                'dark' => '#7E22CE',
                'light' => '#F3E8FF',
                'emerald' => '#6B21A8',
                'accent' => '#C084FC',
                'forest' => '#581C87',
                'secondary' => '#D946EF',
                'tertiary' => '#EC4899',
            ],
            'orange' => [
                'primary' => '#F97316',
                'dark' => '#EA580C',
                'light' => '#FFEDD5',
                'emerald' => '#C2410C',
                'accent' => '#FB923C',
                'forest' => '#9A3412',
                'secondary' => '#FBBF24',
                'tertiary' => '#F59E0B',
            ],
            'red' => [
                'primary' => '#EF4444',
                'dark' => '#DC2626',
                'light' => '#FEE2E2',
                'emerald' => '#B91C1C',
                'accent' => '#F87171',
                'forest' => '#991B1B',
                'secondary' => '#FB7185',
                'tertiary' => '#F43F5E',
            ],
            'pink' => [
                'primary' => '#EC4899',
                'dark' => '#DB2777',
                'light' => '#FCE7F3',
                'emerald' => '#BE185D',
                'accent' => '#F472B6',
                'forest' => '#9D174D',
                'secondary' => '#F9A8D4',
                'tertiary' => '#E879F9',
            ],
            'teal' => [
                'primary' => '#14B8A6',
                'dark' => '#0F766E',
                'light' => '#CCFBF1',
                'emerald' => '#115E59',
                'accent' => '#5EEAD4',
                'forest' => '#134E4A',
                'secondary' => '#2DD4BF',
                'tertiary' => '#06B6D4',
            ],
            'indigo' => [
                'primary' => '#6366F1',
                'dark' => '#4F46E5',
                'light' => '#E0E7FF',
                'emerald' => '#3730A3',
                'accent' => '#818CF8',
                'forest' => '#312E81',
                'secondary' => '#8B5CF6',
                'tertiary' => '#A78BFA',
            ],
        ];
        
        Setting::set('themes', json_encode($themes), 'json');
        
        // Other settings
        Setting::set('site_name', 'Abdul Kareem Taji', 'string');
        Setting::set('site_tagline', 'Senior Full Stack Developer', 'string');
    }
}
