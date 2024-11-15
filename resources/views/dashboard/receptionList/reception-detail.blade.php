@section('css')
    @vite(['resources/css/dashboard/receptionDetail.css'])
@endsection
@extends('dashboard.base')
@section('title', "受付一覧")
@section('content')
    <div class="reception-detail-container">
      <div class="reception-detail-title">
        <h3 class="reception-detail-title-text">受付内容詳細</h3>
      </div>

      <div class="reception-detail-body">
        <div class="reception-detail-body-item">
          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">証券番号</label>
            <input class="reception-detail-input" type="text" value="{{ $data['policy_number'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">申出受付番号</label>
            <input class="reception-detail-input" type="text" value="{{ $data['application_reception_number'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">契約者名</label>
            <input class="reception-detail-input" type="text" value="{{ $data['contractor_name'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">新契約者名</label> <!-- Column name in Customers table -->
            <input class="reception-detail-input" type="text" value="{{ $data['customer_name'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">携帯電話</label>
            <input class="reception-detail-input" type="text" value="{{ $data['phone'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">生年月日</label>
            <input class="reception-detail-input" type="text" value="{{ $data['birthday'] }}" readonly>
          </div>

          <div class="reception-detail-wrap-checkbox">
            <div class="reception-detail-body-checkbox">
              <label class="reception-detail-label-checkbox" for="under18">18歳未満</label>
              <input name="age" type="checkbox" value="1"  {{ ($data["customer_over_18"]) == 0 ? "checked" : ""}} id="under18" onclick="return false;">
              <label for="under18" class="custom-checkbox"></label>
            </div>
            <div class="reception-detail-body-checkbox">
              <label class="reception-detail-label-checkbox" for="above18">18歳以上</label>
              <input name="age" type="checkbox" value="2" id="above18" {{ ($data["customer_over_18"] == 1) ? "checked" : ""}} onclick="return false;">
              <label for="above18" class="custom-checkbox"></label>
            </div>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">本人確認書類</label>

              @if(!empty($documents["document_identity_document__front"]))
                <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_identity_document__front']) }}')">
                  <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                  <h4 class="reception-detail-text-file">{{ basename($documents["document_identity_document__front"]) }}</h4>
                </div>
              @endif
              @if(!empty($documents["document_identity_document__back"]))
                <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_identity_document__back']) }}')">
                  <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                  <h4 class="reception-detail-text-file">{{ basename($documents["document_identity_document__back"]) }}</h4>
                </div>
              @endif
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">親権者の本人確認書類</label>
            @if(!empty($documents["document_parent_identity_document__front"]))
              <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_parent_identity_document__front']) }}')">
                <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                <h4 class="reception-detail-text-file">{{ basename($documents["document_parent_identity_document__front"]) }}</h4>
              </div>
            @endif

            @if(!empty($documents["document_parent_identity_document__back"]))
              <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_parent_identity_document__back']) }}')">
                <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                <h4 class="reception-detail-text-file">{{ basename($documents["document_parent_identity_document__back"]) }}</h4>
              </div>
            @endif
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">親権者名</label>
            <input class="reception-detail-input" type="text" value="{{ $data["related_customer_name"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">続柄</label>
            <input class="reception-detail-input" type="text" value="{{ $data["relationship_type"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">被保険者の本人確認書類</label>
              @if(!empty($documents["document_contract_owner_identity_document__front"]))
                <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_contract_owner_identity_document__front']) }}')">
                    <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                    <h4 class="reception-detail-text-file">{{ basename($documents["document_contract_owner_identity_document__front"]) }}</h4>
                </div>
              @endif

              @if(!empty($documents["document_contract_owner_identity_document__back"]))
                <div class="reception-detail-wrap-file" onclick="downloadImage('{{ URL($documents['document_contract_owner_identity_document__back']) }}')">
                  <img src="{{ Vite::asset('resources/images/jpg.png') }}" alt="pdf icon">
                  <h4 class="reception-detail-text-file">{{ basename($documents["document_contract_owner_identity_document__back"]) }}</h4>
                </div>
              @endif
          </div>
        </div>

        <div class="reception-detail-body-item reception-detail-right">
          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">受付日時</label>
            <input class="reception-detail-input" type="text" value="{{ date(\App\Constants::DATETIME_FORMAT, strtotime($data['latest_status_created_at'])); }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">業務名</label>
            <input class="reception-detail-input" type="text" value="{{ \App\Constants::REQUEST_TYPE[$data["request_type_name"]] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">商品名</label>
            <textarea class="reception-detail-input pad-text bg-white" id="product_name" rows='1' disabled>{{ $data['product_name'] }}</textarea>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">支払通貨</label>
            <input class="reception-detail-input" type="text" value="{{ !empty($data["bank_info_currency"]) ? \App\Constants::CURRENCY_LABELS[$data["bank_info_currency"]] : ""}}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">金融機関名</label>
            <input class="reception-detail-input" type="text" value="{{ $data["bank_info_bank_name"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">金融機関コード</label>
            <input class="reception-detail-input w-50" type="text" value="{{ $data["bank_info_bank_code"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">支店名</label>
            <input class="reception-detail-input" type="text" value="{{ $data["bank_info_branch_name"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">支店コード</label>
            <input class="reception-detail-input w-25" type="text" value="{{ $data["bank_info_branch_code"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">種目</label>
            <input class="reception-detail-input" type="text" value="{{ !empty($data["bank_info_account_type"]) ? \App\Constants::LIST_OF_BANK_ACCOUNT_TYPES[$data["bank_info_account_type"]] : ""}}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">口座番号</label>
            <input class="reception-detail-input w-50" type="text" value="{{ $data["bank_info_account_number"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">口座名義人名</label>
            <input class="reception-detail-input" type="text" value="{{ $data["bank_info_account_name"] }}" readonly>
          </div>

          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">解約理由</label>
            <input class="reception-detail-input" type="text" value="{{ $data['cancellation_reason'] }}" readonly>
          </div>
          <div class="reception-detail-wrap-input">
            <label class="reception-detail-label" for="">解約理由(その他)</label>
            <input class="reception-detail-input" type="text" value="{{ $data['other_cancellation_reason'] }}" readonly>
          </div>
        </div>
      </div>

      <div class="reception-detail-footer">
        <a href="{{ route('admin.reception.list') }}" class="reception-detail-btn">閉じる</a>
      </div>
    </div>

@endsection

@section('js')
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.getElementById('product_name');
    
    function adjustTextareaHeight() {
      textarea.style.height = '30px';
      textarea.style.height = (textarea.scrollHeight + 7) +'px';
    }

    adjustTextareaHeight();
  });
    function downloadImage(imageUrl) {
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        const link = document.createElement('a');
        link.href = imageUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>
@endsection
