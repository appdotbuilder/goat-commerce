import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Share2, TrendingUp, Users, DollarSign } from 'lucide-react';

interface Affiliate {
    id: number;
    code: string;
    commission_rate: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
}

interface Referral {
    id: number;
    commission_amount: number;
    status: string;
    converted_at?: string;
    created_at: string;
    referred_user: {
        name: string;
        email: string;
    };
    order?: {
        order_number: string;
        total_amount: number;
    };
}

interface Stats {
    total_referrals: number;
    total_conversions: number;
    conversion_rate: number;
}

interface Props {
    affiliate: Affiliate;
    referrals: {
        data: Referral[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        meta: {
            last_page: number;
        };
    };
    stats: Stats;
    [key: string]: unknown;
}

export default function AffiliateDashboard({ affiliate, referrals, stats }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const referralUrl = `${window.location.origin}/ref/${affiliate.code}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralUrl);
        alert('Link referral berhasil disalin!');
    };

    const shareReferralLink = () => {
        if (navigator.share) {
            navigator.share({
                title: 'GoatMart - Jual Beli Kambing',
                text: 'Bergabung dengan GoatMart dan dapatkan kambing berkualitas!',
                url: referralUrl,
            });
        } else {
            copyToClipboard();
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">💰 Dashboard Affiliate</h1>
                    <p className="text-gray-600">
                        Kelola program affiliate Anda dan lihat penghasilan dari referral
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Penghasilan</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatPrice(affiliate.total_earnings)}
                                    </p>
                                </div>
                                <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {formatPrice(affiliate.pending_earnings)}
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Referral</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.total_referrals}
                                    </p>
                                </div>
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Conversion Rate</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {stats.conversion_rate}%
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Referral Tools */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>🔗 Link Referral Anda</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Kode Referral
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={affiliate.code}
                                            readOnly
                                            className="font-mono"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyToClipboard}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Link Referral
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={referralUrl}
                                            readOnly
                                            className="text-xs"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyToClipboard}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={shareReferralLink}
                                >
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Bagikan Link
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Komisi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        {affiliate.commission_rate}%
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Komisi dari setiap pembelian yang dilakukan oleh referral Anda
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Referral History */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>📋 Riwayat Referral</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {referrals.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {referrals.data.map((referral) => (
                                            <div
                                                key={referral.id}
                                                className="border rounded-lg p-4 hover:bg-gray-50"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="font-medium">
                                                            {referral.referred_user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {referral.referred_user.email}
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            referral.status === 'paid'
                                                                ? 'default'
                                                                : referral.status === 'approved'
                                                                ? 'secondary'
                                                                : 'outline'
                                                        }
                                                    >
                                                        {referral.status === 'paid'
                                                            ? '✅ Dibayar'
                                                            : referral.status === 'approved'
                                                            ? '⏳ Disetujui'
                                                            : '🔄 Pending'}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="text-gray-600">
                                                        Bergabung: {new Date(referral.created_at).toLocaleDateString('id-ID')}
                                                        {referral.converted_at && (
                                                            <> • Konversi: {new Date(referral.converted_at).toLocaleDateString('id-ID')}</>
                                                        )}
                                                    </div>
                                                    <div className="font-medium text-green-600">
                                                        {formatPrice(referral.commission_amount)}
                                                    </div>
                                                </div>

                                                {referral.order && (
                                                    <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                                                        💰 Order: {referral.order.order_number} - {formatPrice(referral.order.total_amount)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">👥</div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Belum ada referral
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Mulai bagikan link referral Anda untuk mendapatkan komisi
                                        </p>
                                        <Button onClick={shareReferralLink}>
                                            <Share2 className="h-4 w-4 mr-2" />
                                            Bagikan Sekarang
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}