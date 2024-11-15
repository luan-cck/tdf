<div class="" style="color: #3F494E">
    <div class="modal" id="modal-search-sms" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content custom-modal-content h-750">
                <div class="modal-header text-center">
                    <h5 class="modal-title w-100 font-weight-bold">検索</h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">作成日時</label>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="date" class="form-control bg-white" id="createdDateFrom" name="createdDateFrom" value="{{ $searchParams['createdDateFrom'] ?? ''}}">
                            </div>
                            <div class="form-group">
                                <input type="time" class="form-control bg-white" id="createdTimeFrom" name="createdTimeFrom" value="{{ $searchParams['createdTimeFrom'] ?? ''}}">
                            </div>
                        </div>
                        <div class="" style="padding: 30px 0px">
                            ~
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="date" class="form-control bg-white" id="createdDateTo" name="createdDateTo" value="{{ $searchParams['createdDateTo'] ?? ''}}">
                            </div>
                            <div class="form-group">
                                <input type="time" class="form-control" id="createdTimeTo" name="createdTimeTo" value="{{ $searchParams['createdTimeTo'] ?? ''}}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="" for="contractName">業務名</label>
                        </div>
                        <div class="col-md-8">
                            <div class="row mb-3">
                                <div class="col-md-4 checkbox-rect2">
                                    <input type="checkbox" id="cancellation" class="checkbox-shadow" value="" {{ !empty($searchParams['cancellation']) ? 'checked' : ''}}/>
                                    <label class="modal-sms-label" for="cancellation">解約</label>
                                </div>
                                <div class="col-md-4 checkbox-rect2">
                                    <input type="checkbox" id="id_aggregation" class="checkbox-shadow" value="" {{ !empty($searchParams['id_aggregation']) ? 'checked' : ''}}>
                                    <label class="modal-sms-label" for="id_aggregation">ID集約</label>
                                </div>
                                <div class="col-md-4 checkbox-rect2">
                                    <input type="checkbox" id="benefits" class="checkbox-shadow" value="" {{ !empty($searchParams['benefits']) ? 'checked' : ''}}>
                                    <label class="modal-sms-label" for="benefits">給付金</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">証券番号</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="policyNumber" name="policyNumber" value="{{ $searchParams['policyNumber'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">申出受付番号</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="applicationReceptionNumber" name="applicationReceptionNumber" value="{{ $searchParams['applicationReceptionNumber'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">契約者名</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="contractorName" name="contractorName" value="{{ $searchParams['contractorName'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">携帯電話</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="mobilePhone" name="mobilePhone" value="{{ $searchParams['mobilePhone'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">作成者</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group h-select">
                                @php
                                $selectedAuthors = [];
                                if (!empty($searchParams['author'])) {
                                    $selectedAuthors = explode(",", $searchParams['author']);
                                }
                                @endphp
                                <select multiple name="authors[]" class="select2-custom-style" id="author">
                                    @foreach($admins as $item)
                                        <option value="{{ $item->id }}" {{ in_array($item->id, $selectedAuthors) ? 'selected' : ''}}>{{ $item->username }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        {{--<div class="">--}}
                            {{--<button type="button" id="btn-author" class="btn btn-outline-dark" style="width: 50px">+</button>--}}
                        {{--</div>--}}
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">確認者</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                @php
                                $selectedconfirmedBys = [];
                                if (!empty($searchParams['confirmedBy'])) {
                                    $selectedconfirmedBys = explode(",", $searchParams['confirmedBy']);
                                }
                                @endphp
                                <select multiple name="confirmedBy[]" class="select2-custom-style" id="confirmedBy">
                                    @foreach($admins as $item)
                                        <option value="{{ $item->id }}" {{ in_array($item->id, $selectedconfirmedBys) ? 'selected' : ''}}>{{ $item->username }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
{{--                        <div class="">--}}
{{--                            <button type="button" id="btn-confirmed-by" class="btn btn-outline-dark" style="width: 50px">+</button>--}}
{{--                        </div>--}}
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">商品名</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <select multiple class="select2-custom-style" name="productName" id="productName">
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
                    </div>
                </div>

                <div class="modal-footer table-center table-border-none">
                    @include('components.btn-clear-modal-data')
                    @include('components.btn-submit-modal-data')
                </div>
            </div>
        </div>
    </div>
</div>
