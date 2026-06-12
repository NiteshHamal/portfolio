<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class AdminSettingController extends Controller
{
    public function index()
    {
        return inertia('Admin/Settings', [
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    public function update(Request $request, string $key)
    {
        $value = json_decode($request->input('value'), true);

        if ($key === 'about' && $request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = 'profile_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $value['photo'] = '/images/' . $filename;
        }

        if ($key === 'about' && $request->hasFile('cv')) {
            $file = $request->file('cv');
            $filename = $file->getClientOriginalName();
            $file->move(public_path(), $filename);
            $value['cv_url'] = '/' . $filename;
        }

        if ($key === 'seo' && $request->hasFile('og_image')) {
            $file = $request->file('og_image');
            $filename = 'og_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $value['og_image'] = '/images/' . $filename;
        }

        Setting::set($key, $value);

        return back()->with('success', ucfirst($key) . ' settings saved.');
    }
}
