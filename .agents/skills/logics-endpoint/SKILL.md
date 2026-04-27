---
name: logics-endpoint
description: Guide for creating API endpoints and routing using Logics
globs: routes/**/*.php, app/Http/Controllers/**/*.php, config/actions.php
---

### AI Agent Skills Guide: API Endpoints and Routing

This guide explains how to define API endpoints, set up routing, and link them to the appropriate `Logic` classes.

#### 1. Endpoint Mapping to Logics
Depending on the HTTP method and the desired action, you must use one of the specialized `Logic` classes and its corresponding skill:

- **GET (List)**: Use `IndexLogic`. Use the `logics-index` skill.
- **GET (Single Record)**: Use `ShowLogic`. Use the `logics-show` skill.
- **POST (Create)**: Use `StoreLogic`. Use the `logics-store` skill.
- **PUT (Update)**: Use `UpdateLogic`. Use the `logics-update` skill.
- **DELETE (Remove)**: Use `DeleteLogic`. Use the `logics-delete` skill.

#### 2. Routing Structure
Routes should be organized into modules to maintain a clean `routes/api.php` file.

**Example: `routes/api.php`**
```php
<?php

use Illuminate\Support\Facades\Route;

// General prefix for auth or other global modules
Route::prefix('')->group(base_path('routes/modules/auth.php'));

// Grouped by middleware (e.g., auth)
Route::middleware('auth:authxolote')->group(function () {
    // Nested prefixes for specific business logic
    Route::prefix('businesses/{id}/wallets')->group(base_path('/routes/modules/wallet.php'));
    Route::prefix('businesses/{id}/coupons')->group(base_path('/routes/modules/coupon.php'));
});
```

**Example: `routes/modules/coupon.php`**
```php
<?php

use App\Http\Controllers\V1\Coupon\CouponController;
use Illuminate\Support\Facades\Route;

Route::controller(CouponController::class)->group(function () {
    Route::get('', 'index')
        ->middleware('isAllow:rewards.coupons.index');
    
    Route::post('', 'store')
        ->middleware('isAllow:rewards.coupons.store');

    Route::get('{id}', 'show')
        ->middleware('isAllow:rewards.coupons.show');

    Route::put('{id}', 'update')
        ->middleware('isAllow:rewards.coupons.update');

    Route::delete('{id}', 'destroy')
        ->middleware('isAllow:rewards.coupons.destroy');
});
```

#### 3. Mandatory Middleware: `isAllow`
Every route must use the `isAllow` middleware to handle permissions. The format for the permission string is usually `module.submodule.action`.

#### 4. Permission Registration in `config/actions.php`
All permissions used in the `isAllow` middleware must be registered in the `config/actions.php` file, assigned to specific roles.

**Example: `config/actions.php`**
```php
<?php

return [
    'roles' => [
        'admin' => [
            // Admin usually has all permissions
        ],
        'customer' => [
            'rewards.coupons.index',
            'rewards.coupons.show',
            'rewards.wallets.index',
        ],
    ],
];
```

#### 5. Controller Implementation
The controller acts as a bridge, injecting the required `Data` object and `Logic` class.

```php
class CouponController extends Controller
{
    public function index(CouponIndexData $data, CouponIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(CouponStoreData $data, CouponStoreLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}

#### 6. Testing Requirements
Whenever you create a new endpoint, you MUST create a corresponding feature test to verify its behavior.

**Test Location:**
Tests should be stored in the following directory structure:
`tests/Feature/{Model}/{ModelLogicType}Test.php`

**Example:**
- `tests/Feature/Coupon/CouponIndexTest.php`
- `tests/Feature/Coupon/CouponStoreTest.php`

**Helpers and Authentication:**
Review your project's `tests/TestCase.php` to discover available helper methods. For example, you might find methods like `loginAdmin()` or `loginUser()` to quickly authenticate during tests.

```php
    public function test_admin_can_list_coupons()
    {
        $this->loginAdmin(); // Helper method from TestCase
        
        $response = $this->getJson('/api/v1/coupons');
        
        $response->assertStatus(200);
    }
}
```
