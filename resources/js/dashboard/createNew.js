import {
    displayErrors,
    disableSubmitButton,
    enableSubmitButton,
    convertJapaneseNumbersToDigits
 } from "../common.js";
$(document).ready(function (e) {
    $('#product-select').change(function() {
        if ($(this).val() !== null && $(this).val().length > 1) {
            $(this).val($(this).val()[0]);
        }
    });

    function convertJapaneseDateToGregorian(japaneseDate) {
        const eraMapping = {
            "昭和": 1926,
            "平成": 1989,
            "令和": 2019,
            '大正': 1912,
            '明治': 1868
        };
        japaneseDate = japaneseDate.replace('元年', '1年')
        const match = japaneseDate.match(/^(昭和|平成|令和|大正|明治)([0-9０-９]{1,2})年([0-9０-９]{1,2})月([0-9０-９]{1,2})日$/);
        if (!match) return null;

        const era = match[1];
        const year = convertJapaneseNumbersToDigits(match[2]);

        const month = convertJapaneseNumbersToDigits(match[3]);

        const day = convertJapaneseNumbersToDigits(match[4]);

        const gregorianYear = parseInt(eraMapping[era]) + parseInt(year) - 1;
        const valueDate = `${gregorianYear}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;

        return valueDate;
    }

    const japaneseDateInput = document.getElementById("birthDate");

    japaneseDateInput.addEventListener("input", function() {
        const japaneseDate = japaneseDateInput.value;
        const gregorianDate = convertJapaneseDateToGregorian(japaneseDate);

        if (gregorianDate) {
            japaneseDateInput.value = gregorianDate // Format YYYY/MM/DD
        }
        else {
            japaneseDateInput.value =japaneseDate;
        }
    });

    function showCompletedModal() {
        $('#modal-confirm-completed').modal('show');
    }

    // $('#btn-complete-action').click(function() {
    //     showCompletedModal();
    // });

    $('#search-button').click(function() {
        filterOptions();
    });

    $('#search-input').keypress(function(event) {
        if (event.key === 'Enter') {
            filterOptions();
        }
    });

    function filterOptions() {
        var searchValue = $('#search-input').val().trim().toLowerCase();
        $('#product-select').children('div').each(function() {
            var optionSyokenNumUpper = $(this).data('syoken-num-upper').toString().toLowerCase();
            if (optionSyokenNumUpper.startsWith(searchValue)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $('#product-select').on('click', 'div', function() {
        var selectedProductId = $(this).data('product-id');
        $('#productSelected').val(selectedProductId);
        $('#product-select').removeClass('show');

        // Remove 'selected' class from all dropdown items
        $('#product-select').children('div').removeClass('selected');

        // Add 'selected' class to the clicked item
        $(this).addClass('selected');
    });

    $("#btnCreteFormRequest").on("click", function (e) {
        e.preventDefault();
        $('.value-error').text('');
        var submitButton = $(this);
        disableSubmitButton(submitButton);

        var formData = $("#formCreteFormRequest").serialize();
        var endpoint = $("#formCreteFormRequest").attr("action");
        $.ajax({
            url: endpoint,
            type: "POST",
            data: formData,
            success: function(response) {
                showCompletedModal();

                setTimeout(function() {
                    window.location.href = "/admin/request-form-waiting";
                }, 3000);
            },
            error: function(xhr) {
                if (xhr.status === 422) {
                    var errors = xhr.responseJSON.errors;
                    displayErrors(errors);
                    enableSubmitButton(submitButton);
                }
            }
        });
    });

})
