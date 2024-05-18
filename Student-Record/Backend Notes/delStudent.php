<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$arr = array();

$conn = mysqli_connect("localhost", "root", "", "student") or die("Connection Failed :".mysqli_connect_error());

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$sql = "DELETE FROM record WHERE id = '$id' ";

if($conn->query($sql) == true){
    $arr['msg'] = 'Deleted';
}
else{
    $arr['msg'] = 'Failed to Delete';
}


echo json_encode($arr);

$conn->close();

?>