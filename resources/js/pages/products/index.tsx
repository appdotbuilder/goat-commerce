import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    stock_quantity: number;
    breed?: string;
    gender: string;
    current_price: number;
    is_on_sale: boolean;
    is_in_stock: boolean;
    allow_preorder: boolean;
    category: {
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    products: {
        data: Product[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        meta: {
            last_page: number;
        };
    };
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
        gender?: string;
        sort?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/products', {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleAddToCart = (product: Product) => {
        router.post('/cart', {
            product_id: product.id,
            quantity: 1,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">🐐 Daftar Produk Kambing</h1>
                    <p className="text-gray-600">
                        Temukan kambing berkualitas dari berbagai jenis dan kategori
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Cari Produk</label>
                            <Input
                                placeholder="Nama, jenis, atau deskripsi..."
                                defaultValue={filters.search || ''}
                                onChange={(e) => {
                                    const timer = setTimeout(() => {
                                        handleFilterChange('search', e.target.value);
                                    }, 500);
                                    return () => clearTimeout(timer);
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Kategori</label>
                            <Select
                                value={filters.category || 'all'}
                                onValueChange={(value) => handleFilterChange('category', value === 'all' ? '' : value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category.id} value={category.slug}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
                            <Select
                                value={filters.gender || 'all'}
                                onValueChange={(value) => handleFilterChange('gender', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    <SelectItem value="male">♂️ Jantan</SelectItem>
                                    <SelectItem value="female">♀️ Betina</SelectItem>
                                    <SelectItem value="mixed">🐐 Campuran</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Urutkan</label>
                            <Select
                                value={filters.sort || 'latest'}
                                onValueChange={(value) => handleFilterChange('sort', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Terbaru" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Terbaru</SelectItem>
                                    <SelectItem value="price_low">Harga Terendah</SelectItem>
                                    <SelectItem value="price_high">Harga Tertinggi</SelectItem>
                                    <SelectItem value="name">Nama A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {products.data.map((product) => (
                        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                            <CardHeader className="p-0">
                                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center relative">
                                    <span className="text-6xl">🐐</span>
                                    {product.is_on_sale && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute top-2 right-2"
                                        >
                                            Sale!
                                        </Badge>
                                    )}
                                    {!product.is_in_stock && !product.allow_preorder && (
                                        <Badge
                                            variant="secondary"
                                            className="absolute top-2 left-2"
                                        >
                                            Habis
                                        </Badge>
                                    )}
                                    {product.allow_preorder && product.stock_quantity === 0 && (
                                        <Badge
                                            variant="outline"
                                            className="absolute top-2 left-2"
                                        >
                                            Pre-Order
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="text-xs">
                                        {product.category.name}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg mb-2 line-clamp-2">
                                    {product.name}
                                </CardTitle>
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
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>🐑 {product.breed}</div>
                                    <div>
                                        {product.gender === 'male' ? '♂️ Jantan' : 
                                         product.gender === 'female' ? '♀️ Betina' : '🐐 Campuran'}
                                    </div>
                                    {product.stock_quantity > 0 && (
                                        <div className="text-green-600">
                                            📦 Stok: {product.stock_quantity}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 space-y-2">
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="w-full"
                                >
                                    <Button variant="outline" className="w-full" size="sm">
                                        Lihat Detail
                                    </Button>
                                </Link>
                                {product.is_in_stock && (
                                    <Button
                                        className="w-full"
                                        size="sm"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        {product.allow_preorder && product.stock_quantity === 0 
                                            ? '📅 Pre-Order' 
                                            : '🛒 Tambah ke Keranjang'
                                        }
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {products.meta.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white border hover:bg-gray-50'
                                    }`}
                                    preserveState
                                    preserveScroll
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {products.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
                        <p className="text-gray-600 mb-4">
                            Coba ubah filter pencarian atau kata kunci yang berbeda
                        </p>
                        <Button onClick={() => router.get('/products')}>
                            Lihat Semua Produk
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}