import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, Gift } from 'lucide-react';

export default function AffiliateJoin() {
    const handleJoin = () => {
        router.post('/affiliate', {}, {
            onSuccess: () => {
                alert('Selamat! Anda telah bergabung dengan program affiliate GoatMart!');
            },
        });
    };

    const benefits = [
        {
            icon: <DollarSign className="h-8 w-8 text-green-600" />,
            title: 'Komisi 5%',
            description: 'Dapatkan komisi 5% dari setiap pembelian yang dilakukan oleh referral Anda',
        },
        {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: 'Unlimited Referrals',
            description: 'Tidak ada batasan jumlah orang yang bisa Anda referral',
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
            title: 'Passive Income',
            description: 'Penghasilan terus bertambah selama referral Anda aktif berbelanja',
        },
        {
            icon: <Gift className="h-8 w-8 text-red-600" />,
            title: 'Bonus Eksklusif',
            description: 'Dapatkan bonus dan reward khusus untuk affiliate terbaik',
        },
    ];

    const steps = [
        {
            number: '1',
            title: 'Daftar Program',
            description: 'Klik tombol "Bergabung Sekarang" untuk mendaftar sebagai affiliate',
        },
        {
            number: '2',
            title: 'Dapatkan Link',
            description: 'Anda akan mendapatkan link referral unik untuk dibagikan',
        },
        {
            number: '3',
            title: 'Bagikan Link',
            description: 'Bagikan link referral ke teman, keluarga, atau media sosial',
        },
        {
            number: '4',
            title: 'Dapatkan Komisi',
            description: 'Setiap orang yang membeli melalui link Anda = komisi untuk Anda!',
        },
    ];

    return (
        <AppShell>
            <div className="container mx-auto py-8 px-4">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">💰</div>
                    <h1 className="text-4xl font-bold mb-4">
                        Program Affiliate GoatMart
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Bergabunglah dengan program affiliate kami dan dapatkan penghasilan tambahan 
                        dengan membantu orang lain menemukan kambing berkualitas di GoatMart!
                    </p>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                        🎉 Gratis untuk bergabung!
                    </Badge>
                </div>

                {/* Benefits */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        🎯 Kenapa Harus Jadi Affiliate?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-center mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* How it Works */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        🚀 Cara Kerjanya
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Earning Example */}
                <Card className="mb-12">
                    <CardHeader>
                        <CardTitle className="text-center">
                            💸 Contoh Potensi Penghasilan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                    Rp 250.000
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Per Bulan</div>
                                <div className="text-xs">
                                    Jika 10 orang beli @Rp 500.000<br />
                                    10 × Rp 500.000 × 5% = Rp 250.000
                                </div>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600 mb-2">
                                    Rp 1.250.000
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Per Bulan</div>
                                <div className="text-xs">
                                    Jika 25 orang beli @Rp 1.000.000<br />
                                    25 × Rp 1.000.000 × 5% = Rp 1.250.000
                                </div>
                            </div>
                            <div className="p-6 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600 mb-2">
                                    Rp 5.000.000+
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Per Bulan</div>
                                <div className="text-xs">
                                    Jika 50+ orang beli @Rp 2.000.000<br />
                                    50 × Rp 2.000.000 × 5% = Rp 5.000.000
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                * Perhitungan di atas adalah simulasi. Penghasilan aktual tergantung pada aktivitas referral Anda.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Siap Memulai?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Bergabunglah dengan ratusan affiliate yang sudah merasakan keuntungannya!
                        </p>
                        <div className="space-y-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={handleJoin}
                                className="bg-white text-green-600 hover:bg-gray-100"
                            >
                                💰 Bergabung Sekarang - GRATIS!
                            </Button>
                            <div className="text-sm opacity-80">
                                Tidak ada biaya pendaftaran • Mulai dapat komisi hari ini juga
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FAQ */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        ❓ Pertanyaan Umum
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">
                                    Berapa komisi yang saya dapatkan?
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Anda mendapatkan komisi 5% dari setiap pembelian yang dilakukan 
                                    oleh orang yang mendaftar melalui link referral Anda.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">
                                    Kapan saya menerima pembayaran komisi?
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Komisi dibayarkan setiap bulan setelah periode konfirmasi 30 hari 
                                    dari transaksi yang berhasil diselesaikan.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">
                                    Apakah ada batasan jumlah referral?
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Tidak ada batasan! Semakin banyak orang yang Anda referral, 
                                    semakin besar potensi penghasilan Anda.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">
                                    Bagaimana cara melacak referral saya?
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Anda bisa melihat semua aktivitas referral dan penghasilan 
                                    melalui dashboard affiliate yang tersedia di akun Anda.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}