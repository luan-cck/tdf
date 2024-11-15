<?php
# this script can be run by command:
# docker run -ti --entrypoint=/bin/sh image_name -c "php import_vars.php"
$envContent = file_get_contents('.env');

$exp = explode(PHP_EOL, $envContent);

$expFiltered = array_filter($exp, function ($item) {
    return !empty($item) && (substr($item, 0, 1) != '#');
});

$envArr = [];
foreach ($expFiltered as $item) {
    $exp = explode('=', $item);
    if (count($exp)) {
        $name = $exp[0];
        $value = isset($exp[1]) ? $exp[1] : '';
        $value .= isset($exp[2]) ? "=".$exp[2] : '';
        $value .= isset($exp[3]) ? "=".$exp[3] : '';
        $envArr[$name] = $value;
    }
}

foreach ($envArr as $key => $value) {
    $ret = getenv($key);
    if ($ret !== FALSE) {
        $envArr[$key] = $ret;
    }
}

$newEnvContent = '';
foreach ($envArr as $key => $value) {
    $newEnvContent .= $key . '=' . $value . PHP_EOL;
}

file_put_contents('.env', $newEnvContent);
