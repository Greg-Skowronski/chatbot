<?php
$username = $_POST['usr'];
$conn = new mysqli("sql420.your-server.de", "yostae_2", "...", "yostae_db2");
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
}else{
    //$stmt = $conn->prepare("insert into WBdata (name) values (?)");
    $stmt = $conn->prepare("update WBdata set name = '$username' where id = '1' ");
    //$stmt->bind_param("s",$username);
    $stmt->execute();
    $stmt->close();
    $conn->close();
}

/*
$conn = new mysqli("sql420.your-server.de", "yostae_2", "dmT1SYqfAZqVdVip", "yostae_db2");
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$username = $_POST["usr"];

$sql = "INSERT INTO WBdata (name)
VALUES ('xd')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();*/
?>