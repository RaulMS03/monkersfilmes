<?php

header("Access-Control-Allow-Origin: *");

$host = "sql10.freemysqlhosting.net";
$username = "sql10582224";
$password = "CM6ncEedqz";
$dbname = "sql10582224";

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    $connection_string = mysqli_connect($host, $username, $password, $dbname)
    or die 
    ("Problema ao conecter-se ao servidor.");

    $nm_usuario = $_POST['nm_usuario'];
    $email_usuario = $_POST['email_usuario'];
    $senha_usuario = $_POST['senha_usuario'];
    $response = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "call sp_cadastraUsuario('$nm_usuario', '$email_usuario', '$senha_usuario')";
        
        if(mysqli_query($connection_string, $cmd) or die (mysqli_error($connection_string))) {
            $response = [
                'response' => 'True',
            ];
        } else {
            $response = [
                'response' => 'False',
            ];
        }
    }

    echo json_encode($response);
    mysqli_close($connection_string);
}

?>