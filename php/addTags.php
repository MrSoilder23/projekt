<?php 

    include("start.php");

    $id = $_POST['id'];
    $tag = $_POST['tags'];

    

    $sql = "UPDATE file SET tags = '$tag' WHERE id = '$id'";
    mysqli_query($conn, $sql);

    $sql = "SELECT DISTINCT tags FROM file";
    $result = mysqli_query($conn, $sql);
    
    while ($row = mysqli_fetch_array($result)) {
        $tagArray[] = $row['tags'];
    }

    $tags = implode(",", $tagArray);

    $sql = "UPDATE user SET userTags = '$tags' WHERE username = 'Borys'";
    mysqli_query($conn, $sql);

    $conn -> close();
?>