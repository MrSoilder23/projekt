<?php 
    
    include('start.php');

    if(isset($_POST['name'])) {
        $name = $_POST['name'];
        $id = $_GET['id'];

        $sql = "UPDATE files SET name = '$name' WHERE id='$id';
                UPDATE file SET name = '$name' WHERE id='$id';";

        if (mysqli_multi_query($conn, $sql_query)) {
            echo "UDALO SIEEEE WBILES TE DANE";
        } else {
            echo "Error: ". $sql . mysqli_error($conn);
        }
    }

    $conn -> close();
?>