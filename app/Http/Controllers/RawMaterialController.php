<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use Inertia\Inertia;
use Google\Client;
use Google\Service\Sheets;
use Illuminate\Http\Request;
class RawMaterialController extends Controller
{
    public function syncData(Request $request)
    {
        try{
        $client = new Client();
        $client->setAuthConfig(storage_path('app/credentials.json'));
        $client->addScope('https://www.googleapis.com/auth/spreadsheets.readonly');

        $service = new Sheets($client);
        $spreadsheetId = env('MASTAMATCHA_Spreadseet_Id');
        $range = 'Sheet1!A2:E500';
        $response = $service->spreadsheets_values->get($spreadsheetId, $range);
        $values = $response->getValues();
        //dd($values);
        if (empty($values)) {
            return "Data Tidak Ditemukan.";
        }
        $sheetMaterialName = [];
        foreach ($values as $row) {
            if (!isset($row[1])||trim($row[1])==='') {
                continue;
            }
            $namaBahan = trim($row[1]);
            $sheetMaterialName[] = $namaBahan;
            $material = RawMaterial::firstOrNew(['Name_Material' => $namaBahan]);
            $material->Name_Material = $row[1] ?? null;
            $material->Stock = (float) ($row[2] ?? 0);
            $material->Unit = $row[3] ?? null;
            $material->Minim_Stock = (float) ($row[4] ?? 0);
            $material->save();
        }
        if (!empty($sheetMaterialName))
            RawMaterial::whereNotIn('Name_Material', $sheetMaterialName)->delete();
        } catch (\Exception $e) {
            \Log::error("Sync Error: ".$e->getMessage());
        }
    }

    public function index()
    {
        $this->syncData(new Request());
        $stokBahan = RawMaterial::all()->map(function($item){
            // Normalize field names and determine status/theme
            $minStock = $item->Minim_Stock ?? $item->Minim_stock ?? 0;
            if ($item->Stock <= $minStock) {
                $status = 'Kritis';
                $theme = 'red';
            } elseif ($item->Stock <= 300) {
                $status = 'Warning/Harap Melakukan Pembelian Bahan Baku';
                $theme = 'yellow';
            } else {
                $status = 'aman';
                $theme = 'emerald';
            }
            return [
                'id' => $item->id,
                'name' => $item->Name_Material,
                'stock' => $item->Stock,
                'unit' => $item->Unit,
                'minim_stock' => $minStock,
                'status' => $status,
                'theme' => $theme,
            ];
        });
        
        return Inertia::render('Dashboard', ['stokBahan' => $stokBahan]);
    }
}