@extends('dashboard.base')
@section('title', "差戻し一覧")
@section('content')
    <div class="row">
        <x-header-input-search />
        <x-header-filter />
        <x-header-pagination />

        <!-- <div class="col-md-3">
            <button type="button" class="btn purple-color round-25 float-right"><u>ダウンロード</u></button>
        </div> -->
        <div class="col-md-12">
            <hr class="mt-0 mb-30">
        </div>
        <div class="col-md-12">
            <table class="table table-hover table-no-outline-border">
                <thead style="background-color: #EFF2F9">
                <tr>
                    <th class="text-center text-purple-color"> 作成日 </th>
                    <th class="text-center text-purple-color"> 業務名 </th>
                    <th class="text-center text-purple-color"> 申出受付番号 </th>
                    <th class="text-center text-purple-color"> 証券番号 </th>
                    <th class="text-center text-purple-color"> 契約者名 </th>
                    <th class="text-center text-purple-color"> 携帯電話 </th>
                    <th class="text-center text-purple-color"> 作成者 </th>
                    <th class="text-center text-purple-color"> 確認者 </th>
                    <th class="text-center text-purple-color"> 操作 </th>
                </tr>
                </thead>
                <tbody>
                @foreach($listReturn as $item)
                    <tr class="border-bottom">
                    <td class="text-center"> {{ \Carbon\Carbon::parse($item->created_at)->format('Y-m-d') }} </td>
                        <td class="text-center">{{  \App\Constants::REQUEST_TYPE[$item->request_type_name] }}</td>
                        <td class="text-center">{{ $item["application_reception_number"] }}</td>
                        <td class="text-center">{{ $item["policy_number"] }}</td>
                        <td class="text-center">{{ $item["contractor_name"] }}</td>
                        <td class="text-center">{{ $item["phone"] }}</td>
                        <td class="text-center">{{ $item["username"] }}</td>
                        <td class="text-center">{{ $item["confirmed"] }}</td>
                        <td class="text-center">
                            <a href="{{ route('admin.return.edit', $item['id']) }}"><button class="btn round-10 btn-operation">詳細</button></a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        {{ $listReturn->appends(request()->query())->onEachSide(1)->links('dashboard.layout.pagination') }}
    </div>

    @include('dashboard.returnList.modal-search')

@endsection

@section('js')
    @vite(['resources/js/sms/search.js'])
@endsection
