@extends('dashboard.base')
@section('title', "確認")

@section('content')
@php
$currentUser = config('global.auth');
@endphp
<div class="mb-2">
    <h1 class="mb-4 d-flex justify-content-center head-title">確認</h1>
    <div class="justify-content-end-display-grid h-margin">
        <p class="ml-auto mb-0 fw-bold">受付番号: {{ $requestForm->request_uid }}</p>
        <p class="mb-0 fw-bold">作成者: {{ $requestForm->status?->admin?->username ?? '' }}</p>
    </div>
</div>
<div class="form-body">
    <div class="card border-0 mb-4">
        <div class="card-header form-title">
            契約者情報
        </div>
        <div class="card-body px-0">
            <div class="row px-0">
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="contractName">契約者名</label>
                        <input type="text" class="form-control bg-white" id="contractName" value="{{ $requestForm->contractor_name }}" disabled>
                    </div>
                    <div class="form-group form-group-spacing">
                        <label for="birthDate">生年月日</label>
                        <input type="text" class="form-control bg-white" id="birthDate" value="{{ $requestForm->birthday }}" disabled>
                    </div>
                    <div class="form-group form-group-spacing">
                        <label for="request_type_name">業務名</label>
                        <input type="text" class="form-control bg-white" id="request_type_name" value="{{ \App\Constants::REQUEST_TYPE[$requestForm->request_type_name] }}" disabled>
                    </div>
                    <div class="form-group">
                        <label for="product_name">商品名</label>
                        <textarea class="form-control bg-white" id="product_name" rows='1' disabled>{{ $requestForm->product->product_name }}</textarea>
                    </div>
                </div>

                <div class="col-md-2 d-flex align-items-center justify-content-center border-margin">
                    <div style="height: 100%; border-right: 1px solid #ccc;"></div>
                </div>

                <div class="col-md-5">
                    <div class="form-group">
                        <label for="mobileNumber">携帯電話</label>
                        <input type="text" class="form-control bg-white" id="mobileNumber" value="{{ $requestForm->phone }}" disabled>
                    </div>
                    <div class="form-group form-group-spacing">
                        <label for="idNumber">証券番号</label>
                        <input type="text" class="form-control bg-white" id="idNumber" value="{{ $requestForm->policy_number}}" disabled>
                    </div>
                    <div class="form-group form-group-spacing">
                        <label for="agentNumber">申出受付番号</label>
                        <input type="text" class="form-control bg-white" id="agentNumber" value="{{ $requestForm->application_reception_number}}" disabled>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="reason_for_return">差戻し理由</label>
            <input type="text" class="form-control bg-white @if($errors->has('reason_for_return')) is-invalid @endif" id="reason_for_return" placeholder="テキストが入ります" @if(!$currentUser['is_admin']) disabled @endif>
            @if($errors->has('reason_for_return'))
                <div class="invalid-feedback">{{ $errors->first('reason_for_return') }}</div>
            @endif
        </div>

    </div>
</div>

@if($currentUser['is_admin'])
<!-- Form submit -->
<div class="form-group d-flex justify-content-center gap-2 mt-5">
    <form action="{{ route('admin.request-form.reject', ['id' => request()->id]) }}" method="POST" onsubmit="return handleReject();">
        @csrf
        <input type="hidden" name="reason_for_return">
        <button type="submit" class="btn btn-danger" @if($acquired) disabled @endif>差戻し</button>
    </form>
    <form id="form-request-form-detail-submit-sms" action="{{ route('admin.request-form.approve', ['id' => request()->id]) }}" method="POST">
        @csrf
        <button type="button" id="request-form-detail-submit-sms" class="btn btn-primary" @if($acquired) disabled @endif>SMS送信</button>
    </form>
</div>
@endif

@include('dashboard.request-form.modal-confirm-submission')
@include('dashboard.request-form.modal-submission-success')
@endsection

@section('js')
    @vite(['resources/js/dashboard/request-form-detail.js'])
    @vite(['resources/js/dashboard/convertDate.js'])
    <script>
        function handleReject(e) {
            document.querySelector('[name="reason_for_return"]').value = document.querySelector('#reason_for_return').value;
            return true;
        }
    </script>
@endsection
