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

    $nm_usuario = $_GET['nm_usuario'];
    $email_usuario = $_GET['email_usuario'];
    $senha_usuario = $_GET['senha_usuario'];
    $response = [];
    $dadosUsuario = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "Select * from tbl_Usuario 
        where email_usuario = '$email_usuario' and senha_usuario = '$senha_usuario'";

        $result = mysqli_query($connection_string, $cmd); 
        $busca_por_email_e_senha = mysqli_num_rows($result);

        $cmd = "Select * from tbl_Usuario 
        where nome_usuario = '$nm_usuario' and senha_usuario = '$senha_usuario'";

        $result = mysqli_query($connection_string, $cmd);
        $busca_por_nome_usuario_e_senha = mysqli_num_rows($result);

        if($busca_por_email_e_senha != 0 || $busca_por_nome_usuario_e_senha != 0) {
            if($busca_por_email_e_senha != 0)
                $cmd = "call sp_consultaDadosLogin_Com_Email_E_Senha('$email_usuario', '$senha_usuario')";
            else 
                $cmd = "call sp_consultaDadosLogin_Com_Usuario_E_Senha('$nm_usuario', '$senha_usuario')";

            $stmt = $connection_string->prepare($cmd);
            $stmt->execute();
            $stmt->bind_result($cd_usuario, $nome_usuario, $data_de_nascimento, $email_usuario, $senha_usuario, 
            $cd_personalidade, $cd_foto_perfil, $url_foto_perfil);

            while($stmt->fetch())
            {
                $temp = [
                    'cd_usuario' => $cd_usuario,
                    'nome_usuario' => $nome_usuario,
                    'data_de_nascimento' => $data_de_nascimento,
                    'email_usuario' => $email_usuario,
                    'senha_usuario' => $senha_usuario,
                    'cd_personalidade' => $cd_personalidade,
                    'cd_foto_perfil' => $cd_foto_perfil, 
                    'url_foto_perfil' => $url_foto_perfil
                ];
                array_push($dadosUsuario, $temp);
            }

            $response = [
                'response' => 'True',
                'data' => $dadosUsuario[0]
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