@extends('dashboard.base')
@section('title', "新規作成")

@section('content')
<div class="mb-2">
            <h1 class="mb-4  d-flex justify-content-center head-title">新規作成</h1>
            <div class="d-flex justify-content-end h-margin">
                <!-- <span class="ml-auto">受付番号: 0000</span> -->
            </div>
        </div>
        <form id="formCreteFormRequest" class="form-body" action="{{route('admin.request-form.store')}}" method="POST">
            @csrf
            <div class="card border-0 mb-4">
                <div class="card-header form-title">
                    契約者情報
                </div>
                <div class="card-body px-0">
                    <div class="row px-0">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="contractName">契約者名</label>
                                <input type="text" name="contractor_name"  value="{{ old('contractor_name') }}"class="form-control" id="contractName" placeholder="">
                            </div>
                            <div class="text-red value-error" id="contractor_name_error"></div>
                            <div class="form-group form-group-spacing">      
                                <label class="mt-4" for="birthDate">生年月日</label>
                                <input type="text" class="form-control bg-white" id="birthDate" value="{{ old('birthday') }}" name="birthday" placeholder="YYYY/MM/DD">
                            </div>
                            <div class="text-red value-error" id="birthday_error"></div>

                            <div class="form-group form-group-spacing">  
                                <label class="mt-4" for="businessName">業務名</label>
                                <select class="form-control" id="businessName" name="request_type_name">
                                    <option value="" selected {{ old('request_type_name') == '' ? 'selected' : '' }}>--選択--</option>
                                    <option value="1" {{ old('request_type_name') == '1' ? 'selected' : '' }}>解約</option>
                                    <option value="2" {{ old('request_type_name') == '2' ? 'selected' : '' }}>ID集約</option>
                                    <option value="3" {{ old('request_type_name') == '3' ? 'selected' : '' }}>給付金</option>
                                </select>
                            </div>
                            <div class="text-red value-error" id="request_type_name_error"></div>

                        </div>
                    
                        <div class="col-md-2 d-flex align-items-center justify-content-center border-margin">
                            <div style="height: 100%; border-right: 1px solid #ccc;"></div>
                        </div>
                        
                        
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="mobileNumber">携帯電話</label>
                                <input type="text" class="form-control" name="phone" value="{{ old('phone') }}" id="mobileNumber" placeholder="">
                            </div>
                            <div class="text-red value-error" id="phone_error"></div>
                            <div class="form-group form-group-spacing">  
                                <label class="mt-4" for="idNumber">証券番号</label>
                                    <input type="text" class="form-control" value="{{ old('policy_number') }}" name="policy_number" id="idNumber" placeholder="1234567890">
                            </div>
                            <div class="text-red value-error" id="policy_number_error"></div>
                            <div class="form-group form-group-spacing">
                                <label class="mt-4" for="agentNumber">申出受付番号</label>
                                <input type="text" class="form-control" value="{{ old('application_reception_number') }}" name="application_reception_number" id="agentNumber" placeholder="">
                            </div>

                            <div class="text-red value-error" id="application_reception_number_error"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="mt-4" for="contractSelection">契約商品選択</label>
                        <hr class="underline">
                        <x-search-select />
                    </div>

                </div>
            </div>
            <div class="form-group d-flex justify-content-center">
                <a href="{{ route('admin.home') }}" type="button" class="btn btn-secondary mr-2">キャンセル</a>
                <button type="button" id="btnCreteFormRequest" class="btn btn-primary ml-2">確認待ち一覧へ</button>
               
            </div>
        </form>
    @include('dashboard.createNew.modal-confirm')
@endsection

@section('js')
    @vite(['resources/js/dashboard/createNew.js'])
@endsection