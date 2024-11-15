@section('css')
    <style>
    .popup-download {
        display: none;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 1000;
    }
</style>
    @vite(['resources/css/dashboard/receptionList.css'])
@endsection
@extends('dashboard.base')
@section('title', "受付一覧")
@section('content')
    <div class="row">
        <x-header-input-search />
        <x-header-filter />
        <x-header-pagination />
        <div class="col-md-3">
            <form id="downloadForm" action="{{ route('admin.reception.download')}}" method="POST">
                @csrf
                <input type="hidden" name="arrayRequest" />
                @if(config('global.auth.is_admin'))
                <button type="button" id="downloadReception" class="btn purple-color round-25 float-right"><u>ダウンロード</u></button>
                @endif
            </form>
        </div>
        <div class="col-md-12">
            <hr class="mt-0 mb-30">
        </div>
        <div class="col-md-12">
            <table class="table table-hover table-no-outline-border">
                <thead style="background-color: #EFF2F9">
                <tr>
                    <th class="text-center text-purple-color td-first ">
                        <input type="checkbox" id="select-all" />
                        <label for="select-all" class="custom-checkbox-table"></label>
                    </th>
                    <th class="text-center text-purple-color"> 受付日時 </th>
                    <th class="text-center text-purple-color"> 業務名 </th>
                    <th class="text-center text-purple-color"> 申出受付番号 </th>
                    <th class="text-center text-purple-color"> 証券番号 </th>
                    <th class="text-center text-purple-color"> 契約者名 </th>
                    <th class="text-center text-purple-color"> 携帯電話 </th>
                    <th class="text-center text-purple-color"> 作成者 </th>
                    <th class="text-center text-purple-color"> ステータス </th>
                    <th class="text-center text-purple-color"> 操作 </th>
                </tr>
                </thead>
                <tbody>
                @foreach($datas as $index => $item)
                    <tr class="border-bottom">
                        <td class="text-center td-first">
                            <input type="checkbox" class="row-checkbox" id="row-checkbox-{{ $index }}" data-id="{{ $item['id'] }}"/>
                            <label for="row-checkbox-{{ $index }}" class="custom-checkbox-table"></label>
                        </td>
                        <td class="text-center">{{ date('Y-m-d', strtotime($item['latest_status_created_at'])); }}</td>
                        <td class="text-center">{{ \App\Constants::REQUEST_TYPE[$item["request_type_name"]] }}</td>
                        <td class="text-center">{{ $item["application_reception_number"] }}</td>
                        <td class="text-center">{{ $item["policy_number"] }}</td>
                        <td class="text-center">{{ $item["contractor_name"] }}</td>
                        <td class="text-center">{{ $item["phone"] }}</td>
                        <td class="text-center">{{ $item["username"] }}</td>
                        <td class="text-center">{{ \App\Constants::REQUEST_FROM_DOWNLOAD_STATUS[$item["downloaded"]] }}</td>
                        <td class="text-center">
                            <a href="{{ route('admin.reception.detail', ['id' => $item['id']]) }}" class="btn round-10 btn-operation">詳細</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        {{ $datas->appends(request()->query())->onEachSide(1)->links('dashboard.layout.pagination') }}
    </div>

    <!-- <div id="downloadPopup" class="popup-download">
        <div id="downloadProgress">0%</div>
    </div> -->
    @include('dashboard.receptionList.modal-search-form')
@endsection

@section('js')
    @vite(['resources/js/dashboard/receptionList.js'])
@endsection
