<?php

    include("start.php");

    $sql = "SELECT relates, name, id FROM file";
    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_array($result)) {
        $relateId = $row['relates'];
        $name = $row['name'];
        $id = $row['id'];

        $relateIds = explode(",", $relateId);

        $nodes[] = "{'id':'$id', 'label': '$name', 'shape': 'dot', 'color': '#F9AA9B' }";
        foreach ($relateIds as $ids) {
            $edges[] = "{'from': '$id', 'to': '$ids', 'arrows': {'to': {'enabled': false}}}";
        }
    }

    $file = fopen('D:/projektPlikiServer/map/nodes.txt', "w+");
    
    fwrite($file, implode('.',$nodes));
    fclose($file);

    $file = fopen('D:/projektPlikiServer/map/edges.txt', "w+");

    fwrite($file, implode('.',$edges));
    fclose($file);

    $sql = "UPDATE user SET map_folder = 'D:/projektPlikiServer/map/' WHERE username = 'Borys';";
    mysqli_query($conn, $sql);

    $data = array();
    $data['nodes'] = $nodes;
    $data['edges'] = $edges;
    echo json_encode($data);

    $conn -> close();
?>