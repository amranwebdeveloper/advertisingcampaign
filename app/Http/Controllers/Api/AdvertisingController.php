<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Advertising;

class AdvertisingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data=Advertising::paginate(5); // this data will show as pagination
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile('banner_images')){
            foreach($request->file('banner_images') as $image)
            {
                
                $name=$image->getClientOriginalName();
                $image->move(public_path().'/advertising/', $name);
                $data[] = $name;
            }
//            $image=$request->file('banner_images');
//            $reImage=time().'.'.$image->getClientOriginalExtension();
//            $destination=public_path('/advertising');
//            $image->move($destination,$reImage);
        }else{
            $name='na';
        }
        $advertising=new Advertising;
        $advertising->name=$request->advertising_name;
        $advertising->valid_from=$request->valid_from;
        $advertising->valid_to=$request->valid_to;
        $advertising->daily_budget=$request->daily_budget;
        $advertising->total_budget=$request->total_budget;
        $advertising->banner_images=json_encode($data); //$reImage;
        $advertising->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $advertising=Advertising::find($id);
        return $advertising;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $advertising=Advertising::find($id);
        return $advertising;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $image=[];
        if($request->hasFile('banner_images')){
            foreach($request->file('banner_images') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->move(public_path().'/advertising/', $name);
                $data[] = $name;
            }
//            $image=$request->file('banner_images');
//            $reImage=time().'.'.$image->getClientOriginalExtension();
//            $destination=public_path('/advertising');
//            $image->move($destination,$reImage);
        }else{
            $name='na';
        }

        $advertising=Advertising::find($id);
        $advertising->name=$request->advertising_name;
        $advertising->valid_from=$request->valid_from;
        $advertising->valid_to=$request->valid_to;
        $advertising->daily_budget=$request->daily_budget;
        $advertising->total_budget=$request->total_budget;
        $advertising->banner_images=json_encode($data); //$reImage;
        $advertising->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Advertising::where('id',$id)->delete();
    }
}
