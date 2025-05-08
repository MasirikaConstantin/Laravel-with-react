<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $translations = [];
        $locale =  app()->getLocale();
        $path = lang_path("{$locale}.json");
        //dd($path);
        try {
            if (file_exists($path)) {
                $translations = json_decode(file_get_contents($path), true) ?? [];
            }
        } catch (\Exception $e) {
            report($e);
        }
    
        return array_merge(parent::share($request), [
            'auth' => ['user' => $request->user()],
            'translations' => $translations,
        ]);
    }
}
