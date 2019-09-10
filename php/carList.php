<?php
    include 'conn.php';
    if(isset($_GET['sid'])){
        $sid=$_GET['sid'];
        $conn->query("SELECT * FROM commodity WHERE sid='$sid'");
    }