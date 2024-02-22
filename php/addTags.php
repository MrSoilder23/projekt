<?php 

    include("start.php");

    $id = $_POST['id'];
    $tag = $_POST['tags'];

    $sql = "UPDATE user SET userTags = '$tag';
            UPDATE file SET tags = '$tag' WHERE id = '$id'";
    mysqli_multi_query($conn, $sql);

    $conn -> close();
?>