<?php

    include('start.php');

    if(isset($_POST['name'])) {
        $id = $_POST['id'];
        $name = $_POST['name'];

        $sql = "SELECT id FROM files WHERE name = '$name'";

        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_row($result);
            echo json_encode($data);
        } else {
            header('HTTP/1.1 500 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode($name));
        }

    }

    $conn -> close();
?>