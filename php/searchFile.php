<?php

    include('start.php');

    if(isset($_POST['name'])) {
        $id = $_POST['id'];
        $names = $_POST['name'];

        $nameList = explode(",", $names);
        $correctFiles = (array) null;

        foreach($nameList as $name) {

            $sql = "SELECT id FROM files WHERE name = '$name'";

            $result = mysqli_query($conn, $sql);

            if(mysqli_num_rows($result) > 0) {
                $data = mysqli_fetch_row($result);
                
                array_push($correctFiles, $data[0]);
                echo json_encode($correctFiles);

                $fileId = implode(",", $correctFiles);

                $sql = "UPDATE file SET relates = '$fileId' WHERE id = '$id';";
                mysqli_query($conn, $sql);

            } else {

                die(json_encode($name));
            }

        }
    }

    $conn -> close();
?>