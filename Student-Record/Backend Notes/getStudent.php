<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$arr = array();

$conn = mysqli_connect("localhost", "root", "", "student") or die("Connection Failed :".mysqli_connect_error());

$sql = 'SELECT * FROM record';

$result = $conn->query($sql);

if($result->num_rows > 0){
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    $sql2 = 'SELECT * FROM course';
    $result2 = $conn->query($sql2);
    $city = array();
    while($row2 = $result2->fetch_assoc()){
        $city[] = $row2;
    }
    $arr = array('msg' => 'OK', 'data' => $data, 'city' => $city);
}
else{
    $arr = array('msg' => 'Not Found', 'data' => "", 'city' => '');
}

echo json_encode($arr);

$conn->close();

?>