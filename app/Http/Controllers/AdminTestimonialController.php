<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminTestimonialController extends Controller
{
    public function index()
    {
        return inertia('Admin/Testimonials', [
            'testimonials' => Testimonial::orderBy('sort_order')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'role'       => 'nullable|string|max:120',
            'content'    => 'required|string|max:1000',
            'rating'     => 'required|integer|min:1|max:5',
            'sort_order' => 'nullable|integer',
            'active'     => 'nullable|boolean',
            'avatar'     => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        Testimonial::create($data);

        return redirect()->back()->with('success', 'Testimonial added.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'role'       => 'nullable|string|max:120',
            'content'    => 'required|string|max:1000',
            'rating'     => 'required|integer|min:1|max:5',
            'sort_order' => 'nullable|integer',
            'active'     => 'nullable|boolean',
            'avatar'     => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return redirect()->back()->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }
        $testimonial->delete();

        return redirect()->back()->with('success', 'Testimonial deleted.');
    }
}
