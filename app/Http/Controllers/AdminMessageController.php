<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;

class AdminMessageController extends Controller
{
    public function index()
    {
        return inertia('Admin/Messages', [
            'messages' => ContactMessage::latest()->get()->map(fn($m) => [
                'id'         => $m->id,
                'name'       => $m->name,
                'email'      => $m->email,
                'subject'    => $m->subject,
                'message'    => $m->message,
                'read_at'    => $m->read_at,
                'created_at' => $m->created_at->diffForHumans(),
            ]),
            'unread' => ContactMessage::whereNull('read_at')->count(),
        ]);
    }

    public function markRead(ContactMessage $message)
    {
        if (! $message->read_at) {
            $message->update(['read_at' => now()]);
        }
        return back();
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return back()->with('success', 'Message deleted.');
    }
}
