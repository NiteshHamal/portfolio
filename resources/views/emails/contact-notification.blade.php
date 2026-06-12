<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>New Message: {{ $message->subject }}</title>
<style>
    body { margin:0; padding:0; background:#0a0a0a; font-family:'Helvetica Neue',Arial,sans-serif; color:#e5e5e5; }
    .wrap { max-width:560px; margin:40px auto; background:#111; border:1px solid #222; border-radius:12px; overflow:hidden; }
    .header { background:#18d26e; padding:28px 32px; }
    .header h1 { margin:0; font-size:22px; font-weight:700; color:#fff; letter-spacing:-0.3px; }
    .header p  { margin:4px 0 0; font-size:13px; color:rgba(255,255,255,0.75); }
    .body   { padding:32px; }
    .label  { font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#18d26e; margin-bottom:4px; }
    .value  { font-size:15px; color:#e5e5e5; margin-bottom:24px; line-height:1.5; }
    .message-box { background:#0d0d0d; border:1px solid #222; border-left:3px solid #18d26e; border-radius:8px; padding:16px 20px; }
    .message-box .value { margin-bottom:0; white-space:pre-wrap; }
    .actions { padding:0 32px 32px; }
    .btn { display:inline-block; background:#18d26e; color:#fff; text-decoration:none; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; }
    .footer { border-top:1px solid #1e1e1e; padding:20px 32px; font-size:12px; color:#555; }
    .footer a { color:#18d26e; text-decoration:none; }
</style>
</head>
<body>
<div class="wrap">

    <div class="header">
        <h1>New Contact Message</h1>
        <p>Received via your portfolio contact form</p>
    </div>

    <div class="body">
        <div class="label">From</div>
        <div class="value">{{ $message->name }} &lt;{{ $message->email }}&gt;</div>

        <div class="label">Subject</div>
        <div class="value">{{ $message->subject }}</div>

        <div class="label">Message</div>
        <div class="message-box">
            <div class="value">{{ $message->message }}</div>
        </div>
    </div>

    <div class="actions">
        <a href="mailto:{{ $message->email }}?subject=Re: {{ rawurlencode($message->subject) }}" class="btn">
            Reply to {{ $message->name }}
        </a>
    </div>

    <div class="footer">
        Sent from <a href="{{ config('app.url') }}">{{ config('app.name') }}</a> &middot;
        <a href="{{ config('app.url') }}/admin/messages">View in Admin Inbox</a>
    </div>

</div>
</body>
</html>
