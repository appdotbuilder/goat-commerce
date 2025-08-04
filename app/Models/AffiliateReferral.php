<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AffiliateReferral
 *
 * @property int $id
 * @property int $affiliate_id
 * @property int $referred_user_id
 * @property int|null $order_id
 * @property float $commission_amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $converted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Affiliate $affiliate
 * @property-read \App\Models\User $referredUser
 * @property-read \App\Models\Order|null $order
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateReferral newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateReferral newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateReferral query()

 * 
 * @mixin \Eloquent
 */
class AffiliateReferral extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'affiliate_id',
        'referred_user_id',
        'order_id',
        'commission_amount',
        'status',
        'converted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'commission_amount' => 'decimal:2',
        'converted_at' => 'datetime',
    ];

    /**
     * Get the affiliate that owns the referral.
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get the referred user.
     */
    public function referredUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referred_user_id');
    }

    /**
     * Get the order that generated the commission.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}