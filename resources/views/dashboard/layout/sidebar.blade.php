@php
$currentUser = config('global.auth');
@endphp
<div class="sidebar">
    @if($currentUser['is_admin'])
    <a href="{{ route('admin.create-new') }}">
        <div class="menu-icon">
            <div class="menu-sub-icon @if(Route::is('admin.create-new')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.create-new')) menu-text-active @endif">新規作成</span>
    </a>
    @endif
    <a href="{{ route('admin.home') }}">
        <div class="menu-icon">
            <div class="menu-sub-icon @if(Route::is('admin.home') || Route::is('admin.request-form.send')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.home') || Route::is('admin.request-form.send')) menu-text-active @endif">確認待ち一覧（
            <span id="totalPending">
                {{config('global.sidebar.totalPending') > 99 ? '99+' : config('global.sidebar.totalPending')}}
            </span>）
        </span>
    </a>
    <a href="{{ route('admin.return.list') }}">
        <div class="menu-icon @if(Route::is('admin.return.list')) menu-active @endif}}">
            <div class="menu-sub-icon @if(Route::is('admin.return.list') || Route::is('admin.return.edit')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.return.list') || Route::is('admin.return.edit')) menu-text-active @endif">差戻し一覧（
            <span id="totalReject">
                {{config('global.sidebar.totalReject') > 99 ? '99+' : config('global.sidebar.totalReject')}}
            </span>）
        </span>
    </a>
    <a href="{{ route('admin.smsSentList.index') }}">
        <div class="menu-icon  @if(Route::is('admin.smsSentList.index') || Route::is('admin.smsSentList.detail')) menu-active @endif">
            <div class="menu-sub-icon @if(Route::is('admin.smsSentList.index') || Route::is('admin.smsSentList.detail')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.smsSentList.index') || Route::is('admin.smsSentList.detail')) menu-text-active @endif">SMS送信済一覧
            <!-- （<span id="totalApprove"> -->
            <!--     {{config('global.sidebar.totalApprove') > 99 ? '99+' : config('global.sidebar.totalApprove')}} -->
            <!-- </span>） -->
        </span>
    </a>
    <a href="{{ route('admin.reception.list') }}">
        <div class="menu-icon @if(Route::is('admin.reception.list') || Route::is('admin.reception.detail')) menu-active @endif}}">
            <div class="menu-sub-icon @if(Route::is('admin.reception.list') || Route::is('admin.reception.detail')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.reception.list') || Route::is('admin.reception.detail')) menu-text-active @endif">受付一覧
            <!-- （<span id="totalSubmit"> -->
            <!--     {{config('global.sidebar.totalSubmit') > 99 ? '99+' : config('global.sidebar.totalSubmit')}} -->
            <!-- </span>） -->
        </span>
    </a>

    @if($currentUser['is_super_admin'])
    <a href="{{ route('admin.account.list') }}">
        <div class="menu-icon  @if(Route::is('admin.account.list')) menu-active @endif}}">
            <div class="menu-sub-icon @if(Route::is('admin.account.list')) menu-sub-active @endif"></div>
        </div>
        <span class="menu-text @if(Route::is('admin.account.list')) menu-text-active @endif">アカウント管理</span>
    </a>
    @endif

    <form method="POST" action="{{ route('admin.logout') }}" class="logout-form">
        @csrf
        <button type="submit" class="logout-button">
            <div class="menu-icon">
             <div class="menu-sub-icon"></div>
            </div>
            <span class="menu-text">ログアウト</span>
        </button>
    </form>

</div>
