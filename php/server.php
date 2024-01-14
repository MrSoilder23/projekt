<?php 
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $server_name="localhost";
    $username="root";
    $password="";
    $database_name= "documents";
    
    $conn = mysqli_connect($server_name, $username, $password, $database_name);

    if (!$conn) {
        die("Connection Failed". mysqli_connect_error());
    }
    
    $id = getdate();
    $date = date("Y/m/d");

    $sql_query = "INSERT INTO files (id,name,date,type) VALUES ('$id[0]','file','$date','file')";

    if (mysqli_query($conn, $sql_query)) {
        echo "UDALO SIEEEE WBILES TE DANE";
    } else {
        echo "Error: ". $sql . mysqli_error($conn);
    }
?>