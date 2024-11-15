import './bootstrap';
import.meta.glob([
    '../images/**'
]);

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import select2 from 'select2';
select2();

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Japanese } from "flatpickr/dist/l10n/ja.js"; // Import Japanese locale

window.flatpickr = flatpickr;
flatpickr.localize(Japanese);
