<?php
    include 'conn.php';
    if(isset($_POST['username'])){
        $name=$_POST['username'];
        $password=$_POST['password'];
        $result=$conn->query("SELECT * FROM usermassage WHERE username='$name' AND password='$password'");
        echo json_encode($result->fetch_assoc());
        // if($result->fetch_assoc()){ // 有空找下答案
        //     echo json_encode($result->fetch_assoc());
        // }else{
        //     echo false;
        // }
    }