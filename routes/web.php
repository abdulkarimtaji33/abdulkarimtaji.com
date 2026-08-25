<?php

use Illuminate\Support\Facades\Route;

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
    return redirect('/software-and-web-development');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/software-and-web-development', [App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolio');

// Local-only review surface for the 3D game prototypes — not linked from the
// live site nav/sitemap; noindexed in the view itself.
Route::get('/playground', [App\Http\Controllers\PlaygroundController::class, 'index'])->name('playground');
