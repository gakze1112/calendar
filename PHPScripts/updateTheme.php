<?php
    require_once('connections.php');

    $data = json_decode(file_get_contents("php://input"));
    $newTheme = $data->color;
    $query = "UPDATE theme SET cur_theme = '$newTheme' WHERE id = 1";
    $result = mysqli_query($connection, $query); //送出SQL查詢
    if(!$result){ //查詢失敗的話…
        die("Query failed: " . mysqli_error($connection));
    }
?>