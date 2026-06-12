<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProjectController;
use App\Http\Controllers\AdminSettingController;
use App\Http\Controllers\Auth\LoginController;
use App\Models\Project;
use App\Models\Setting;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home', [
        'projects' => Project::orderByDesc('sort_order')->get(),
        'settings' => Setting::all()->pluck('value', 'key'),
    ]);
});

// Auth
Route::get('/admin/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/admin/login', [LoginController::class, 'login']);
Route::post('/admin/logout', [LoginController::class, 'logout'])->name('logout');

// Admin — protected
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard']);
    Route::get('/projects', [AdminProjectController::class, 'index']);
    Route::post('/projects/reorder', [AdminProjectController::class, 'reorder']);
    Route::post('/projects', [AdminProjectController::class, 'store']);
    Route::post('/projects/{project}', [AdminProjectController::class, 'update']);
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy']);

    Route::get('/settings', [AdminSettingController::class, 'index']);
    Route::post('/settings/{key}', [AdminSettingController::class, 'update']);
});
