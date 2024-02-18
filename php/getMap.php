<?php

    include('start.php');

    $data = array();

    $sql = "SELECT map_folder FROM user WHERE username = 'Borys';";
    $result = mysqli_query($conn, $sql);
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $localization = $row['map_folder'];
        }
    }

    $file = fopen($localization.'/nodes.txt', "r");
    $fileSize = filesize($localization.'/nodes.txt');
    $size = 1;
    if($fileSize > 0) {
        $size = $fileSize;
    }
    $fileData = fread($file,$size);
    $final = explode(".", $fileData);
    $final = str_replace("'", '"', $final);

    $data['nodes'] = $final;

    $file = fopen($localization.'/edges.txt', "r");
    $fileSize = filesize($localization.'/edges.txt');
    $size = 1;
    if($fileSize > 0) {
        $size = $fileSize;
    }
    $fileData = fread($file,$size);
    $final = explode(".", $fileData);
    $final = str_replace("'", '"', $final);

    $data['edges'] = $final;
    echo json_encode($data);

    $conn -> close();

?>