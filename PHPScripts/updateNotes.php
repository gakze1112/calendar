<?php
    require_once('connections.php');

    $postItData = json_decode(file_get_contents("php://input"));
    $uid = $postItData->id;
    $text = $postItData->content;

    $query = "UPDATE notes SET note_text = '$text' WHERE note_id = '$uid' LIMIT 1";
    $result = mysqli_query($connection, $query); //送出SQL查詢
    if(!$result){ //查詢失敗的話…
        die("Query failed: " . mysqli_error($connection));
    }
?>