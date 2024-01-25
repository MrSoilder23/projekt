<?php 

    include('start.php');

    if(isset($_POST['Id'])) {
        $id = $_POST['Id'];

    $sql_query = "SELECT 
        id, 
        name, 
        date, 
        hour, 
        text, 
        tags 
            from file 
        WHERE 
            id='$id'";
    $result = mysqli_query($conn, $sql_query);
    
    $files = array();
    
    while($row = mysqli_fetch_array($result)) {
        $files[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'date' => $row['date'],
            'hour' => $row['hour'],
            'text' => $row['text'],
            'tags' => $row['tags']
        );
    }
    
    $response = ['success' => true, 'data' => $files];
    
    echo json_encode($response);
    }  

?>