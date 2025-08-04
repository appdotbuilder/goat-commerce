<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            // Kambing Kacang
            [
                'name' => 'Kambing Kacang Betina Dewasa',
                'description' => 'Kambing kacang betina umur 1-2 tahun, siap untuk diternakkan. Sehat dan sudah divaksin lengkap.',
                'short_description' => 'Kambing kacang betina dewasa siap ternak',
                'price' => 2500000,
                'stock_quantity' => 15,
                'breed' => 'Kacang',
                'gender' => 'female',
                'age_range' => '1-2 tahun',
                'weight_range' => 25.5,
                'health_info' => 'Sudah divaksin SE, Antraks, dan Orf. Kondisi sehat dan aktif.',
                'is_featured' => true,
                'category_name' => 'Kambing Kacang',
            ],
            [
                'name' => 'Kambing Kacang Jantan Breeding',
                'description' => 'Kambing kacang jantan unggul untuk breeding. Keturunan induk berprestasi dengan genetik terbaik.',
                'short_description' => 'Kambing kacang jantan breeding berkualitas',
                'price' => 3500000,
                'sale_price' => 3200000,
                'stock_quantity' => 8,
                'breed' => 'Kacang',
                'gender' => 'male',
                'age_range' => '2-3 tahun',
                'weight_range' => 35.0,
                'health_info' => 'Sertifikat kesehatan lengkap, libido tinggi.',
                'is_featured' => true,
                'category_name' => 'Kambing Kacang',
            ],
            // Kambing Etawa
            [
                'name' => 'Kambing Etawa Perah Super',
                'description' => 'Kambing etawa betina dengan produksi susu hingga 3 liter per hari. Cocok untuk usaha susu kambing.',
                'short_description' => 'Kambing etawa produksi susu tinggi',
                'price' => 6500000,
                'stock_quantity' => 5,
                'breed' => 'Etawa',
                'gender' => 'female',
                'age_range' => '2-4 tahun',
                'weight_range' => 45.0,
                'health_info' => 'Sehat, produktif, riwayat kesehatan baik.',
                'is_featured' => true,
                'category_name' => 'Kambing Etawa',
            ],
            [
                'name' => 'Kambing Etawa Jantan Unggul',
                'description' => 'Pejantan etawa dengan postur tubuh besar dan genetik unggul untuk breeding.',
                'short_description' => 'Pejantan etawa breeding premium',
                'price' => 8500000,
                'stock_quantity' => 3,
                'breed' => 'Etawa',
                'gender' => 'male',
                'age_range' => '3-4 tahun',
                'weight_range' => 65.0,
                'health_info' => 'Kondisi prima, genetik unggul.',
                'category_name' => 'Kambing Etawa',
            ],
            // Kambing Boer
            [
                'name' => 'Kambing Boer Bakalan',
                'description' => 'Kambing boer muda untuk penggemukan. Pertumbuhan cepat dan efisiensi pakan tinggi.',
                'short_description' => 'Kambing boer bakalan siap gemuk',
                'price' => 4200000,
                'stock_quantity' => 12,
                'breed' => 'Boer',
                'gender' => 'mixed',
                'age_range' => '6-12 bulan',
                'weight_range' => 20.0,
                'health_info' => 'Sehat, vaksin lengkap, pertumbuhan optimal.',
                'is_featured' => true,
                'category_name' => 'Kambing Boer',
            ],
            [
                'name' => 'Kambing Boer Siap Potong',
                'description' => 'Kambing boer gemuk siap untuk dipotong. Daging berkualitas premium dengan marbling yang baik.',
                'short_description' => 'Kambing boer gemuk siap potong',
                'price' => 7500000,
                'sale_price' => 7000000,
                'stock_quantity' => 6,
                'breed' => 'Boer',
                'gender' => 'male',
                'age_range' => '1.5-2 tahun',
                'weight_range' => 55.0,
                'health_info' => 'Kondisi optimal, daging berkualitas premium.',
                'category_name' => 'Kambing Boer',
            ],
            // Pre-order items
            [
                'name' => 'Pre-Order Kambing Jawarandu',
                'description' => 'Pre-order kambing jawarandu pilihan. Stok akan tersedia dalam 2-3 bulan.',
                'short_description' => 'Pre-order kambing jawarandu premium',
                'price' => 5500000,
                'stock_quantity' => 0,
                'breed' => 'Jawarandu',
                'gender' => 'mixed',
                'age_range' => '1-2 tahun',
                'weight_range' => 40.0,
                'health_info' => 'Akan dipilih yang terbaik saat tersedia.',
                'allow_preorder' => true,
                'expected_availability' => now()->addMonths(2),
                'category_name' => 'Kambing Jawarandu',
            ],
        ];

        foreach ($products as $productData) {
            $category = $categories->firstWhere('name', $productData['category_name']);
            
            if ($category) {
                $product = [
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'slug' => Str::slug($productData['name']) . '-' . Str::random(5),
                    'description' => $productData['description'],
                    'short_description' => $productData['short_description'],
                    'price' => $productData['price'],
                    'sale_price' => $productData['sale_price'] ?? null,
                    'stock_quantity' => $productData['stock_quantity'],
                    'sku' => 'GOAT-' . strtoupper(Str::random(8)),
                    'breed' => $productData['breed'],
                    'gender' => $productData['gender'],
                    'age_range' => $productData['age_range'],
                    'weight_range' => $productData['weight_range'],
                    'health_info' => $productData['health_info'],
                    'is_featured' => $productData['is_featured'] ?? false,
                    'is_active' => true,
                    'allow_preorder' => $productData['allow_preorder'] ?? false,
                    'expected_availability' => $productData['expected_availability'] ?? null,
                ];

                Product::create($product);
            }
        }

        // Create additional random products
        $additionalProducts = 20;
        for ($i = 0; $i < $additionalProducts; $i++) {
            $category = $categories->random();
            $breeds = ['Kacang', 'Etawa', 'Boer', 'Jawarandu', 'Gembrong', 'Marica'];
            $genders = ['male', 'female', 'mixed'];
            
            Product::create([
                'category_id' => $category->id,
                'name' => $category->name . ' ' . ['Premium', 'Super', 'Unggul', 'Pilihan', 'Istimewa'][random_int(0, 4)],
                'slug' => Str::slug($category->name) . '-' . Str::random(8),
                'description' => 'Kambing berkualitas tinggi dengan kondisi sehat dan siap untuk berbagai kebutuhan ternak.',
                'short_description' => 'Kambing ' . strtolower($category->name) . ' berkualitas',
                'price' => random_int(2000000, 8000000),
                'sale_price' => random_int(0, 1) ? random_int(1500000, 7500000) : null,
                'stock_quantity' => random_int(3, 20),
                'sku' => 'GOAT-' . strtoupper(Str::random(8)),
                'breed' => $breeds[random_int(0, count($breeds) - 1)],
                'gender' => $genders[random_int(0, count($genders) - 1)],
                'age_range' => random_int(1, 3) . '-' . random_int(4, 6) . ' tahun',
                'weight_range' => random_int(20, 60) + (random_int(0, 9) / 10),
                'health_info' => 'Kondisi sehat, sudah divaksin lengkap.',
                'is_featured' => random_int(0, 4) === 0, // 20% chance to be featured
                'is_active' => true,
                'allow_preorder' => random_int(0, 9) === 0, // 10% chance for preorder
            ]);
        }
    }
}