<!-- resources/views/components/search-select.blade.php -->
@php
$currentUser = config('global.auth');
@endphp
<div class="col-md-12 px-0">
    <div class="search-bar col-md-12 p-0">
        <label for="search-input" class="label-search-input col-sm-8">証券番号上3桁を入力</label>
        <!-- <div id="search-divider"></div> -->
         <div class="col-sm-4 d-flex items-center p-0 px-3">
            <input class="w-full bg-white" type="text" id="search-input" name="search-input" placeholder="022" @if(!$currentUser['is_admin']) disabled @endif>
            <img src="{{ Vite::asset('resources/images/admin/Search.svg') }}" alt="" />
         </div>
    </div>
</div>
<div class="text-red value-error mt-0" id="product_id_error"></div>
<div class="col-md-12 px-0">
    <input type="hidden" name="product_id" id=productSelected value="{{ $selectedValue ?? '' }}"/>
    <div class="form-group dropdown-content"  id="product-select">
        @php
            $options = Cache::get('productions');
        @endphp
        @if(!empty($options))
            @foreach($options as $option)
                <div data-syoken-num-upper="{{ sprintf('%03d', $option->syoken_num_upper) }}"
                    data-product-name="{{ $option->product_name }}"
                    data-product-id="{{ $option->product_id }}"
                    class="@if(isset($selectedValue) && $option->product_id == $selectedValue) selected @endif"
                > &nbsp; {{sprintf('%03d', $option->syoken_num_upper) . '_' .$option->product_name}}</div>
            @endforeach
        @endif
    </div>
</div>
