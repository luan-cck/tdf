<div class="modal fade" id="modal-reception-search-form" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-reception-dialog" role="document">
        <div class="modal-content h-780">
            <div class="modal-header modal-reception-header">
                <h4 class="modal-reception-title" id="modalTitle">検索</h4>
            </div>
            <form>
              <div class="modal-reception-body">
                <div class="d-flex align-items-start justify-content-between">
                  <label class="modal-body-label" for="email">作成日時</label>
                  <div class="modal-body-wrap-input d-flex">
                    <div>
                      <input type="date" class="modal-reception-input bg-white" id="createdDateFrom" name="createdDateFrom" value="{{ $searchParams['createdDateFrom'] ?? ''}}">
                      <input type="time" class="modal-reception-input mt-1" id="createdTimeFrom" name="createdTimeFrom" value="{{ $searchParams['createdTimeFrom'] ?? ''}}">
                    </div>
                    <div>
                      <h2 class="modal-reception-space">～</h2>
                    </div>
                    <div>
                      <input type="date" class="modal-reception-input bg-white" id="createdDateTo" name="createdDateTo" value="{{ $searchParams['createdDateTo'] ?? ''}}">
                      <input type="time" class="modal-reception-input mt-1" id="createdTimeTo" name="createdTimeTo" value="{{ $searchParams['createdTimeTo'] ?? ''}}">
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-start justify-content-between mt-4">
                  <label class="modal-body-label" for="email">受付日時</label>
                  <div class="modal-body-wrap-input d-flex">
                    <div>
                      <input type="date" class="modal-reception-input bg-white" id="statusDateFrom" name="statusDateFrom" value="{{ $searchParams['statusDateFrom'] ?? ''}}">
                      <input type="time" class="modal-reception-input mt-1" id="statusTimeFrom" name="statusTimeFrom" value="{{ $searchParams['statusTimeFrom'] ?? ''}}">
                    </div>
                    <div>
                      <h2 class="modal-reception-space">～</h2>
                    </div>
                    <div>
                      <input type="date" class="modal-reception-input bg-white" id="statusDateTo" name="statusDateTo" value="{{ $searchParams['statusDateTo'] ?? ''}}">
                      <input type="time" class="modal-reception-input mt-1" id="statusTimeTo" name="statusTimeTo" value="{{ $searchParams['statusTimeTo'] ?? ''}}">
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="password">業務名</label>
                  <div class="modal-body-wrap-input modal-body-wrap-checkbox d-flex">
                    <div class="modal-form-check checkbox-container">

                      <input type="checkbox" id="cancellation" class="" value="" {{ !empty($searchParams['cancellation']) ? 'checked' : ''}}/>
                      <label for="cancellation" class="custom-checkbox"></label>
                      <label for="cancellation">
                        解約
                      </label>
                    </div>
                    <div class="modal-form-check checkbox-container ml-3">
                      <input type="checkbox" id="id_aggregation" class="" value="" {{ !empty($searchParams['id_aggregation']) ? 'checked' : ''}}>
                      <label for="id_aggregation" class="custom-checkbox"></label>
                      <label for="id_aggregation">
                        ID集約
                      </label>
                    </div>
                    <div class="modal-form-check checkbox-container">
                      <input type="checkbox" id="benefits" class="" value="" {{ !empty($searchParams['benefits']) ? 'checked' : ''}}>
                      <label for="benefits" class="custom-checkbox"></label>
                      <label for="benefits">
                        給付金
                      </label>
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between mt-2">
                  <label class="modal-body-label" for="password">ステータス</label>
                  <div class="modal-body-wrap-input d-flex">
                    <div class="modal-form-check checkbox-container">
                      <input type="checkbox" id="doc_download_no" class="" value="1" {{ !empty($searchParams['doc_download_no']) ? 'checked' : ''}}>
                      <label for="doc_download_no" class="custom-checkbox"></label>
                      <label for="doc_download_no">
                        未出力
                      </label>
                    </div>
                    <div class="modal-form-check checkbox-container ml-1">
                      <input type="checkbox" id="doc_download_yes" class="" value="1" {{ !empty($searchParams['doc_download_yes']) ? 'checked' : ''}}>
                      <label for="doc_download_yes" class="custom-checkbox"></label>
                      <label for="doc_download_yes">
                        出力済み
                      </label>
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between mt-2">
                  <label class="modal-body-label" for="name">証券番号</label>
                  <input type="text" class="modal-body-wrap-input modal-reception-input" id="policyNumber" name="policyNumber" value="{{ $searchParams['policyNumber'] ?? ''}}" placeholder="">
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="name">申出受付番号</label>
                  <input type="text" class="modal-body-wrap-input modal-reception-input" id="applicationReceptionNumber" name="applicationReceptionNumber" value="{{ $searchParams['applicationReceptionNumber'] ?? ''}}" placeholder="">
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="name">契約者名</label>
                  <input type="text" class="modal-body-wrap-input modal-reception-input" id="contractorName" name="contractorName" value="{{ $searchParams['contractorName'] ?? ''}}" placeholder="">
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="name">携帯電話</label>
                  <input type="text" class="modal-body-wrap-input modal-reception-input" id="mobilePhone" name="mobilePhone" value="{{ $searchParams['mobilePhone'] ?? ''}}" placeholder="">
                </div>

                <div class="d-flex align-items-center justify-content-between mt-4">
                  <label class="modal-body-label" for="">商品名</label>
                  <select multiple class="modal-body-wrap-input modal-reception-select" name="" id="select-product-name">
                    @php
                        $options = Cache::get('productions');
                        $selectedProducts = [];
                        if (!empty($searchParams['productName'])) {
                            $selectedProducts = explode(",", $searchParams['productName']);
                        }
                    @endphp
                    @if(!empty($options))
                        @foreach($options as $option)
                            <option value='{{ $option->product_id }}' {{ in_array($option->product_id, $selectedProducts) ? 'selected' : ''}}>{{ $option->product_name }}</option>
                        @endforeach
                    @endif
                  </select>
                </div>
              </div>
              <div class="modal-footer modal-reception-footer d-flex justify-content-center">
                <x-btn-clear-modal-data />
                <x-btn-submit-modal-data />
              </div>
            </form>
        </div>
    </div>
</div>
