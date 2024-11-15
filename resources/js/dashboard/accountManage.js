import {
    displayErrors,
    displayEditErrors,
    disableSubmitButton,
    enableSubmitButton
} from "../common.js";

$(document).ready(function (e) {
    function showCompletedModal() {
        $("#modal-confirm-delete").modal("show");
    }

    function showCreateModal() {
        $("#modal-create").modal("show");
    }

    function showEditModal() {
        $("#modal-edit").modal("show");
    }

    function showSuccessModal() {
        $("#modal-success").modal("show");
    }

    $(".btn-delete-account").click(function () {
        var id = $(this).data('id');
        $('#modal-confirm-delete').find('.btn-delete-submit').attr('data-id', id);
        showCompletedModal();
    });

    // Set data for edit modal
    $(".btn-edit-account").click(function () {
        var row = $(this).closest('tr');

        var id = row.attr('data-id');
        var email = row.attr('data-email');
        var username = row.attr('data-username');
        var role_id = row.attr('data-role_id');

        $('#edit-id').val(id);
        $('#edit-email').val(email);
        $('#edit-username').val(username);
        $('#edit-role_id').val(role_id);

        // Show the edit modal
        showEditModal();
    });

    $("#btn-create-account").click(function () {
        showCreateModal();
    });

    $("#btn-create-submit").click(function (e) {
        e.preventDefault();
        $('.value-error').text('');
        var submitButton = $(this);
        disableSubmitButton(submitButton);

        var formData = $("#createAccountForm").serialize();
        var endpoint = $("#createAccountForm").attr("action");
        $.ajax({
            url: endpoint,
            type: "POST",
            data: formData,
            success: function(response) {
                $("#modal-create").modal("hide");
                showSuccessModal();
                setTimeout(function() {
                    window.location.reload();
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

    $("#btn-create-cancel").click(function () {
        $("#createAccountForm")[0].reset();
        $("#modal-create").modal("hide");
    });

    $("#btn-edit-cancel").click(function () {
        $("#editAccountForm")[0].reset();
        $("#modal-edit").modal("hide");
    });

    $("#btn-edit-submit").click(function (e) {
        e.preventDefault();
        $('.value-error').text('');
        var submitButton = $(this);
        disableSubmitButton(submitButton);

        var form = $('#editAccountForm');
        var action = form.attr('action').replace('__ID__', $('#edit-id').val());
        var method = form.attr('method');
        var formData = form.serialize();
        $.ajax({
            url: action,
            type: method,
            data: formData,
            success: function(response) {
                $("#editAccountForm")[0].reset();
                $("#modal-edit").modal("hide");
                var row = $('#admin-row-' + response.data.id);
                    row.find('.text-center').eq(1).text(response.data.username);
                    row.find('.text-center').eq(2).text(response.data.role);
                    row.attr('data-email', response.data.email);
                    row.attr('data-username', response.data.username);
                    row.attr('data-role_id', response.data.role_id);
                showSuccessModal();
            },
            error: function(xhr) {
                if (xhr.status === 422) {
                    console.log(xhr);
                    var errors = xhr.responseJSON.errors;
                    enableSubmitButton(submitButton);
                    displayEditErrors(errors);
                } else {
                    enableSubmitButton(submitButton);
                    alert('更新に失敗しました');
                }
            }
        });
    });

    $(".btn-delete-submited").click(function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var submitButton = $(this);
        disableSubmitButton(submitButton);

        var form = $('#deleteForm');
        var method = form.attr('method');
        $.ajax({
            url: '/admin/delete-account/' + id,
            type: method,
            data: form.serialize(),
            success: function(response) {

            window.location.reload();

            },
            error: function(xhr) {
                $("#modal-confirm-delete").modal('hide');
                enableSubmitButton(submitButton);
                alert('削除に失敗しました。');
                $('.modal-backdrop').remove();
                }
        });
    });

});
