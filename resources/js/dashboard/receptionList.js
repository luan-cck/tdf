import {
    disableSubmitButton,
    enableSubmitButton,
    initializeFlatpickr
} from "../common.js";

window.addEventListener("load", (event) => {
    const selectAllCheckbox = document.getElementById("select-all");
    const rowCheckboxes = document.querySelectorAll(".row-checkbox");
    const checkboxesBusiness = document.querySelectorAll(
        'input[type="checkbox"][name="business"]'
    );
    const checkboxesStatus = document.querySelectorAll(
        'input[type="checkbox"][name="status"]'
    );
    var arrayRequest = [];

    selectAllCheckbox.addEventListener("change", function () {
        rowCheckboxes.forEach((checkbox) => {
            checkbox.checked = this.checked;
            const itemId = checkbox.dataset.id;
            const row = checkbox.parentElement.parentElement;

            if (this.checked) {
                row.classList.add("high-light");
                addToArrayRequest(itemId);
            } else {
                row.classList.remove("high-light");
                removeFromArrayRequest(itemId);
            }
        });
    });

    rowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const row = this.parentElement.parentElement;
            const itemId = this.dataset.id

            if (this.checked) {
                row.classList.add("high-light");
                addToArrayRequest(itemId);
            } else {
                row.classList.remove("high-light");
                removeFromArrayRequest(itemId);
            }

            if (
                document.querySelectorAll(".rowCheckbox:checked").length ===
                rowCheckboxes.length
            ) {
                selectAllCheckbox.checked = true;
            } else {
                selectAllCheckbox.checked = false;
            }
        });
    });

    function addToArrayRequest(itemId) {
        if (!arrayRequest.includes(itemId)) {
            arrayRequest.push(itemId);
            updateHiddenInput();
        }
    }

    function removeFromArrayRequest(itemId) {
        arrayRequest = arrayRequest.filter(item => item !== itemId);
        updateHiddenInput();
    }

    function updateHiddenInput() {
        const hiddenInput = document.querySelector('input[name="arrayRequest"]');
        hiddenInput.value = JSON.stringify(arrayRequest);
    }

    checkboxesBusiness.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                checkboxesBusiness.forEach(function (otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    checkboxesStatus.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                checkboxesStatus.forEach(function (otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    $("#header-input-search").click(function () {
        showSearchFormModal();
    });

    $('#btn-submit-modal-data').on('click', function(e)  {
        e.preventDefault();
        handleSearch();
    })

    $('#btn-clear-modal-data').on('click', function(e) {
        $('#modal-reception-search-form :input').val('');

        $('#modal-reception-search-form  input:checkbox').prop('checked', false);
        $("#select-product-name").val('').change();
    })

    initialSelect2("select-product-name", '');

    function initialSelect2(elementId, placeholder) {
        const select2Element = $("#" + elementId);
        if (!select2Element.length) {
            return;
        }

        select2Element.select2({
            placeholder: placeholder,
            tags: true,
        });
    }

    function showSearchFormModal() {
        $("#modal-reception-search-form").modal("show");
    }

    $('#downloadReception').on('click', function(e)  {
        e.preventDefault();
        if (arrayRequest.length === 0) {
            alert('必ず１つ以上を選択してください。');
        } else {
            let formData;
            var form = $('#downloadForm');
            const isChecked = document.getElementById('select-all').checked;
            if (isChecked) {
                const urlParams = new URLSearchParams(window.location.search);
                const params = {};
                urlParams.forEach((value, key) => {
                    params[key] = value;
                });
                params['selectAll'] = true;
                const csrfToken = document.querySelector('input[name="_token"]').value;
                params['_token'] = csrfToken;
                formData = $.param(params);
            } else {
                formData = form.serialize();
            }
            var submitButton = $(this);
            disableSubmitButton(submitButton);
            submitButton.text('ダウンロード中...');
            var action = form.attr('action');
            var method = form.attr('method');

            $.ajax({
                url: action,
                type: method,
                data: formData,
                success: function (response) {
                    checkJobStatus(response.jobId, submitButton);
                },
                error: function () {
                    alert('システムが故障しました。ウェブサイトを再起動して、もう一度お試しください。');
                    submitButton.html('<u>ダウンロード</u>');
                    enableSubmitButton(submitButton);
                }
            });
        }
    })
    function checkJobStatus(jobId, submitButton) {
        $.ajax({
            url: '/admin/check-job-status/' + jobId,
            type: 'GET',
            success: function (response) {
                if (response.status === 'processing') {
                    setTimeout(function() {
                        checkJobStatus(jobId, submitButton);
                    }, 3000); // check every 3 seconds
                } else {
                    const link = document.createElement('a');
                    link.href = response.file;
                    link.download = 'images_and_csv.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    submitButton.html('<u>ダウンロード</u>');
                    enableSubmitButton(submitButton);
                }
            },
            error: function () {
                alert('ジョブステータスを確認する際にエラーが発生しました。');
                submitButton.html('<u>ダウンロード</u>');
                enableSubmitButton(submitButton);
            }
        });
    }

    initializeFlatpickr("#createdDateFrom", {
        defaultDate: document.getElementById("createdDateFrom").value,
        dateFormat: "Y-m-d",
    });

    initializeFlatpickr("#createdDateTo", {
        defaultDate: document.getElementById("createdDateTo").value,
        dateFormat: "Y-m-d",
    });

    initializeFlatpickr("#statusDateFrom", {
        defaultDate: document.getElementById("statusDateFrom").value,
        dateFormat: "Y-m-d",
    });

    initializeFlatpickr("#statusDateTo", {
        defaultDate: document.getElementById("statusDateTo").value,
        dateFormat: "Y-m-d",
    });

});



let currentUrl = $(location).attr('href');
let url = new URL(currentUrl);
let limitUrl = url.searchParams.get('limit') || 10;

function handleSearch() {

    let dataSearch = {
        createdDateFrom : $("#createdDateFrom").val(),
        createdTimeFrom : $("#createdTimeFrom").val(),
        createdDateTo   : $("#createdDateTo").val(),
        createdTimeTo   : $("#createdTimeTo").val(),

        statusDateFrom : $("#statusDateFrom").val(),
        statusTimeFrom : $("#statusTimeFrom").val(),
        statusDateTo   : $("#statusDateTo").val(),
        statusTimeTo   : $("#statusTimeTo").val(),

        cancellation    : $('#cancellation').is(":checked") ? 1 : 0,
        id_aggregation  : $('#id_aggregation').is(":checked") ? 1 : 0,
        benefits        : $('#benefits').is(":checked") ? 1 : 0,

        doc_download_no   : $('#doc_download_no').is(":checked") ? 1 : 0,
        doc_download_yes  : $('#doc_download_yes').is(":checked") ? 1 : 0,

        policyNumber    : $("#policyNumber").val(),
        applicationReceptionNumber : $("#applicationReceptionNumber").val(),
        contractorName  : $("#contractorName").val(),
        mobilePhone     : $("#mobilePhone").val(),

        productName     : $("#select-product-name").val(),
        page            : 1
    };

    var href = new URL(currentUrl);
    for (const [key, value] of Object.entries(dataSearch)) {
        href.searchParams.has(key) ? href.searchParams.set(key, value) : href.searchParams.append(key, value);
    }

    window.location.href = href;
}
