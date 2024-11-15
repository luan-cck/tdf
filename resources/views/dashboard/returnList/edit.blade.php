@extends('dashboard.base')
@section('title', "差戻し修正")

@section('content')
@php
$currentUser = config('global.auth');
@endphp
    <div class="mb-2">
        <h1 class="mb-4  d-flex justify-content-center head-title">差戻し修正</h1>
        <div class="justify-content-end-display-grid  h-margin">
            <p class="ml-auto mb-0 fw-bold">受付番号:  {{ $data['request_uid'] }}</p>
            <p class="mb-0 fw-bold">作成者: {{ $data['created_by'] ?? '' }}</p>
        </div>
    </div>
    <form id="formUpdateReturnDetail" class="form-body" action="{{ route('admin.return.update', old('id', $data['id'])) }}" method="POST">
        @csrf
        <div class="card border-0 mb-4">
            <div class="card-header form-title">
                契約者情報
            </div>
            <div class="card-body px-0">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="reasonForReturn">差戻し理由</label>
                            <input type="text" name="reason_for_return" value="{{ old('reason_for_return', $data['reason_for_return']) }}"class="form-control bg-white" id="reasonForReturn" placeholder="" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="contractName">契約者名</label>
                            <input type="text" name="contractor_name" value="{{ old('contractor_name', $data['contractor_name']) }}" class="form-control bg-white" id="contractName" placeholder="" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>
                        <div class="text-red value-error" id="contractor_name_error"></div>
                        <div class="form-group">
                            <label class="mt-4" for="birthDate">生年月日</label>
                            <input type="text" class="form-control bg-white" id="birthDate" value="{{ old('birthday', $data['birthday']) }}" name="birthday" placeholder="YYYY/MM/DD" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>
                        <div class="text-red value-error" id="birthday_error"></div>

                        <div class="form-group">
                            <label class="mt-4" for="businessName">業務名</label>
                            <select class="form-control bg-white" id="businessName" name="request_type_name" @if(!$currentUser['is_admin']) disabled @endif>
                                <option {{ old('request_type_name') == '' ? 'selected' : '' }}>--選択--</option>
                                <option value="1" {{ old('request_type_name', $data['request_type_name']) == '1' ? 'selected' : '' }}>解約</option>
                                <option value="2" {{ old('request_type_name', $data['request_type_name']) == '2' ? 'selected' : '' }}>ID集約</option>
                                <option value="3" {{ old('request_type_name', $data['request_type_name']) == '3' ? 'selected' : '' }}>給付金</option>
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
                            <input type="text" class="form-control bg-white" name="phone" value="{{ old('phone', $data['phone']) }}" id="mobileNumber" placeholder="" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>
                        <div class="text-red value-error" id="phone_error"></div>
                        <div class="form-group">
                            <label class="mt-4" for="idNumber">証券番号</label>
                            <input type="text" class="form-control bg-white" value="{{ old('policy_number', $data['policy_number']) }}" name="policy_number" id="idNumber" placeholder="1234567890" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>
                        <div class="text-red value-error" id="policy_number_error"></div>
                        <div class="form-group">
                            <label class="mt-4" for="agentNumber">申出受付番号</label>
                            <input type="text" class="form-control bg-white" value="{{ old('application_reception_number', $data['application_reception_number']) }}" name="application_reception_number" id="agentNumber" placeholder="" @if(!$currentUser['is_admin']) disabled @endif>
                        </div>

                        <div class="text-red value-error" id="application_reception_number_error"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="mt-4" for="contractSelection">契約商品選択</label>
                    <hr class="underline">
                    <x-search-select selectedValue="{{ old('product_id', $data['product_id']) }}" />
                </div>

            </div>
        </div>
        <div class="form-group d-flex justify-content-center">
            <button type="button" id="btnCancelReturnDetail" class="btn bg-color-3F494E mr-2">キャンセル</button>
            @if($currentUser['is_admin'])
            <button type="button" id="btnUpdateReturnDetail" class="btn bg-color-1BC4F8 ml-2">確認待ち一覧へ</button>
            @endif
        </div>

        <div class="form-group">
            <hr class="underline">
        </div>

        <div class="row">
            <div class="col-md-6 table-center">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th class="text-start border-none"> 作業日 </th>
                        <th class="text-center border-none"> 名前 </th>
                        <th class="text-end border-none"> ステータス </th>
                    </tr>
                    </thead>
                    <tbody>
                    @if(isset($historyData))
                        @foreach($historyData as $item)
                            <tr>
                                <td class="text-start border-none">{{ date('Y-m-d H:i', strtotime($item['confirm_date'])) }}</td>
                                <td class="text-center border-none">{{ $item["name"] }}</td>
                                <td class="text-end border-none">{{  \App\Constants::STATUS[$item['status']] }}</td>
                            </tr>
                        @endforeach
                    @endif
                    </tbody>
                </table>
            </div>
        </div>
    </form>
    @include('dashboard.returnList.modal-edit-return-success')
@endsection

@section('js')
    @vite(['resources/js/returnList/edit.js'])
    <!-- @vite(['resources/js/dashboard/convertDate.js']) -->
@endsection
