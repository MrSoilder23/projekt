<?php 
    
    include('start.php');
    
    $id = getdate();
    $date = date("Y/m/d");

    $sql_query = "INSERT INTO files (id,name,date,type) VALUES ('$id[0]','file','$date','file')";

    if (mysqli_query($conn, $sql_query)) {
        echo "UDALO SIEEEE WBILES TE DANE";
    } else {
        echo "Error: ". $sql . mysqli_error($conn);
    }
?>