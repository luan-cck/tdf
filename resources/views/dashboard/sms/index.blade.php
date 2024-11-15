@section('css')
    @vite(['resources/css/dashboard/sms.css'])
@endsection
@extends('dashboard.base')
@section('title', "SMS送信済一覧")
@section('content')

    <div class="row">
        @include('components.header-input-search')
        @include('components.header-filter')
        @include('components.header-pagination')

        <div class="col-md-3">
            @if(config('global.auth.is_admin'))
            <button type="button" class="btn purple-color round-25 float-right" id="btn-download-sms">
                <u>ダウンロード</u></button>
            @endif
        </div>

        <div class="col-md-12">
            <hr class="mt-0 mb-30">
        </div>

        <div class="col-md-12">
            <table class="table table-hover table-no-outline-border">
                <thead style="background-color: #EFF2F9">
                <tr>
                    <th class="text-center text-purple-color"> 作成日</th>
                    <th class="text-center text-purple-color"> 業務名</th>
                    <th class="text-center text-purple-color"> 申出受付番号</th>
                    <th class="text-center text-purple-color"> 証券番号</th>
                    <th class="text-center text-purple-color"> 契約者名</th>
                    <th class="text-center text-purple-color"> 携帯電話</th>
                    <th class="text-center text-purple-color"> 作成者</th>
                    <th class="text-center text-purple-color"> ステータス</th>
                    <th class="text-center text-purple-color"> 操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($data as $item)
                    <tr>
                        <td class="text-center">{{ date('Y-m-d', strtotime($item['created_at'])); }}</td>
                        <td class="text-center">{{ \App\Constants::REQUEST_TYPE[$item["request_type_name"]] }}</td>
                        <td class="text-center">{{ $item["application_reception_number"] }}</td>
                        <td class="text-center">{{ $item["policy_number"] }}</td>
                        <td class="text-center">{{ $item["contractor_name"] }}</td>
                        <td class="text-center">{{ $item["phone"] }}</td>
                        <td class="text-center">{{ $item["username"] }}</td>
                        <td class="text-center">{{ \App\Constants::STATUS[$item["status"]] }}</td>
                        <td class="text-center">
                        <a href="{{ route('admin.smsSentList.detail', ['id' => $item['id']]) }}" class="btn round-10 btn-operation">詳細</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        {{ $data->appends(request()->query())->onEachSide(1)->links('dashboard.layout.pagination') }}
    </div>

        @include('dashboard.sms.modal-search')
@endsection

@section('js')
    @vite(['resources/js/sms/search.js'])
@endsection
