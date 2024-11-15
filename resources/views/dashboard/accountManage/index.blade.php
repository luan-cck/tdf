@section('css')
    @vite(['resources/css/dashboard/accountManage.css'])
@endsection
@extends('dashboard.base')
@section('title', "アカウント管理")
@section('content')
    <div class="row">
        <div class="col-md-4">
            <div class="input-group round-25 overflow-hidden search-wrapper">
                <div class="input-group-prepend border-0 search-wrap-icon">
                  <img class="" src="{{ Vite::asset('resources/images/admin/Search.svg') }}" alt="search icon" />
                </div>
                <input type="text" class="form-control custom-font border-0 shadow-none keyword" placeholder="検索">
            </div>
        </div>

        <x-header-pagination />

        <div class="col-md-1"></div>

        <div class="col-md-4">
            <button type="button" id="btn-create-account" class="btn purple-color round-25 float-right px-4 w-150"><u>新規登録</u></button>
        </div>
        <div class="col-md-12">
            <hr class="mt-0 mb-30">
        </div>
        <div class="col-md-12">
            <table class="table table-hover table-no-outline-border">
                <thead style="background-color: #EFF2F9">
                <tr>
                    <th class="text-center text-purple-color"> アカウントID </th>
                    <th class="text-center text-purple-color"> 名前
                    </th>
                    <th class="text-center text-purple-color"> 権限 </th>
                    <th class="text-center text-purple-color"> 操作 </th>
                </tr>
                </thead>
                <tbody>
                @foreach($admins as $item)
                    <tr class="border-bottom" id="admin-row-{{ $item->id }}" data-id="{{ $item->id }}"
                    data-email="{{ $item->email }}"
                    data-username="{{ $item->username }}"
                    data-role_id="{{ $item->role_id }}">
                        <td class="text-center"> {{ $item->id }} </td>
                        <td class="text-center">{{ $item->username }}</td>
                        <td class="text-center">{{ \App\Constants::ROLE[$item->role_id] }}</td>
                        <td class="text-center">
                            <div class="d-flex justify-content-center">
                              <button class="btn btn-delete-account round-10 btn-delete-account mr-2"
                              data-id="{{ $item->id }}">削除</button>
                              <button class="btn round-10 btn-operation btn-edit-account"
                                data-toggle="modal"
                                data-target="#editModal">詳細</button>
                            </div>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        {{ $admins->appends(request()->query())->onEachSide(1)->links('dashboard.layout.pagination') }}


    </div>

    <x-modal-confirm-delete />
    @include('dashboard.accountManage.modal-create')
    @include('dashboard.accountManage.modal-edit')
    @include('dashboard.accountManage.modal-create-edit-success')
@endsection

@section('js')
    @vite(['resources/js/dashboard/accountManage.js'])
@endsection
