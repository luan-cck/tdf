<div class="modal fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="width: 40%" role="document">
        <div class="modal-content">
            <div class="modal-header modal-header-create-account">
                <!-- <img data-dismiss="modal" src="{{ Vite::asset('resources/images/icon-close.svg') }}" class="btn-close-modal" alt="icon close"> -->
                <h4 class="modal-create-edit-title" id="modalTitle">アカウント編集</h4>
            </div>
            <form id="editAccountForm"  action="{{ route('admin.account.update', ['id' =>  '__ID__']) }}" method="POST">
              @csrf
              @method('PUT')
              <input type="hidden" id="edit-id" name="id">
              <div class="modal-create-edit-body">
                <div class="d-flex align-items-center justify-content-between">
                  <label class="modal-body-label" for="edit-email">メールアドレス</label>
                  <input class="modal-body-wrap-input modal-create-edit-input"  id=edit-email name="email" type="email">
                </div>

                <div class="text-red-modal value-error" id="edit_email_error"></div>

                <div class="d-flex align-items-start justify-content-between mt-4">
                  <label class="modal-body-label" for="password">パスワード</label>
                  <div class="modal-body-wrap-input">
                    <input class="w-100 modal-create-edit-input" name="password" type="password" placeholder="********" autocomplete="new-password">
                    <p class="modal-sub-text">※半角の英数字8〜12文字（a-z,0-9）で設定お願いします。</p>
                  </div>
                </div>
                <div class="text-red-modal value-error mb-1" id="edit_password_error"></div>

                <div class="d-flex align-items-center justify-content-between">
                  <label class="modal-body-label" for="edit-username">名前</label>
                  <input class="modal-body-wrap-input modal-create-edit-input" id="edit-username" name="username" type="text" placeholder="">
                </div>

                <div class="text-red-modal value-error" id="edit_username_error"></div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="edit-role_id">権限</label>
                  <select class="modal-body-wrap-input modal-create-edit-input" name="role_id" id="edit-role_id">
                    @foreach(\App\Constants::ROLE as $key => $value)
                    <option value="{{ $key }}" {{ old('role_id') == $key ? 'selected' : '' }}>{{ $value }}</option>
                    @endforeach
                  </select>
                </div>

                <div class="text-red-modal value-error" id="edit_role_id_error"></div>

              </div>
              <div class="modal-footer modal-create-edit-footer d-flex justify-content-center">
                  <button type="button" id="btn-edit-cancel" class="btn btn-delete btn-create-edit-cancel" >キャンセル</button>
                  <button type="button" id="btn-edit-submit" class="btn btn-delete btn-delete-submit" >保存</button>
              </div>
            </form>
        </div>
    </div>
</div>
