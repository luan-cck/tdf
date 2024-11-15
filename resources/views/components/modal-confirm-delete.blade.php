<div class="modal fade" id="modal-confirm-delete" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="width: 26%" role="document">
        <div class="modal-content">
            <!-- <div class="modal-header" style="border-bottom: none; position: relative">
                <img data-dismiss="modal" src="{{ Vite::asset('resources/images/icon-close.svg') }}" class="btn-close-modal" alt="icon close">
            </div> -->
            <form id="deleteForm" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-body text-center modal-delete-text">
                    本当に削除しますか？
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-delete btn-delete-cancel" data-dismiss="modal">いいえ</button>
                    <button type="submit" class="btn btn-delete btn-delete-submit btn-delete-submited">はい</button>
                </div>
            </form>
        </div>
    </div>
</div>
