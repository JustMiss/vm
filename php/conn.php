<?php
    header('content-type:text/html;charset=utf8');
    define('HOST','localhost');
    define('NAME','root');
    define('PASSWORD','');
    define('DBNAME','vmall');
    $conn=@new mysqli(HOST,NAME,PASSWORD,DBNAME);
    if($conn->connect_error){
        die('数据库连接失败，错误原因：'.$conn->connect_error);
    }