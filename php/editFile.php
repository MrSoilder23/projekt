<?php 
    
    include('start.php');

    if(isset($_POST['name'])) {
        $name = $_POST['name'];
        $id = $_POST['id'];

        $date = date("Y.m.d");
        $hour = date("H:i");
        

        $sql = "UPDATE files SET name = '$name' WHERE id='$id';
                UPDATE file SET name = '$name', date = '$date', hour = '$hour' WHERE id='$id';";

        if (mysqli_multi_query($conn, $sql)) {
            echo "UDALO SIEEEE WBILES TE DANE";
        } else {
            echo "Error: ". $sql . mysqli_error($conn);
        }
    }

    $conn -> close();
?>