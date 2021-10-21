<?php
    // 帳號密碼最好放在 environment variable 比較安全
    $connection = mysqli_connect("localhost", "webServer", "123456", "calendar"); //連線資料庫
    if(!$connection){ //如果連線失敗
        die("There was an error connecting to the database."); //網頁宣告到此die，並在網頁輸出…
    }
?>