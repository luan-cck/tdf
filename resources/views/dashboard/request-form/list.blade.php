@extends('dashboard.base')
@section('title', "確認待ち一覧")

@section('content')

    <div class="row">
        @include('components.header-input-search')
        <x-header-filter />
        <x-header-pagination />

        <div class="col-md-12">
            <hr class="mt-0 mb-30">
            @if($errors->has('acquired'))
            <div class="alert alert-danger alert-dismissible float-right" role="alert">
                他の担当者が確認中です。
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            @endif
        </div>

        <div class="col-md-12">
            <div class="text-right">
                *<u>詳細</u>ボタンが開かない場合は他の担当者が確認中です。
            </div>
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
                    <th class="text-center text-purple-color"> 操作</th>
                </tr>
                </thead>
                <tbody>
                @foreach($listWating as $item)
                    <tr>
                        <td class="text-center"> {{ \Carbon\Carbon::parse($item->created_at)->format('Y-m-d') }} </td>
                        <td class="text-center">{{  \App\Constants::REQUEST_TYPE[$item->request_type_name] }}</td>
                        <td class="text-center">{{ $item["application_reception_number"] }}</td>
                        <td class="text-center">{{ $item["policy_number"] }}</td>
                        <td class="text-center">{{ $item["contractor_name"] }}</td>
                        <td class="text-center">{{ $item["phone"] }}</td>
                        <td class="text-center">{{ $item["username"] }}</td>
                        <td class="text-center">
                        <a href="{{ route('admin.request-form.send', $item['id']) }}">
                            <button class="btn round-10 btn-operation"
                                @if($item['acquired'] && !auth()->user()->isSuperAdmin()) disabled @endif
                            >
                                詳細
                            </button>
                        </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        {{ $listWating->appends(request()->query())->onEachSide(1)->links('dashboard.layout.pagination') }}
    </div>

    @include('dashboard.request-form.modal-request-form-search')
    @include('dashboard.request-form.modal-confirm-submission')
    @include('dashboard.request-form.modal-submission-success')
@endsection

@section('js')
        @vite(['resources/js/sms/search.js'])
        <!-- @vite(['resources/js/dashboard/convertDate.js']) -->
@endsection
