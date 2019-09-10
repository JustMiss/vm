<?php
    include 'conn.php';
    $result=$conn->query("select * from commodity");
    $cmlist=array();
    for($i=0;$i<$result->num_rows;$i++){
        $cmarr[$i]=$result->fetch_assoc();
    }
    echo json_encode($cmarr);