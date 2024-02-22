<?php

    include('start.php');

    if(isset($_POST['name'])) {
        $id = $_POST['id'];
        $names = $_POST['name'];

        $nameList = explode(",", $names);
        $correctFiles = (array) null;

        if ($names == null) {
            $sql = "UPDATE file SET relates = null WHERE id = '$id';";
            mysqli_query($conn, $sql);
        }

        foreach($nameList as $name) {

            $sql = "SELECT id FROM files WHERE name = '$name'";

            $result = mysqli_query($conn, $sql);

            if(mysqli_num_rows($result) > 0) {
                $data = mysqli_fetch_row($result);
                
                array_push($correctFiles, $data[0]);
                echo json_encode($correctFiles);

            } else {

                die(json_encode($name));
            }

        }
        $fileId = implode(",", $correctFiles);

        $sql = "UPDATE file SET relates = '$fileId' WHERE id = '$id';";
        mysqli_query($conn, $sql);
    }

    $conn -> close();
?>