import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Japanese } from "flatpickr/dist/l10n/ja.js";

flatpickr.localize(Japanese);

export function initializeFlatpickr(selector, options = {}) {
    flatpickr(selector, {
        locale: "ja",
        dateFormat: "Y年m月d日",
        altInput: true,
        altFormat: "Y年m月d日",
        ...options
    });
}

export function displayErrors(errors) {
    $.each(errors, function(field, messages) {
        var $errorField = $("#" + field + "_error");
        $errorField.text(messages[0]);
    });
}

export function displayEditErrors(errors) {
    $.each(errors, function(field, messages) {
        var $errorField = $("#edit_" + field + "_error");
        $errorField.text(messages[0]);
    });
}

export function disableSubmitButton(button) {
    button.attr('disabled', 'disabled');
}

// Function to enable submit button
export function enableSubmitButton(button) {
    button.prop('disabled', false);
    button.removeAttr('disabled');
}

export  function convertJapaneseNumbersToDigits(japaneseNumber) {
    const japaneseDigits = '０１２３４５６７８９';
    const arabicDigits = '0123456789';
    return japaneseNumber.split('').map(char => {
        const index = japaneseDigits.indexOf(char);
        return index !== -1 ? arabicDigits[index] : char;
    }).join('');
}