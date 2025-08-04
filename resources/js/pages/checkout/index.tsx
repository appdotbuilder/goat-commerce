import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Select components removed as not used in this component
import { Checkbox } from '@/components/ui/checkbox';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    is_preorder: boolean;
    total: number;
    product: {
        name: string;
        sku: string;
        breed?: string;
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
    cart: Cart;
    [key: string]: unknown;
}

export default function CheckoutIndex({ cart }: Props) {
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        phone: '',
    });

    const [billingAddress, setBillingAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        phone: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [loading, setLoading] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const subtotal = cart.total;
    const taxAmount = subtotal * 0.11;
    const shippingAmount = 50000;
    const totalAmount = subtotal + taxAmount + shippingAmount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const finalBillingAddress = sameAsShipping ? shippingAddress : billingAddress;

        router.post('/orders', {
            shipping_address: shippingAddress,
            billing_address: finalBillingAddress,
            payment_method: paymentMethod,
        }, {
            onFinish: () => setLoading(false),
        });
    };

    const paymentMethods = [
        { value: 'bank_transfer', label: '🏦 Transfer Bank', description: 'BCA, BNI, BRI, Mandiri' },
        { value: 'ovo', label: '📱 OVO', description: 'Bayar dengan OVO' },
        { value: 'dana', label: '💙 DANA', description: 'Bayar dengan DANA' },
        { value: 'gopay', label: '🟢 GoPay', description: 'Bayar dengan GoPay' },
        { value: 'shopee_pay', label: '🛒 ShopeePay', description: 'Bayar dengan ShopeePay' },
    ];

    return (
        <AppShell>
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">💳 Checkout</h1>
                    <p className="text-gray-600">
                        Lengkapi informasi pengiriman dan pembayaran
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>📦 Alamat Pengiriman</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="shipping_name">Nama Lengkap</Label>
                                        <Input
                                            id="shipping_name"
                                            value={shippingAddress.name}
                                            onChange={(e) => setShippingAddress({
                                                ...shippingAddress,
                                                name: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="shipping_street">Alamat Lengkap</Label>
                                        <Input
                                            id="shipping_street"
                                            value={shippingAddress.street}
                                            onChange={(e) => setShippingAddress({
                                                ...shippingAddress,
                                                street: e.target.value
                                            })}
                                            placeholder="Jalan, nomor rumah, RT/RW"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="shipping_city">Kota</Label>
                                            <Input
                                                id="shipping_city"
                                                value={shippingAddress.city}
                                                onChange={(e) => setShippingAddress({
                                                    ...shippingAddress,
                                                    city: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="shipping_state">Provinsi</Label>
                                            <Input
                                                id="shipping_state"
                                                value={shippingAddress.state}
                                                onChange={(e) => setShippingAddress({
                                                    ...shippingAddress,
                                                    state: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="shipping_postal">Kode Pos</Label>
                                            <Input
                                                id="shipping_postal"
                                                value={shippingAddress.postal_code}
                                                onChange={(e) => setShippingAddress({
                                                    ...shippingAddress,
                                                    postal_code: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="shipping_phone">No. Telepon</Label>
                                            <Input
                                                id="shipping_phone"
                                                value={shippingAddress.phone}
                                                onChange={(e) => setShippingAddress({
                                                    ...shippingAddress,
                                                    phone: e.target.value
                                                })}
                                                placeholder="+628xxxxxxxxx"
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Billing Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>🧾 Alamat Penagihan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="same_address"
                                            checked={sameAsShipping}
                                            onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                                        />
                                        <Label htmlFor="same_address">
                                            Sama dengan alamat pengiriman
                                        </Label>
                                    </div>

                                    {!sameAsShipping && (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="billing_name">Nama Lengkap</Label>
                                                <Input
                                                    id="billing_name"
                                                    value={billingAddress.name}
                                                    onChange={(e) => setBillingAddress({
                                                        ...billingAddress,
                                                        name: e.target.value
                                                    })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="billing_street">Alamat Lengkap</Label>
                                                <Input
                                                    id="billing_street"
                                                    value={billingAddress.street}
                                                    onChange={(e) => setBillingAddress({
                                                        ...billingAddress,
                                                        street: e.target.value
                                                    })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="billing_city">Kota</Label>
                                                    <Input
                                                        id="billing_city"
                                                        value={billingAddress.city}
                                                        onChange={(e) => setBillingAddress({
                                                            ...billingAddress,
                                                            city: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="billing_state">Provinsi</Label>
                                                    <Input
                                                        id="billing_state"
                                                        value={billingAddress.state}
                                                        onChange={(e) => setBillingAddress({
                                                            ...billingAddress,
                                                            state: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="billing_postal">Kode Pos</Label>
                                                    <Input
                                                        id="billing_postal"
                                                        value={billingAddress.postal_code}
                                                        onChange={(e) => setBillingAddress({
                                                            ...billingAddress,
                                                            postal_code: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="billing_phone">No. Telepon</Label>
                                                    <Input
                                                        id="billing_phone"
                                                        value={billingAddress.phone}
                                                        onChange={(e) => setBillingAddress({
                                                            ...billingAddress,
                                                            phone: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>💳 Metode Pembayaran</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {paymentMethods.map((method) => (
                                            <div key={method.value} className="flex items-center space-x-3">
                                                <input
                                                    type="radio"
                                                    id={method.value}
                                                    name="payment_method"
                                                    value={method.value}
                                                    checked={paymentMethod === method.value}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-4 h-4 text-green-600"
                                                    required
                                                />
                                                <label htmlFor={method.value} className="flex-grow cursor-pointer">
                                                    <div className="font-medium">{method.label}</div>
                                                    <div className="text-sm text-gray-500">{method.description}</div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>📋 Ringkasan Pesanan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Items */}
                                    <div className="space-y-3">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <div className="flex-grow">
                                                    <div className="font-medium line-clamp-1">
                                                        {item.product.name}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">
                                                        {item.quantity}x • {formatPrice(item.price)}
                                                        {item.is_preorder && (
                                                            <Badge variant="outline" className="ml-1 text-xs">
                                                                Pre-Order
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {formatPrice(item.total)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <hr />

                                    {/* Calculations */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Pajak (PPN 11%)</span>
                                            <span>{formatPrice(taxAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Ongkos Kirim</span>
                                            <span>{formatPrice(shippingAmount)}</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-green-600">
                                                {formatPrice(totalAmount)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? '⏳ Memproses...' : '🛒 Pesan Sekarang'}
                                    </Button>

                                    <div className="text-xs text-gray-500 text-center">
                                        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan GoatMart
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}