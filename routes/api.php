<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


// Server Site Advertising Route
Route::get('advertising',[App\Http\Controllers\Api\AdvertisingController::class, 'index']);
Route::post('advertising/store',[App\Http\Controllers\Api\AdvertisingController::class, 'store']);
Route::get('advertising/edit/{id}',[App\Http\Controllers\Api\AdvertisingController::class, 'edit']);
Route::get('advertising/show/{id}',[App\Http\Controllers\Api\AdvertisingController::class, 'show']);
Route::put('advertising/update/{id}',[App\Http\Controllers\Api\AdvertisingController::class, 'update']);
Route::delete('advertising/delete/{id}',[App\Http\Controllers\Api\AdvertisingController::class, 'destroy']);