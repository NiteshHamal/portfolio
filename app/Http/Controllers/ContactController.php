<?php

namespace App\Http\Controllers;

use App\Mail\NewContactMessage;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $msg = ContactMessage::create($request->only('name', 'email', 'subject', 'message'));

        $adminEmail = config('mail.admin_email');
        if ($adminEmail) {
            try {
                Mail::to($adminEmail)->send(new NewContactMessage($msg));
            } catch (\Throwable $e) {
                // Never fail the user-facing response over a notification email
                Log::error('Contact notification email failed: ' . $e->getMessage());
            }
        }

        return back()->with('success', "Thanks {$request->name}! I'll get back to you soon.");
    }
}
