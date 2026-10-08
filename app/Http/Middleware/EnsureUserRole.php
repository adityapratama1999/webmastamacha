<?php
namespace app\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole{
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (auth()->check() && auth()->user()->role === $role) {
            return $next($request);
        }
        return abort(403,'Anda Tidak Memiliki Izin');
    }
}