$(document).ready(function (e) {
    $('#request-form-detail-submit-sms').on('click', function(e)  {
        $('#modal-confirm-submission').modal('show');
    })

    $('#btn-confirm-submission').on('click', function(e)  {
        $('#form-request-form-detail-submit-sms').submit();

        $('#modal-confirm-submission').modal('hide');
        $('#modal-submission-success').modal('show');
    })
});