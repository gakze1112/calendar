<?php
    require_once('connections.php');
    
    $postItData = json_decode(file_get_contents("php://input"));
    $uid = $postItData->id;
    $color = $postItData->noteColor;
    $text = $postItData->content;

    $query = "INSERT INTO notes(note_id, note_color, note_text) VALUES($uid, $color, '$text')";
    $result = mysqli_query($connection, $query); //送出SQL查詢
    if(!$result){ //查詢失敗的話…
        die("Query failed: " . mysqli_error($connection));
    }
?>