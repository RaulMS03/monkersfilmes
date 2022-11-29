<?php

header("Access-Control-Allow-Origin: *");

$host = "sql10.freemysqlhosting.net";
$username = "sql10580979";
$password = "nGL9h6etHc";
$dbname = "sql10580979";

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    $connection_string = mysqli_connect($host, $username, $password, $dbname)
    or die 
    ("Problema ao conecter-se ao servidor.");

    $cd_usuario = $_POST['cd_usuario'];
    $nm_usuario = $_POST['nm_usuario'];
    $data_de_nascimento = $_POST['data_de_nascimento'];
    $email_usuario = $_POST['email_usuario'];
    $senha_usuario = $_POST['senha_usuario'];
    $cd_personalidade = $_POST['cd_personalidade'];
    $cd_foto_perfil = $_POST['cd_foto_perfil'];
    $response = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        if ($data_de_nascimento == null)
            $cmd = "call sp_atualizaDadosUsuario($cd_usuario, '$nm_usuario', $data_de_nascimento, '$email_usuario', '$senha_usuario', $cd_personalidade, $cd_foto_perfil)";
        else 
            $cmd = "call sp_atualizaDadosUsuario($cd_usuario, '$nm_usuario', '$data_de_nascimento', '$email_usuario', '$senha_usuario', $cd_personalidade, $cd_foto_perfil)";
        
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