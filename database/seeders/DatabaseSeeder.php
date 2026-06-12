<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(['email' => 'nitesh@admin.com'], [
            'name' => 'Nitesh Hamal',
            'email' => 'nitesh@admin.com',
            'password' => Hash::make('admin123'),
        ]);

        $projects = [
            ['title' => 'KothaSathi',           'tech' => 'Laravel / Web App',  'tag' => 'webapp',  'image' => '/images/KothaSathi.png',          'sort_order' => 6],
            ['title' => 'EventSathi',            'tech' => 'Laravel / Web App',  'tag' => 'webapp',  'image' => '/images/EventSathi.png',           'sort_order' => 5],
            ['title' => 'Chandramarket',         'tech' => 'Laravel / Backend',  'tag' => 'backend', 'image' => '/images/Chandramarket.png',        'sort_order' => 4],
            ['title' => 'Taxi Booking System',   'tech' => 'Python',             'tag' => 'app',     'image' => '/images/TaxiBookingSystem.png',    'sort_order' => 3],
            ['title' => 'Om Kalapataru Carriers','tech' => 'Laravel / Web',      'tag' => 'website', 'image' => '/images/OmKalapataru.png',         'sort_order' => 2],
            ['title' => 'Hotel Booking System',  'tech' => 'Java',               'tag' => 'app',     'image' => '/images/HotelBookingSystem.png',   'sort_order' => 1],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(['title' => $project['title']], $project);
        }

        $defaults = [
            'hero' => [
                'name'           => 'Nitesh Hamal',
                'tagline'        => 'Welcome to my portfolio',
                'description'    => 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.',
                'typed_strings'  => ['Backend Developer', 'Laravel Developer', 'Full Stack Developer', 'Freelancer'],
                'github'         => 'https://github.com/NiteshHamal',
                'linkedin'       => 'https://www.linkedin.com/in/nitesh-hamal-b1b930229/',
                'youtube'        => 'https://www.youtube.com/channel/UC6teTjr129BuyQLG-OQL-gg',
            ],
            'about' => [
                'subtitle'  => 'Web & Backend Developer',
                'bio1'      => "I'm Nitesh Hamal, a web & backend developer driven by a passion for crafting efficient and reliable software.",
                'bio2'      => 'With a knack for problem-solving and a love for coding, I excel in creating scalable APIs and optimizing databases. My commitment to clean code ensures easy maintenance and scalability.',
                'photo'     => '/images/niteshhamal.png',
                'cv_url'    => '/Nitesh-Hamal-CV.pdf',
                'birthday'  => '20 April 2003',
                'age'       => '23',
                'website'   => 'niteshhamal.com.np',
                'degree'    => 'Bachelor',
                'phone'     => '+977 9813371345',
                'email'     => 'nitesh0hamal@gmail.com',
                'city'      => 'Kathmandu, Nepal',
                'freelance' => 'Available',
            ],
            'skills' => [
                ['name' => 'HTML / CSS / JavaScript', 'val' => 80],
                ['name' => 'Laravel',                 'val' => 90],
                ['name' => 'MySQL / PostgreSQL',      'val' => 85],
                ['name' => 'REST API / JSON',         'val' => 80],
                ['name' => 'Python',                  'val' => 40],
                ['name' => 'Java',                    'val' => 40],
                ['name' => 'Bootstrap',               'val' => 80],
                ['name' => 'Git & GitHub',            'val' => 80],
                ['name' => 'Flutter',                 'val' => 70],
            ],
            'stats' => [
                ['icon' => 'bi-journal-richtext', 'value' => 10, 'label' => 'Projects'],
                ['icon' => 'bi-emoji-smile',      'value' => 7,  'label' => 'Happy Clients'],
                ['icon' => 'bi-clock',            'value' => 3,  'label' => 'Years Exp.'],
            ],
            'resume' => [
                'education' => [
                    ['title' => 'BSc Computer Science & Software Engineering', 'period' => '2021 – Present', 'place' => 'University of Bedfordshire'],
                    ['title' => '+2 Science (Higher Secondary)',               'period' => '2019 – 2021',    'place' => "St. Xavier's School, Deonia"],
                    ['title' => 'High School (SEE)',                           'period' => '2017 – 2019',    'place' => 'Amity Education Foundation'],
                ],
                'experience' => [
                    [
                        'title'  => 'Freelance Developer',
                        'period' => '2022 – Present',
                        'place'  => 'Self-employed, Remote',
                        'points' => [
                            'Developed and maintained web applications using Laravel, Java, and Python.',
                            'Conducted requirement analysis, system design, coding, testing, and documentation.',
                            'Implemented custom functionality and features based on client requirements.',
                        ],
                    ],
                ],
            ],
            'services' => [
                ['icon' => 'bi-window-fullscreen', 'title' => 'Website Development',  'desc' => 'I build visually appealing, responsive websites using HTML, CSS, JavaScript, Bootstrap, and modern frontend frameworks.'],
                ['icon' => 'bi-server',            'title' => 'Backend Development',  'desc' => 'I harness the power of Laravel to create robust backend solutions — REST APIs, authentication, queues, and more.'],
                ['icon' => 'bi-phone',             'title' => 'Android Development',  'desc' => 'I leverage Flutter to deliver seamless and dynamic cross-platform mobile applications for Android.'],
            ],
            'seo' => [
                'title'       => 'Nitesh Hamal — Backend Developer from Nepal',
                'description' => 'Crafting efficient, scalable web applications with clean code and modern technologies. Laravel developer and full-stack web developer based in Kathmandu, Nepal.',
                'og_image'    => null,
            ],
            'contact' => [
                'address'   => 'New Baneshwor, Kathmandu, Nepal',
                'email'     => 'nitesh0hamal@gmail.com',
                'phone'     => '+977 9813371345',
                'github'    => 'https://github.com/NiteshHamal',
                'facebook'  => 'https://www.facebook.com/nitesh.ham',
                'instagram' => 'https://www.instagram.com/niteshhamal/?hl=en',
                'youtube'   => 'https://www.youtube.com/channel/UC6teTjr129BuyQLG-OQL-gg',
                'linkedin'  => 'https://www.linkedin.com/in/nitesh-hamal-b1b930229/',
            ],
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
