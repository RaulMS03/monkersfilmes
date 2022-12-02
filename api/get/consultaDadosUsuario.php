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

    $cd_usuario = $_GET['cd_usuario'];
    $response = [];
    $dadosUsuario = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "Select * from vw_consultaDadosUsuario 
        where cd_usuario = '$cd_usuario'";

        $result = mysqli_query($connection_string, $cmd);
        $busca_por_dados = mysqli_num_rows($result);

        if($busca_por_dados != 0) {
            $cmd = "call sp_consultaDadosUsuarioPorId('$cd_usuario')";

            $stmt = $connection_string->prepare($cmd);
            $stmt->execute();
            $stmt->bind_result($cd_usuario, $nome_usuario, $data_de_nascimento, $email_usuario,
            $senha_usuario, $cd_foto_perfil, $url_foto_perfil);

            while($stmt->fetch())
            {
                $temp = [
                    'cd_usuario' => $cd_usuario,
                    'nome_usuario' => $nome_usuario,
                    'data_de_nascimento' => $data_de_nascimento,
                    'email_usuario' => $email_usuario,
                    'senha_usuario' => $senha_usuario,
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