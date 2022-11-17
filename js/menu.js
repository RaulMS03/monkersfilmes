let show = true;

const menuSection = document.querySelector(".dropdown-perfil");
const dropDown = document.querySelector(".menu-perfil");
const liSair = document.getElementById("menu-sair");

menuSection.addEventListener("click", () =>{
    document.body.style.overflow = show ? "hidden" : "initial";

    dropDown.classList.toggle("on", show);
    dropDown.style.left = '1370px';
    dropDown.style.top = '175px';
    dropDown.style.right = 'auto';
    dropDown.style.bottom = 'auto';

    show = !show;
});

liSair.addEventListener("click", () => {
    localStorage.removeItem('cd_usuario');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('email_usuario');
    localStorage.removeItem('senha_usuario');
    localStorage.removeItem('cd_foto_perfil');
    localStorage.removeItem('url_foto_perfil');
});