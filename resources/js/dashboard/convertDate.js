document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.getElementById('product_name');
    
    function adjustTextareaHeight() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    }

    adjustTextareaHeight();
});