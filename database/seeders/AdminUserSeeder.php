<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Affiliate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin GoatMart',
            'email' => 'admin@goatmart.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create demo customer
        $customer = User::create([
            'name' => 'Demo Customer',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'email_verified_at' => now(),
            'address' => [
                'street' => 'Jl. Contoh No. 123',
                'city' => 'Jakarta',
                'state' => 'DKI Jakarta',
                'postal_code' => '12345',
            ],
            'phone' => '+6281234567890',
        ]);

        // Create demo affiliate
        $affiliate = User::create([
            'name' => 'Demo Affiliate',
            'email' => 'affiliate@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'email_verified_at' => now(),
        ]);

        // Create affiliate program for demo user
        Affiliate::create([
            'user_id' => $affiliate->id,
            'code' => 'DEMO2024',
            'commission_rate' => 5.00,
            'is_active' => true,
        ]);
    }
}