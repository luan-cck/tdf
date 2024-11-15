<div class="modal fade" id="modal-create" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="width: 40%" role="document">
        <div class="modal-content">
            <div class="modal-header modal-header-create-account">
                <!-- <img data-dismiss="modal" src="{{ Vite::asset('resources/images/icon-close.svg') }}" class="btn-close-modal" alt="icon close"> -->
                <h4 class="modal-create-edit-title" id="modalTitle">アカウント新規登録</h4>
            </div>
            <form id="createAccountForm" action="{{route('admin.account.store')}}" method="POST">
              @csrf
              <div class="modal-create-edit-body">
                <div class="d-flex align-items-center justify-content-between">
                  <label class="modal-body-label" for="email">メールアドレス</label>
                  <input class="modal-body-wrap-input modal-create-edit-input" name="email" autocomplete="off" type="email">
                </div>

                <div class="d-flex align-items-center">
                  <label class="modal-body-label" for="name"></label>
                  <div class="text-red-modal value-error mb-0" id="email_error"></div>
                </div>

                <div class="d-flex align-items-start justify-content-between mt-4">
                  <label class="modal-body-label" for="password">パスワード</label>
                  <div class="modal-body-wrap-input">
                    <input class="w-100 modal-create-edit-input" name="password" type="password" autocomplete="new-password" placeholder="********">
                    <p class="modal-sub-text mb-0">※半角の英数字8〜12文字（a-z,0-9）で設定お願いします。</p>
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <label class="modal-body-label" for="name"></label>
                  <div class="text-red-modal value-error mb-3" id="password_error"></div>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                  <label class="modal-body-label" for="name">名前</label>
                  <input class="modal-body-wrap-input modal-create-edit-input"  name="username" autocomplete="new-username" type="text" placeholder="テキスト">
                </div>

                <div class="d-flex align-items-center">
                  <label class="modal-body-label" for="name"></label>
                  <div class="text-red-modal value-error mb-0" id="username_error"></div>
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="">権限</label>
                  <select class="modal-body-wrap-input modal-create-edit-input" name="role_id" id="">
                    <option value="" selected {{ old('role_id') == '' ? 'selected' : '' }}>--選択--</option>
                    @foreach(\App\Constants::ROLE as $key => $value)
                        <option value="{{ $key }}"  {{ old('role_id') == $key ? 'selected' : '' }}>{{ $value }}</option>
                    @endforeach
                  </select>
                </div>
                
                <div class="d-flex align-items-center">
                  <label class="modal-body-label" for="name"></label>
                  <div class="text-red-modal value-error mb-0" id="role_id_error"></div>
                </div>
              </div>
              <div class="modal-footer modal-create-edit-footer d-flex justify-content-center">
                  <button type="button" id="btn-create-cancel" class="btn btn-delete btn-create-edit-cancel" data-dismiss="modal">キャンセル</button>
                  <button type="button" id="btn-create-submit" class="btn btn-delete btn-delete-submit" >登録</button>
              </div>
            </form>
        </div>
    </div>
</div>
