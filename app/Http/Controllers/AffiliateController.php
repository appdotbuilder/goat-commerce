<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\AffiliateReferral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    /**
     * Display the affiliate dashboard.
     */
    public function index()
    {
        $affiliate = Auth::user()->affiliate;

        if (!$affiliate) {
            return Inertia::render('affiliate/join');
        }

        $referrals = $affiliate->referrals()
            ->with(['referredUser', 'order'])
            ->latest()
            ->paginate(10);

        $stats = [
            'total_referrals' => $affiliate->referrals()->count(),
            'total_conversions' => $affiliate->referrals()->whereNotNull('order_id')->count(),
            'conversion_rate' => $affiliate->referrals()->count() > 0 
                ? round(($affiliate->referrals()->whereNotNull('order_id')->count() / $affiliate->referrals()->count()) * 100, 2)
                : 0,
        ];

        return Inertia::render('affiliate/dashboard', [
            'affiliate' => $affiliate,
            'referrals' => $referrals,
            'stats' => $stats,
        ]);
    }

    /**
     * Join the affiliate program.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->affiliate) {
            return back()->with('error', 'You are already an affiliate.');
        }

        $affiliate = Affiliate::create([
            'user_id' => $user->id,
            'code' => Affiliate::generateCode($user->name),
            'commission_rate' => 5.00, // 5% commission
        ]);

        return redirect()->route('affiliate.index')->with('success', 'Welcome to our affiliate program!');
    }

    /**
     * Display the affiliate registration page with referral code.
     */
    public function show(string $code)
    {
        $affiliate = Affiliate::where('code', $code)->active()->first();

        if (!$affiliate) {
            return redirect()->route('welcome')->with('error', 'Invalid affiliate code.');
        }

        // Store affiliate code in session for registration
        session(['affiliate_code' => $code]);

        return redirect()->route('register')->with('info', 'Join through ' . $affiliate->user->name . ' and get special benefits!');
    }
}