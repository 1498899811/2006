<?php 

$username = $_POST['username'];
// $user = $_POST['user'];
$password = $_POST['password'];





$link = mysqli_connect('localhost','root','root','bk2004');


$sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`= '$password'";

$res = mysqli_query($link,$sql);

$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

// echo json_encode($data);



$data = count($data);

if($data === 0){

    // $sql = 'INSERT INTO `student` (`name`, `age`)VALUES("郭翔",20)'
    $link = mysqli_connect('localhost','root','root','bk2004');

    $sql = "INSERT INTO `users`  (`username` , `password`)VALUES('$username' , '$password')";

    $res = mysqli_query($link,$sql); 

    mysqli_close($link);
    echo json_encode(array(
        "massage" => "用户名注册成功",
        "username" => $username
        // "code" => 1
    ));

}else if($data === 1) {
    echo json_encode(array(
        "massage" => "你的请求成功",
        "username" => $username,
        "code" => 1
    ));
}




?>