function validaDadosUsuario (){
  let nomeUsuario = document.getElementById("nome-usuario").value.split(' ').join('');
  let emailUsuario = document.getElementById("email-usuario").value.split(' ').join(''); 
  let senhaUsuario = document.getElementById("senha-usuario").value.split(' ').join(''); 

  let mensagemAlert = '';

  if(nomeUsuario.length > 90)
    mensagemAlert += 'O nome de usuário deve ter no máximo 90 caracteres.\n';

  if(emailUsuario.length > 90)
    mensagemAlert += 'O email deve ter no máximo 90 caracteres.\n';

  if(senhaUsuario.length > 15)
    mensagemAlert += 'A senha deve ter no máximo 15 caracteres.'

  if(!mensagemAlert.length > 0){
    cadastraUsuario(nomeUsuario, emailUsuario, senhaUsuario) 
  } else { 
    document.getElementById('alerta-cadastro').innerText = mensagemAlert;
    document.getElementById('alerta-cadastro').style.display = 'block';
  }
}

function cadastraUsuario(nomeUsuario, emailUsuario, senhaUsuario){
  const url = 'https://api-monkers-entertainment.000webhostapp.com/cadastraUsuario.php';
  
  let parametros = new FormData();
  
  parametros.append('nm_usuario', nomeUsuario);
  parametros.append('email_usuario', emailUsuario);
  parametros.append('senha_usuario', senhaUsuario);

  fetch(url, {
      method: "POST",
      body: parametros,
    })
    .then(function (response){ // pegando o resultado
      return response.json();
    }) 
    .then(function (data){
      if(data.response == "True"){
        document.getElementById('alerta-cadastro').style.display = 'none';
        document.getElementById('sucesso-cadastro').innerText = 'Sucesso ao se cadastrar.';
        document.getElementById('sucesso-cadastro').style.display = 'block';
        sessionStorage.setItem('emailUsuario', emailUsuario);
        sessionStorage.setItem('senhaUsuario', senhaUsuario);
        window.location.href = "../Login/login.html";
      } else {
        document.getElementById('alerta-cadastro').innerText = 'Erro ao se cadastrar.';
        document.getElementById('alerta-cadastro').style.display = 'block'; 
      }
    });
}