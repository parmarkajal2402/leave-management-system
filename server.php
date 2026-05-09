<?php

session_start();

/* DATABASE CONNECTION */

$conn = mysqli_connect("localhost", "root", "", "leave_pro");

/* CHECK CONNECTION */

if (!$conn) {
    die("Database Connection Failed");
}

/* GET ACTION */

$action = $_GET['action'];


/* LOGIN */

if ($action == "login") {

    $u = $_POST['username'];
    $p = $_POST['password'];

    $q = mysqli_query($conn, "SELECT * FROM users WHERE username='$u' AND password='$p'");

    if (mysqli_num_rows($q) > 0) {

        $_SESSION['user'] = $u;
        echo "success";

    } else {

        echo "fail";

    }
}


/* BLOCK WITHOUT LOGIN */

if (!isset($_SESSION['user']) && $action != "login") {
    exit();
}


/* CREATE LEAVE */

if ($action == "create") {

    $name   = $_POST['name'];
    $type   = $_POST['type'];
    $from   = $_POST['from'];
    $to     = $_POST['to'];
    $reason = $_POST['reason'];

    mysqli_query($conn, "INSERT INTO leaves(name, type, from_date, to_date, reason, status) VALUES('$name', '$type', '$from', '$to', '$reason', 'Pending')");
}


/* READ DATA */

if ($action == "read") {

    $res = mysqli_query($conn, "SELECT * FROM leaves ORDER BY id DESC");

    $data = array();

    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
    }

    echo json_encode($data);
}


/* UPDATE STATUS */

if ($action == "update") {

    $id = $_GET['id'];
    $status = $_GET['status'];

    mysqli_query($conn, "UPDATE leaves SET status='$status' WHERE id='$id'");
}


/* DELETE LEAVE */

if ($action == "delete") {

    $id = $_GET['id'];

    mysqli_query($conn, "DELETE FROM leaves WHERE id='$id'");
}

?>