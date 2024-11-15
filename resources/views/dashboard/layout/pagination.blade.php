@if ($paginator->hasPages())
    <div class="col-md-12">
        <div class="d-inline-block float-right pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <a class="page-link disabled padding-a icon-back-disabled" href="#" onclick="return false;">
                    <img class="icon-next" src="{{ Vite::asset('resources/images/admin/back-disabled.svg') }}" alt="T&D Back">
                </a>
            @else
                <a class="page-link active padding-a" href="{{ $paginator->previousPageUrl() }}">
                    <img class="icon-next" src="{{ Vite::asset('resources/images/admin/back.svg') }}" alt="T&D Back">
                </a>
            @endif

            @foreach ($elements as $element)
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        <a class="page-link @if($paginator->currentPage() == $page) active @endif" href="{{ $url }}">{{ $page }}</a>
                    @endforeach
                @else
                    <a class="disabled page-link">...</a>
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <a class="page-link active padding-a" href="{{ $paginator->nextPageUrl() }}">
                    <img class="icon-next" src="{{ Vite::asset('resources/images/admin/next.svg') }}" alt="T&D next">
                </a>
            @else
                <a class="page-link disabled padding-a icon-back-disabled" href="#" onclick="return false;">
                    <img class="icon-next" src="{{ Vite::asset('resources/images/admin/next-disabled.svg') }}" alt="T&D next">
                </a>
            @endif
        </div>
    </div>
@endif
