<?php 

    include('start.php');
    
    $sql_query = 'SELECT id, name, parent from files';
    $result = mysqli_query($conn, $sql_query);
    
    $files = array();
    
    while($row = mysqli_fetch_array($result)) {
        $files[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'parent' => $row['parent'],
        );
    }
    
    $response = ['success' => true, 'data' => $files];
    
    echo json_encode($response);

    $conn -> close();
?>