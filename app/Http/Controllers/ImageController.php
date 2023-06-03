<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Show Image
    public function show($url)
    {
        return view('image', compact('url'));
    }
    
    // Store Image
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        $ImageName = $request->file('image')->getClientOriginalName();

        $name = explode('.', $ImageName)[0];
        $extension = explode('.', $ImageName)[1];

        // check if file exists in folder
        if (file_exists(public_path('images/' . $ImageName))) {
            $ImageName = $name . time() . '.' . $extension;
        }

        $path = $request->image->move(public_path('images'), $ImageName);

        return back()->with('success', 'Image uploaded Successfully!');
    }
}