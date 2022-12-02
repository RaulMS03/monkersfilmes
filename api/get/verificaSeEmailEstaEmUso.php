<?php

header("Access-Control-Allow-Origin: *");

$host = "sql10.freemysqlhosting.net";
$username = "sql10582224";
$password = "CM6ncEedqz";
$dbname = "sql10582224";

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    
    $connection_string = mysqli_connect($host, $username, $password, $dbname)
    or die 
    ("Problema ao conecter-se ao servidor.");

    $email_usuario = $_GET['email_usuario'];
    $response = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "Select * from tbl_Usuario 
        where email_usuario = '$email_usuario'";

        $result = mysqli_query($connection_string, $cmd); 
        $busca_por_email= mysqli_num_rows($result);

        if($busca_por_email != 0) {
            $response = [
                'response' => 'True',
            ];
        } else { 
            $response = [
                'response' => 'False',
            ];
        }

    }

    echo json_encode($response, JSON_PRETTY_PRINT);
    mysqli_close($connection_string);
}

?>