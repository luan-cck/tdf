import {
    displayErrors,
    disableSubmitButton,
    enableSubmitButton,
    convertJapaneseNumbersToDigits
} from "../common.js";

$(document).ready(function (e) {
    // $('#product-select').change(function() {
    //     if ($(this).val() !== null && $(this).val().length > 1) {
    //         $(this).val($(this).val()[0]);
    //     }
    // });

    var selectedProductId = $('#productSelected').val();
    if (selectedProductId) {
        var $selectedItem = $('#product-select').find('div[data-product-id="' + selectedProductId + '"]');
        if ($selectedItem.length) {
            $selectedItem.get(0).scrollIntoView({
                behavior: 'auto',
                block: 'center'
            });
        }
    }

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


    function showEditSuccessModal() {
        $('#modal-edit-return-success').modal('show');
    }

    function backToReturnList() {
        window.location.href = "/admin/return-list";
    }

    $("#btnUpdateReturnDetail").on("click", function (e) {
        e.preventDefault();
        $('.value-error').text('');

        var submitButton = $(this);
        disableSubmitButton(submitButton);

        var form = $("#formUpdateReturnDetail");

        var formData = form.serialize();
        var endpoint = form.attr("action");
        $.ajax({
            url: endpoint,
            type: "POST",
            data: formData,
            success: function(response) {
                showEditSuccessModal();

                setTimeout(function() {
                    window.location.href = "/admin/return-list";
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

    $("#btnCancelReturnDetail").on("click", function() {
        backToReturnList()
    })

    $("#btn-close-modal-edit-return-success").on("click", function() {
        backToReturnList()
    })

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

        let year = convertJapaneseNumbersToDigits(match[2]);

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

})
