<?php 
    
    include('start.php');

    if(isset($_POST['name'])) {

        $id = getdate();
        $name = $_POST['name'];
        $date = date("Y.m.d");
        $hour = date("H:i");

        $sql_query = "INSERT INTO files (id,name,date,type) VALUES ('$id[0]','$name','$date','file'); 
                      INSERT INTO file (id, name, date, hour) VALUES ('$id[0]','$name','$date','$hour');";

        
        if (mysqli_multi_query($conn, $sql_query)) {
            echo "UDALO SIEEEE WBILES TE DANE";
        } else {
            echo "Error: ". $sql . mysqli_error($conn);
        }
        
        $conn -> close();
    }
    
    $id = getdate();
    $date = date("Y.m.d");
    $hour = date("H:i");

    $sql_query = "INSERT INTO files (id,name,date,type) VALUES ('$id[0]','File','$date','file'); 
                  INSERT INTO file (id, name, date, hour) VALUES ('$id[0]','File','$date','$hour');";

    
    if (mysqli_multi_query($conn, $sql_query)) {
        echo "UDALO SIEEEE WBILES TE DANE";
    } else {
        echo "Error: ". $sql . mysqli_error($conn);
    }
    $conn -> close();
?>