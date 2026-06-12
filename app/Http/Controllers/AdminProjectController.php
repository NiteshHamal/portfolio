<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class AdminProjectController extends Controller
{
    public function index()
    {
        return inertia('Admin/Projects', [
            'projects' => Project::orderByDesc('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'tech'  => 'required|string|max:255',
            'tag'   => 'required|string|max:50',
            'image' => 'required|image|max:4096',
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('images'), $filename);

        Project::create([
            'title'      => $data['title'],
            'tech'       => $data['tech'],
            'tag'        => $data['tag'],
            'image'      => '/images/' . $filename,
            'sort_order' => (Project::max('sort_order') ?? 0) + 1,
        ]);

        return back()->with('success', 'Project added.');
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'tech'  => 'required|string|max:255',
            'tag'   => 'required|string|max:50',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } else {
            unset($data['image']);
        }

        $project->update($data);

        return back()->with('success', 'Project updated.');
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids', []);
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
}
