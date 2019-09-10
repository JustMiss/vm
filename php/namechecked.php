<?php
    include 'conn.php';
    $name=$_POST['name'];
    $result=$conn->query("SELECT * FROM usermassage WHERE username='$name'");
    echo json_encode($result->fetch_assoc());