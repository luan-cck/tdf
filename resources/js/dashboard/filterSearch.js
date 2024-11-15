$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const limit = urlParams.get('limit');
    const keyword = urlParams.get('keyword');
    const requestType = urlParams.get('request_type_name');

    if (limit) {
        $('.limit').val(limit);
    }
    if (keyword) {
        $('.keyword').val(keyword);
    }
    if (requestType) {
        $('.request_type_name').val(requestType);
    }
    // handle click search request_type_name
    handleClickRequestType();
    handleClickPerPage();
    $('.keyword').on('change', function () {
        clearTimeout(timer);

        timer = setTimeout(handleChangeKeyword, 200); // 1000 milliseconds = 1 second
    });
});

// handle limit record
let currentUrl = $(location).attr('href');
let url = new URL(currentUrl);
let limitUrl = url.searchParams.get('limit') || 10;

function initialSelectByDiv(id, value) {
    $('#'+id+' a').on('click', function(e) {
        $(this).parent().parent().find("button").text($(this).text());
        $(this).parent().find("a").removeClass('selected');
        $(this).addClass('selected');

        let selectedValue = $("#"+id+" a.selected").attr('value');
        var href = new URL(currentUrl);
        href.searchParams.set('page', '1');
        if (href.searchParams.has(id)) {
            href.searchParams.set(id, selectedValue);
        } else {
            href.searchParams.append(id, selectedValue);
        }

        window.location.href = href;
    });

    $( "#" + id + ' a' ).each(function( index ) {
        if ($(this).attr('value') == value) {
            $(this).addClass('selected');
            $(this).parent().parent().find("button").text($(this).text());
        }
    });
}

function handleClickPerPage() {
    initialSelectByDiv('limit', url.searchParams.get('limit') || 10);
    /*
    $('.limit').change(function () {
        let limit = $(this).val();
        var href = new URL(currentUrl);
        href.searchParams.set('page', '1');
        if (href.searchParams.has('limit')) {
            href.searchParams.set('limit', limit);
        } else {
            href.searchParams.append('limit', limit);
        }

        window.location.href = href;
    });
    */
}
let timer;


function handleChangeKeyword() {
    let keyword = $('.keyword').val();
    let href = new URL(currentUrl);

    if (href.searchParams.has('keyword')) {
        href.searchParams.set('keyword', keyword);
    } else {
        href.searchParams.append('keyword', keyword);
    }

    window.location.href = href;
}

function handleClickRequestType() {
    initialSelectByDiv('request_type_name', url.searchParams.get('request_type_name') || "");
    /*
    $('.request_type_name').change(function () {
        let requestType = $(this).val();
        var href = new URL(currentUrl);
        if (href.searchParams.has('request_type_name')) {
            href.searchParams.set('request_type_name', requestType);
        } else {
            href.searchParams.append('request_type_name', requestType);
        }

        window.location.href = href;
    });
    */
}
