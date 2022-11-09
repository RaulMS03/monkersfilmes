const url = 'https://api-monkers-entertainment.000webhostapp.com/cadastraUsuario.php';
var parametros = new FormData();
parametros.append('senha_usuario', 'hello');
parametros.append('email_usuario', 'hello@gmail.com');
parametros.append('nm_usuario', 'brasileirr');

fetch(url, {
    method: "POST",
    body: parametros,
    mode: 'no-cors',
  })
  .then(function (response){ // pegando o resultado
    return response.json();
  }) 
  .then(function (data){
    console.log(data);
  });