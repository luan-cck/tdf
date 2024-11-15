import axios from 'axios';
import $ from 'jquery';

window.$ = $;
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token.content
        },
        statusCode: {
            419: function() {
                alert('Session expired. Redirecting to login page.');
                window.location.href = '/admin/login';
            }
        }
    });
} else {
    console.error('CSRF token not found');
}
