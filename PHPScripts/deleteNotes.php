<?php
    require_once('connections.php');
    
    $postItData = json_decode(file_get_contents("php://input"));
    $uid = $postItData->id;

    $query = "DELETE FROM notes WHERE note_id = '$uid'";
    $result = mysqli_query($connection, $query); //送出SQL查詢
    if(!$result){ //查詢失敗的話…
        die("Query failed: " . mysqli_error($connection));
    }
?>