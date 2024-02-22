<?php

    function random_color_part() {
        return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    function random_color() {
        return random_color_part() . random_color_part() . random_color_part();
    }
    
    include("start.php");

    $sql = "SELECT userTags FROM user WHERE username = 'Borys'";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_array($result)) {
        $tags = $row['userTags'];
    }
    
    $tagList = explode(',', $tags);


    $colors = array_combine($tagList, array_fill(0, count($tagList), null));

    foreach ($colors as $key => $value) {
        // Replace 'your_data_for_' with the actual data you want to assign
        $colors[$key] =  random_color();
    }

    $Borys = $colors["#Borys"];

    $sql = "SELECT relates, name, id FROM file";
    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_array($result)) {
        $relateId = $row['relates'];
        $name = $row['name'];
        $id = $row['id'];

        $relateIds = explode(",", $relateId);

        $nodes[] = "{'id':'$id', 'label': '$name', 'shape': 'dot', 'color': '#$Borys' }";
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


    $conn -> close();
?>