<div class="" style="color: #3F494E">
    <div class="modal align-content-center" id="modal-search-return-list" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content h-750 custom-modal-content ">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">検索</h4>
                    <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
                </div>
                <div class="modal-body pb-0">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="" for="">作成日時</label>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="date" class="form-control bg-white" id="createdDateFrom" data-placeholder="" name="createdDateFrom" value="{{ $searchParams['createdDateFrom'] ?? ''}}">
                            </div>
                            <div class="form-group">
                                <input type="time" class="form-control" id="createdTimeFrom" data-placeholder="" name="createdTimeFrom" value="{{ $searchParams['createdTimeFrom'] ?? ''}}">
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
                                <input type="time" class="form-control" id="createdTimeTo" data-placeholder="" name="createdTimeTo" value="{{ $searchParams['createdTimeTo'] ?? ''}}">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-3">
                            <label class="" for="contractName">業務名</label>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="checkbox-rect2">
                                        <input type="checkbox" id="cancellation" class="checkbox-shadow" value="" {{ !empty($searchParams['cancellation']) ? 'checked' : ''}}>
                                        <label class="mb-0" for="cancellation">解約</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="checkbox-rect2">
                                        <input type="checkbox" id="id_aggregation" class="checkbox-shadow" value="" {{ !empty($searchParams['id_aggregation']) ? 'checked' : ''}}>
                                        <label class="mb-0" for="id_aggregation">ID集約</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="checkbox-rect2">
                                        <input type="checkbox" id="benefits" class="checkbox-shadow" value="" {{ !empty($searchParams['benefits']) ? 'checked' : ''}}>
                                        <label class="mb-0" for="benefits">給付金</label>
                                    </div>
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
                                <input type="text" class="form-control" name="policyNumber" id="policyNumber" value="{{ $searchParams['policyNumber'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">申出受付番号</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" name="applicationReceptionNumber" id="applicationReceptionNumber" value="{{ $searchParams['applicationReceptionNumber'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">契約者名</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" name="contractorName" id="contractorName" value="{{ $searchParams['contractorName'] ?? ''}}" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">携帯電話</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" name="mobilePhone" id="mobilePhone" value="{{ $searchParams['mobilePhone'] ?? ''}}" placeholder="">
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
                        <!-- {{--                        <div class="">--}}
                        {{--                            <button type="button" id="btn-author" class="btn btn-outline-dark" style="width: 50px">+</button>--}}
                        {{--                        </div>--}} -->
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2" for="">確認者</label>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                @php
                                $confirmBys = [];
                                if (!empty($searchParams['confirmedBy'])) {
                                    $confirmBys = explode(",", $searchParams['confirmedBy']);
                                }
                                @endphp
                                <select multiple name="confirmedBy[]" class="select2-custom-style" id="confirmedBy">
                                    @foreach($admins as $item)
                                        <option value="{{ $item->id }}" {{ in_array($item->id, $confirmBys) ? 'selected' : ''}}>{{ $item->username }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <!-- {{--                        <div class="">--}}
                        {{--                            <button type="button" id="btn-confirmed-by" class="btn btn-outline-dark" style="width: 50px">+</button>--}}
                        {{--                        </div>--}} -->
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
                    <x-btn-clear-modal-data />
                    <x-btn-submit-modal-data />
                </div>
            </div>
        </div>
    </div>
</div>