<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        $price = fake()->numberBetween(2000000, 10000000);
        $salePrice = fake()->boolean(30) ? fake()->numberBetween(1500000, $price - 100000) : null;
        
        return [
            'category_id' => Category::factory(),
            'name' => ucwords($name),
            'slug' => Str::slug($name) . '-' . Str::random(5),
            'description' => fake()->paragraph(),
            'short_description' => fake()->sentence(),
            'price' => $price,
            'sale_price' => $salePrice,
            'stock_quantity' => fake()->numberBetween(0, 50),
            'sku' => 'GOAT-' . strtoupper(Str::random(8)),
            'breed' => fake()->randomElement(['Kacang', 'Etawa', 'Boer', 'Jawarandu', 'Gembrong']),
            'gender' => fake()->randomElement(['male', 'female', 'mixed']),
            'age_range' => fake()->numberBetween(1, 3) . '-' . fake()->numberBetween(4, 6) . ' tahun',
            'weight_range' => fake()->randomFloat(1, 15, 80),
            'health_info' => 'Sehat, sudah divaksin lengkap.',
            'is_featured' => fake()->boolean(20),
            'is_active' => true,
            'allow_preorder' => fake()->boolean(10),
            'expected_availability' => fake()->boolean(10) ? fake()->dateTimeBetween('now', '+3 months') : null,
        ];
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the product allows pre-orders.
     */
    public function preorder(): static
    {
        return $this->state(fn (array $attributes) => [
            'allow_preorder' => true,
            'stock_quantity' => 0,
            'expected_availability' => fake()->dateTimeBetween('now', '+3 months'),
        ]);
    }
}