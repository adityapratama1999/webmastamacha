<?php

namespace Database\Seeders;

use App\Models\RawMaterial;
use Illuminate\Database\Seeder;

class RawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        // Seed raw materials
        RawMaterial::create([
        'Name_Material'=>'Matcha Ori',
        'Stock'=>800,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Matcha Almond',
        'Stock'=>800,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Matcha Jasmine',
        'Stock'=>800,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Matcha Vanilla',
        'Stock'=>800,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Matcha Pure',
        'Stock'=>800,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Foam Sea Salt',
        'Stock'=>500,
        'Unit'=>'gram',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Plastic Bag',
        'Stock'=>500,
        'Unit'=>'pcs',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'14oz cup',
        'Stock'=>500,
        'Unit'=>'cup',
        'Minim_stock'=>100,
    ]);
        RawMaterial::create([
        'Name_Material'=>'Milk OatSide Barista Blend',
        'Stock'=>6000,
        'Unit'=>'gram',
        'Minim_stock'=>1000,
    ]);
    }
}