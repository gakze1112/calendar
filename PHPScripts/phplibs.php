<?php
function readColorTheme($connection){
    $userSelectedColor = '';

    // 從資料庫的 theme 資料表，查詢色彩名稱。
    $query = "SELECT * FROM theme";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Something went wrong...`");
    }
    while($row = mysqli_fetch_assoc($result)){
        $userSelectedColor = $row['cur_theme'];
        break;
    }

    return $userSelectedColor;
};

function readNotes($connection){
    $query = "SELECT * FROM notes";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Something went wrong");
    }

    $notes = array();
    while($row = mysqli_fetch_assoc($result)){
        $data = array('id' => $row['note_id'], 'noteColor' => $row['note_color'], 'content' => $row['note_text']);
        array_push($notes,$data);
    }

    return $notes;
}
?>