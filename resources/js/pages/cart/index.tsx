import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    is_preorder: boolean;
    total: number;
    product: {
        id: number;
        name: string;
        slug: string;
        sku: string;
        breed?: string;
        gender: string;
        stock_quantity: number;
        category: {
            name: string;
        };
    };
}

interface Cart {
    id: number;
    items: CartItem[];
    total: number;
    total_items: number;
}

interface Props {
    cart: Cart | null;
    [key: string]: unknown;
}

export default function CartIndex({ cart }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const updateQuantity = (cartItem: CartItem, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        router.patch(`/cart/${cartItem.id}`, {
            quantity: newQuantity,
        }, {
            preserveScroll: true,
        });
    };

    const removeItem = (cartItem: CartItem) => {
        router.delete(`/cart/${cartItem.id}`, {
            preserveScroll: true,
        });
    };

    if (!cart || cart.items.length === 0) {
        return (
            <AppShell>
                <div className="container mx-auto py-8 px-4">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <h1 className="text-3xl font-bold mb-4">Keranjang Belanja Kosong</h1>
                        <p className="text-gray-600 mb-8">
                            Belum ada produk dalam keranjang Anda. Yuk mulai belanja kambing berkualitas!
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                🐐 Mulai Belanja
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">🛒 Keranjang Belanja</h1>
                    <p className="text-gray-600">
                        {cart.total_items} item dalam keranjang
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">🐐</span>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold text-lg">
                                                        {item.product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {item.product.category.name}
                                                        </Badge>
                                                        {item.is_preorder && (
                                                            <Badge variant="outline" className="text-xs">
                                                                Pre-Order
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        🐑 {item.product.breed} • SKU: {item.product.sku}
                                                    </div>
                                                    <div className="text-lg font-bold text-green-600">
                                                        {formatPrice(item.price)}
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item, parseInt(e.target.value) || 1)}
                                                        className="w-20 text-center"
                                                        min="1"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-sm text-gray-500">Subtotal</div>
                                                    <div className="text-lg font-bold">
                                                        {formatPrice(item.total)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>📋 Ringkasan Pesanan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal ({cart.total_items} item)</span>
                                        <span>{formatPrice(cart.total)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Pajak (PPN 11%)</span>
                                        <span>{formatPrice(cart.total * 0.11)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Ongkos Kirim</span>
                                        <span>{formatPrice(50000)}</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-green-600">
                                            {formatPrice(cart.total + (cart.total * 0.11) + 50000)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Link href="/checkout" className="w-full block">
                                        <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                                            💳 Checkout
                                        </Button>
                                    </Link>
                                    <Link href="/products" className="w-full block">
                                        <Button variant="outline" className="w-full">
                                            🛍️ Lanjut Belanja
                                        </Button>
                                    </Link>
                                </div>

                                {/* Payment Methods Info */}
                                <div className="pt-4 border-t">
                                    <div className="text-sm text-gray-600 mb-2">
                                        💳 Metode Pembayaran:
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center space-x-1">
                                            <span>🏦</span>
                                            <span>Transfer Bank</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>📱</span>
                                            <span>OVO</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>💙</span>
                                            <span>DANA</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>🟢</span>
                                            <span>GoPay</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}