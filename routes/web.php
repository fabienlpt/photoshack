<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Accueil');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/images', function () {
    return Inertia::render('Images');
})->middleware(['auth', 'verified'])->name('images');

Route::get('/image/{url}', function () {
    return Inertia::render('Image');
})->middleware(['auth', 'verified'])->name('image');

Route::controller(ImageController::class)->group(function(){
    Route::post('/api/upload', 'upload')->name('image.store');
    Route::get('/api/images', 'index')->name('image.get');
    Route::get('/api/image/{url}', 'show')->name('image.show');
    Route::get('/api/user/images/{id}', 'showUserImage')->name('image.showUserImage');
});

require __DIR__.'/auth.php';
