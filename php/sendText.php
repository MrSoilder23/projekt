<?php

    include('start.php');

    $text = $_POST['text'];
    $id = $_POST['id'];

    $date = date("Y.m.d");
    $hour = date("H:i");

    $file = fopen('D:/projektPlikiServer/'.$id.'.txt', "w");
    fwrite($file, $text);
    fclose($file);

    $sql = "UPDATE file SET date = '$date', hour = '$hour' WHERE id = '$id';";

    if (mysqli_query($conn, $sql)) {
        echo "UDALO SIEEEE WBILES TE DANE";
    } else {
        echo "Error: ". $sql . mysqli_error($conn);
    }

    $conn -> close();
?>