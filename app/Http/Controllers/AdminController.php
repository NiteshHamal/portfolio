<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;

class AdminController extends Controller
{
    public function dashboard()
    {
        $projectCount   = Project::count();
        $latestProject  = Project::latest()->first();
        $settingsCount  = Setting::count();
        $latestSetting  = Setting::latest('updated_at')->first();

        $sectionStats = Setting::all()->map(fn($s) => [
            'key'        => $s->key,
            'updated_at' => $s->updated_at?->diffForHumans(),
        ])->keyBy('key');

        return inertia('Admin/Dashboard', [
            'stats' => [
                'project_count'   => $projectCount,
                'settings_count'  => $settingsCount,
                'last_project'    => $latestProject?->updated_at->diffForHumans(),
                'last_setting'    => $latestSetting?->updated_at?->diffForHumans(),
            ],
            'sections' => $sectionStats,
        ]);
    }
}
