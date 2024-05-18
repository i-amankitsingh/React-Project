<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$arr = array();

$conn = mysqli_connect("localhost", "root", "", "student") or die("Connection Failed :".mysqli_connect_error());

$data = json_decode(file_get_contents("php://input"));


$name = mysqli_real_escape_string($conn, $data->name);
$course = mysqli_real_escape_string($conn, $data->course);
$city = mysqli_real_escape_string($conn, $data->city);


$stmt = $conn->prepare('INSERT INTO record (name, course, city) VALUES (?, ?, ?)');
$stmt->bind_param('sis', $name, $course, $city);
if($stmt->execute()){
    $arr['msg'] = 'OK';
}
else{
    $arr['msg'] = 'Something Went Wrong';
}

$stmt->close();

echo json_encode($arr);

$conn->close();


?>