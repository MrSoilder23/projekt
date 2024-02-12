<?php 

    include('start.php');

    if(isset($_GET['id'])) {
        $id = $_GET['id'];

    $sql_query = "SELECT 
        id, 
        name, 
        date, 
        hour, 
        url, 
        tags 
            from file 
        WHERE 
            id='$id'";
    $result = mysqli_query($conn, $sql_query);
    
    $files = array();
    
    while($row = mysqli_fetch_array($result)) {
        $fileData = fopen($row['url'], "r");
        $fileSize = filesize($row['url']);
        $size = 1;
        if($fileSize > 0) {
            $size = $fileSize;
        }

        $files[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'date' => $row['date'],
            'hour' => $row['hour'],
            'text' => fread($fileData, $size),
            'tags' => $row['tags']
        );
        fclose($fileData);
    }
    
    $response = ['success' => true, 'data' => $files];
    
    echo json_encode($response);
    }  
    $conn -> close();
?>