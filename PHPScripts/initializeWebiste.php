<?php
    require_once('phplibs.php');
    require_once('connections.php');
    
    $response = [
        'color' => readColorTheme($connection),
        'notes' => readNotes($connection)
    ];

    echo json_encode($response);
?>