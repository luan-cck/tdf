@extends('dashboard.base')
@section('title', "SMS送信済")

@section('content')
    <div class="mb-2">
        <h1 class="mb-4  d-flex justify-content-center head-title">SMS送信済</h1>
        <div class="justify-content-end-display-grid  h-margin">
            <p class="ml-auto mb-0 fw-bold">受付番号:  {{ $data['request_uid'] }}</p>
            <p class="mb-0 fw-bold">作成者: {{ $data['created_by'] ?? '' }}</p>
        </div>
    </div>
    <div class="form-body">
        <div class="card border-0 mb-4">
            <div class="card-header form-title">
                契約者情報
            </div>
            <div class="card-body px-0">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="contractName">契約者名</label>
                            <input type="text" name="contractor_name" class="form-control bg-white " id="contractName" value="{{ $data['contractor_name'] }}" disabled>
                        </div>

                        <div class="form-group">
                            <label class="mt-4" for="birthDate">生年月日</label>
                            <input type="text" class="form-control bg-white " id="birthDate" name="birthday" value="{{ $data['birthday'] }}" disabled>
                        </div>

                        <div class="form-group">
                            <label class="mt-4" for="request_type_name">業務名</label>
                            <input type="text" name="request_type_name" class="form-control bg-white " id="request_type_name" value="{{ \App\Constants::REQUEST_TYPE[$data['request_type_name']] }}" disabled>
                        </div>

                        <div class="form-group">
                            <label for="product_name">商品名</label>
                            <textarea class="form-control bg-white" id="product_name" rows='1' disabled>{{ $data['product_name'] }}</textarea>
                        </div>
                    </div>

                    <div class="col-md-2 d-flex align-items-center justify-content-center border-margin">
                        <div style="height: 100%; border-right: 1px solid #ccc;"></div>
                    </div>

                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="mobileNumber">携帯電話</label>
                            <input type="text" class="form-control bg-white" name="phone" id="mobileNumber" value="{{ $data['phone'] }}" placeholder="" disabled>
                        </div>

                        <div class="form-group">
                            <label class="mt-4" for="idNumber">証券番号</label>
                            <input type="text" class="form-control bg-white" name="policy_number" value="{{ $data['policy_number'] }}" id="idNumber" placeholder="" disabled>
                        </div>
                        <div class="form-group">
                            <label class="mt-4" for="agentNumber">申出受付番号</label>
                            <input type="text" class="form-control bg-white"  id="agentNumber"  value="{{ $data['application_reception_number']}}" placeholder="" disabled>
                        </div>

                    </div>
                </div>

                <div class="form-group">
                    <label for="reason_for_return">差戻し理由</label>
                    <input type="text" class="form-control " id="reason_for_return" value="{{$data['reason_for_return'] }}" placeholder="" disabled>
                </div>

            </div>
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
    </div>
@endsection

@section('js')
    @vite(['resources/js/dashboard/convertDate.js'])
@endsection
