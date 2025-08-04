import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images?: string[];
    breed?: string;
    gender: string;
    is_featured: boolean;
    current_price: number;
    is_on_sale: boolean;
    category: {
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image_url?: string;
    active_products_count: number;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    latestProducts: Product[];
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, categories, latestProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8">
                        <span className="text-6xl mb-4 block">🐐</span>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            GoatMart Indonesia
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Marketplace kambing terpercaya di Indonesia. Jual beli kambing berkualitas 
                            dengan sistem pre-order dan program affiliate yang menguntungkan! 🚀
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Link href="/products">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                🛒 Lihat Produk
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline">
                                📝 Daftar Sekarang
                            </Button>
                        </Link>
                    </div>

                    {/* Key Features */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">🐑</div>
                            <h3 className="font-semibold mb-2">Kambing Berkualitas</h3>
                            <p className="text-gray-600 text-sm">Berbagai jenis kambing dari peternak terpercaya</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">💰</div>
                            <h3 className="font-semibold mb-2">Program Affiliate</h3>
                            <p className="text-gray-600 text-sm">Dapatkan komisi hingga 5% dari setiap referral</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">📦</div>
                            <h3 className="font-semibold mb-2">Pre-Order System</h3>
                            <p className="text-gray-600 text-sm">Pesan dulu, bayar nanti ketika stok tersedia</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            {categories.length > 0 && (
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">🏷️ Kategori Kambing</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.slug}`}
                                    className="group"
                                >
                                    <Card className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4 text-center">
                                            <div className="text-4xl mb-2">🐐</div>
                                            <h3 className="font-semibold text-sm">{category.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {category.active_products_count} produk
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">⭐ Produk Unggulan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                                            <span className="text-6xl">🐐</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {product.category.name}
                                            </Badge>
                                            {product.is_on_sale && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Sale!
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-green-600">
                                                {formatPrice(product.current_price)}
                                            </span>
                                            {product.is_on_sale && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            🐑 {product.breed} • {product.gender === 'male' ? '♂️ Jantan' : product.gender === 'female' ? '♀️ Betina' : '🐐 Campuran'}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="w-full"
                                        >
                                            <Button className="w-full" size="sm">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Products */}
            {latestProducts.length > 0 && (
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">🆕 Produk Terbaru</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestProducts.map((product) => (
                                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                                            <span className="text-5xl">🐐</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {product.category.name}
                                            </Badge>
                                            {product.is_on_sale && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Sale!
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-green-600">
                                                {formatPrice(product.current_price)}
                                            </span>
                                            {product.is_on_sale && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            🐑 {product.breed} • {product.gender === 'male' ? '♂️ Jantan' : product.gender === 'female' ? '♀️ Betina' : '🐐 Campuran'}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="w-full"
                                        >
                                            <Button className="w-full" size="sm">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Payment Methods */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">💳 Metode Pembayaran</h2>
                    <p className="text-gray-600 mb-8">Kami mendukung berbagai metode pembayaran Indonesia</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm border">
                            <div className="text-2xl mb-2">🏦</div>
                            <div className="text-sm font-medium">Transfer Bank</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm border">
                            <div className="text-2xl mb-2">📱</div>
                            <div className="text-sm font-medium">OVO</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm border">
                            <div className="text-2xl mb-2">💙</div>
                            <div className="text-sm font-medium">DANA</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm border">
                            <div className="text-2xl mb-2">🟢</div>
                            <div className="text-sm font-medium">GoPay</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm border">
                            <div className="text-2xl mb-2">🛒</div>
                            <div className="text-sm font-medium">ShopeePay</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-green-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">🚀 Mulai Bisnis Kambing Anda!</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Bergabunglah dengan ribuan peternak dan pembeli yang sudah mempercayai GoatMart
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                                📝 Daftar Gratis
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                                🛍️ Mulai Belanja
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-2xl mb-4">🐐 GoatMart</div>
                    <p className="text-gray-400 text-sm">
                        Marketplace kambing terpercaya di Indonesia. Menghubungkan peternak dengan pembeli sejak 2024.
                    </p>
                    <div className="mt-4 text-xs text-gray-500">
                        Made with ❤️ for Indonesian goat farmers
                    </div>
                </div>
            </footer>
        </div>
    );
}