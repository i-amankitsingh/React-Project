<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$arr = array();

$conn = mysqli_connect("localhost", "root", "", "student") or die("Connection Failed :".mysqli_connect_error());

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$name = $data->name;
$course = $data->course;
$city = $data->city;

$stmt = $conn->prepare('UPDATE record SET name = ?, course = ?, city = ? WHERE id = ?');

$stmt->bind_param('sssi', $name, $course, $city, $id);

if($stmt->execute() == true){
    $arr['msg'] = 'Updated';
}
else{
    $arr['msg'] = 'Failed to Update';
}
$stmt->close();

echo json_encode($arr);

$conn->close();

?>