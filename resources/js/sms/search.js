import { initializeFlatpickr } from "../common.js";

let currentUrl = $(location).attr('href');
let url = new URL(currentUrl);

$(document).ready(function (e) {
    $("#btn-download-sms").on("click", function (e) {
        e.preventDefault();
    })

    function showModal(element) {
        $('#' + element).modal('show');
    }
    function hideModal(element) {
        $('#' + element).modal('hide');
    }


    $('#header-input-search').on('click', function(e)  {
        e.preventDefault();
        showModal('modal-search-sms');
        showModal('modal-request-form-search');
        showModal('modal-search-return-list');
    })

    $('#btn-submit-modal-data').on('click', function(e)  {
        e.preventDefault();
        handleSearch();
    })

    $('#btn-download-sms').on('click', function(e)  {
        handleSearch(true);
    })

    $('#btn-clear-modal-data').on('click', function(e) {
        $('.modal-content .form-control').val('');
        $('.modal-content input:checkbox').prop('checked', false);
        $("#author, #confirmedBy, #productName").val('').change();
    })

    //$('#btn-submit-modal-data').on('click', function(e) {
    //    showModal('modal-confirm-submission');
    //})

    $('#btn-confirm-submission').on('click', function(e) {
        // todo: confirm submit action, send ajax request
        hideModal('modal-confirm-submission')
        showModal('modal-submission-success')
    })



    $('#btn-close-modal-submission-success').on('click', function(e) {
        hideModal('modal-request-form-search')
    })

    function initialSelect2 (elementId, placeholder) {
        const select2Element = $('#' + elementId);
        if (!select2Element.length) {
            return;
        }

        select2Element.select2({
            placeholder: placeholder,
            tags: true
        });
    }

    function checkSelect2OpenClose (elementId) {
        var select2Element = $('#' + elementId);
        if (select2Element.select2('isOpen')) {
            select2Element.select2('close'); // Hide dropdown
        } else {
            select2Element.select2('open'); // Show dropdown
        }
    }

    initialSelect2('author', '');
    initialSelect2('confirmedBy', '');
    initialSelect2('productName', '');

    $("#btn-author").on("click", function (e) {
        e.preventDefault();
        checkSelect2OpenClose('select-author')
    });

    $("#btn-confirmed-by").on("click", function (e) {
        e.preventDefault();
        checkSelect2OpenClose('select-confirmed-by')
    });

    initializeFlatpickr("#createdDateFrom", {
        defaultDate: document.getElementById("createdDateFrom").value,
        dateFormat: "Y-m-d",
    });

    initializeFlatpickr("#createdDateTo", {
        defaultDate: document.getElementById("createdDateTo").value,
        dateFormat: "Y-m-d",
    });
});

function handleSearch(is_export=false) {
    let dataSearch = {
        createdDateFrom : $("#createdDateFrom").val(),
        createdTimeFrom : $("#createdTimeFrom").val(),
        createdDateTo   : $("#createdDateTo").val(),
        createdTimeTo   : $("#createdTimeTo").val(),

        cancellation    : $('#cancellation').is(":checked") ? 1 : 0,
        id_aggregation  : $('#id_aggregation').is(":checked") ? 1 : 0,
        benefits        : $('#benefits').is(":checked") ? 1 : 0,

        policyNumber    : $("#policyNumber").val(),
        applicationReceptionNumber : $("#applicationReceptionNumber").val(),
        contractorName  : $("#contractorName").val(),
        mobilePhone     : $("#mobilePhone").val(),

        author          : $("#author").val(),
        confirmedBy     : $("#confirmedBy").val() || "",
        productName     : $("#productName").val(),
        page            : 1
    };
    if (is_export) {
      dataSearch['export'] = is_export;
    }

    var href = new URL(currentUrl);
    for (const [key, value] of Object.entries(dataSearch)) {
        href.searchParams.has(key) ? href.searchParams.set(key, value) : href.searchParams.append(key, value);
    }

    window.location.href = href;
}
