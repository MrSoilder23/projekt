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

?>