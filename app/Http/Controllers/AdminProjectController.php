<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminProjectController extends Controller
{
    public function index()
    {
        return inertia('Admin/Projects', [
            'projects' => Project::orderByDesc('sort_order')->get(),
        ]);
    }

    public function show(Project $project)
    {
        return inertia('Project', [
            'project'  => $project,
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'tech'        => 'required|string|max:255',
            'tag'         => 'required|string|max:50',
            'image'       => 'required|image|max:4096',
            'description' => 'nullable|string',
            'github_url'  => 'nullable|url|max:500',
            'demo_url'    => 'nullable|url|max:500',
            'featured'    => 'nullable|boolean',
        ]);

        $file     = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('images'), $filename);

        Project::create([
            'title'       => $data['title'],
            'slug'        => $this->uniqueSlug($data['title']),
            'tech'        => $data['tech'],
            'tag'         => $data['tag'],
            'image'       => '/images/' . $filename,
            'description' => $data['description'] ?? null,
            'github_url'  => $data['github_url']  ?? null,
            'demo_url'    => $data['demo_url']    ?? null,
            'featured'    => $request->boolean('featured'),
            'sort_order'  => (Project::max('sort_order') ?? 0) + 1,
        ]);

        return back()->with('success', 'Project added.');
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'tech'        => 'required|string|max:255',
            'tag'         => 'required|string|max:50',
            'image'       => 'nullable|image|max:4096',
            'description' => 'nullable|string',
            'github_url'  => 'nullable|url|max:500',
            'demo_url'    => 'nullable|url|max:500',
            'featured'    => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            $file     = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } else {
            unset($data['image']);
        }

        // Regenerate slug only if title changed
        if ($data['title'] !== $project->title) {
            $data['slug'] = $this->uniqueSlug($data['title'], $project->id);
        }

        $data['featured'] = $request->boolean('featured');

        $project->update($data);

        return back()->with('success', 'Project updated.');
    }

    public function reorder(Request $request)
    {
        $ids   = $request->input('ids', []);
        $total = count($ids);
        foreach ($ids as $position => $id) {
            Project::where('id', $id)->update(['sort_order' => $total - $position]);
        }
        return back();
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return back()->with('success', 'Project deleted.');
    }

    private function uniqueSlug(string $title, ?int $excludeId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i    = 1;
        while (Project::where('slug', $slug)->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))->exists()) {
            $slug = $base . '-' . $i++;
        }
        return $slug;
    }
}
