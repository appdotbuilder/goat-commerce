<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kambing Kacang',
                'description' => 'Kambing lokal Indonesia yang tahan terhadap cuaca tropis',
            ],
            [
                'name' => 'Kambing Etawa',
                'description' => 'Kambing perah dengan produksi susu tinggi',
            ],
            [
                'name' => 'Kambing Boer',
                'description' => 'Kambing pedaging dengan pertumbuhan cepat',
            ],
            [
                'name' => 'Kambing Jawarandu',
                'description' => 'Hasil persilangan kambing lokal dengan etawa',
            ],
            [
                'name' => 'Kambing Gembrong',
                'description' => 'Kambing berbulu panjang khas Bali',
            ],
            [
                'name' => 'Kambing Marica',
                'description' => 'Kambing khas Sulawesi Selatan',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => true,
            ]);
        }
    }
}