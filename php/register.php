<?php
    include 'conn.php';
    if(isset($_POST['username'])){
        $name=$_POST['username'];
        $password=$_POST['password'];
        $phonenum=$_POST['phonenum'];
        $conn->query("insert usermassage values(null,'$name','$password','$phonenum',NOW())");
        header('location:http://localhost/August/project/dist/index.html');
    }else{
        echo('传输失败');
        header('location:http://localhost/August/project/dist/register.html');
    }