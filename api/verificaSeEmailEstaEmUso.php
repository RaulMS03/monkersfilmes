<?php

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    
    $connection_string = mysqli_connect("db4free.net", "monkersenter", "47735428", "db_monkers_enter")
    or die 
    ("Problema ao conecter-se ao servidor.");

    $email_usuario = $_GET['email_usuario'];

    if (!$connection_string) {
        echo "Não foi possível conectar ao banco MySQL."; 
        exit;
    } else {
        echo "Parabéns!! A conexão ao banco de dados ocorreu normalmente!.";
    }

    mysqli_close($connection_string);
}

?>