<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Images;

class ImageController extends Controller
{
    // Send all images
    public function index()
    {
        $images = Images::all();

        return $images;
    }

    // Send single image
    public function show($url)
    {
        $url = '/image/' . $url;
        $image = Images::where('url', $url)->first();
        return $image;
    }

    // show image from user
    public function showUserImage($id)
    {
        $images = Images::where('user_id', $id)->get();
        return $images;
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
        if (file_exists(public_path('photos/' . $ImageName))) {
            $ImageName = $name . time() . '.' . $extension;
        }

        $request->image->move(public_path('photos'), $ImageName);

        $path = 'photos/' . $ImageName;
        $randomSuffix = substr(md5(rand()), 0, 7); 
        $url = '/image/' . $randomSuffix;

        $image = Images::create([
            'name' => $ImageName,
            'path' => url($path),
            'url' => $url,
            'user_id' => auth()->user()->id,
        ]);

        return back()->with('success', 'Image uploaded Successfully!');
    }

    // Update Image
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'is_public' => 'required',
        ]);

        $image = Images::find($request->id);
        $image->is_public = $request->is_public;
        $image->save();

        return $image;
    }

    // Delete Image
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $image = Images::find($request->id);

        // delete image from folder with the path
        $path = explode('/', $image->path)[3] . '/' . explode('/', $image->path)[4];
        unlink(public_path($path));

        // delete image from database
        $image->delete();

        return $image;
    }
}