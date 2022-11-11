create database db_monkers_enter
default character set utf8
default collate utf8_general_ci;

use db_monkers_enter;

CREATE TABLE tbl_Uf (
cd_uf int PRIMARY KEY auto_increment,
nm_uf varchar(40) not null
) default charset utf8;

CREATE TABLE tbl_Cidade (
cd_cidade int PRIMARY KEY auto_increment,
nm_cidade varchar(40) not null,
cd_uf int not null,
Constraint FOREIGN KEY(cd_uf) REFERENCES tbl_Uf (cd_uf)
) default charset utf8;

CREATE TABLE tbl_Endereco (
cd_endereco int PRIMARY KEY auto_increment,
logradouro_endereco varchar(60) not null,
cep_endereco char(8) not null,
complemento_endereco varchar(60) null,
bairro_endereco varchar(40) not null,
numero_endereco varchar(6) not null,
cd_cidade int not null,
Constraint FOREIGN KEY(cd_cidade) REFERENCES tbl_Cidade (cd_cidade)
) default charset utf8;

CREATE TABLE tbl_Franquia (
cd_franquia int PRIMARY KEY auto_increment,
nm_franquia varchar(40) not null
) default charset utf8;

CREATE TABLE tbl_Cinema (
cd_cinema int PRIMARY KEY auto_increment,
nm_cinema varchar(60) not null,
cd_franquia int not null,
cd_endereco int not null,
Constraint FOREIGN KEY(cd_franquia) REFERENCES tbl_Franquia (cd_franquia),
Constraint FOREIGN KEY(cd_endereco) REFERENCES tbl_Endereco (cd_endereco)
) default charset utf8;

CREATE TABLE tbl_Ingresso (
cd_ingresso int PRIMARY KEY auto_increment,
valor_servico decimal(10,2) not null,
preco_inteira decimal(10,2) not null,
cd_filme int not null, 
Constraint FOREIGN KEY(cd_filme) REFERENCES tbl_Cinema(cd_cinema)
) default charset utf8;

CREATE TABLE tbl_Filme (
cd_filme int PRIMARY KEY auto_increment,
nm_filme varchar(60) not null
) default charset utf8;

CREATE TABLE tbl_Genero (
cd_genero int PRIMARY KEY auto_increment,
nm_genero varchar(60) not null
) default charset utf8;

CREATE TABLE tbl_Categoria_Personalidade (
cd_categoria int PRIMARY KEY auto_increment,
nm_categoria_personalidade varchar(60) not null
) default charset utf8;

CREATE TABLE tbl_Personalidade (
cd_personalidade int PRIMARY KEY,
nm_personalidade  varchar(60) not null,
cd_categoria int not null,
Constraint FOREIGN KEY(cd_categoria) REFERENCES tbl_Categoria_Personalidade (cd_categoria)
) default charset utf8;

CREATE TABLE tbl_Foto_Perfil (
cd_foto_perfil int PRIMARY KEY auto_increment,
url_foto_perfil varchar(90) not null
) default charset utf8;

CREATE TABLE tbl_Usuario (
cd_usuario int PRIMARY KEY auto_increment,
nome_usuario varchar(90) not null,
data_de_nascimento date null,
email_usuario varchar(90) not null,
senha_usuario varchar(15) not null,
cd_personalidade int,
cd_foto_perfil int not null,
Constraint FOREIGN KEY(cd_personalidade) REFERENCES tbl_Personalidade (cd_personalidade),
Constraint FOREIGN KEY(cd_foto_perfil) REFERENCES tbl_Foto_Perfil (cd_foto_perfil)
) default charset utf8;

CREATE TABLE tbl_Genero_Filme (
cd_genero int not null,
cd_filme int not null,
Constraint FOREIGN KEY(cd_genero) REFERENCES tbl_Genero (cd_genero),
Constraint FOREIGN KEY(cd_filme) REFERENCES tbl_Filme (cd_filme),
Constraint primary key(cd_genero, cd_filme)
) default charset utf8;

CREATE TABLE tbl_Ingresso_Cinema (
cd_cinema int not null,
cd_ingresso int not null,
Constraint FOREIGN KEY(cd_cinema) REFERENCES tbl_Cinema (cd_cinema),
Constraint FOREIGN KEY(cd_ingresso) REFERENCES tbl_Ingresso (cd_ingresso),
Constraint primary key(cd_cinema, cd_ingresso)
) default charset utf8;

CREATE TABLE tbl_Genero_Usuario (
cd_genero int not null,
cd_usuario int not null,
Constraint FOREIGN KEY(cd_genero) REFERENCES tbl_Genero (cd_genero),
Constraint FOREIGN KEY(cd_usuario) REFERENCES tbl_Usuario (cd_usuario),
Constraint primary key(cd_genero, cd_usuario)
) default charset utf8;

Insert into tbl_Foto_Perfil values
(default, 'https://api-monkers-entertainment.000webhostapp.com/foto-perfil.png');

select * from tbl_Foto_Perfil;

Insert into tbl_Usuario (cd_usuario, nome_usuario, email_usuario, senha_usuario, cd_foto_perfil) values 
(default, 'Raur', 'raur@gmail.com', 'ruarEstranho', 1);

create view vw_consultaDadosLogin
	as
	select
	usu.cd_usuario,
	usu.nome_usuario,
	usu.email_usuario,
	usu.senha_usuario,
	ft.cd_foto_perfil,
	ft.url_foto_perfil
	from tbl_Usuario as usu inner join tbl_Foto_Perfil as ft
	on usu.cd_foto_perfil = ft.cd_foto_perfil;

drop procedure if exists sp_consultaDadosLogin_Com_Email_E_Senha;
	delimiter $$
create procedure sp_consultaDadosLogin_Com_Email_E_Senha
	(
		in vEmail_usuario varchar(90),
		in vSenha_usuarioint varchar(15)
	)
	begin
		select * from vw_consultaDadosLogin 
        where email_usuario = vEmail_usuario
        and senha_usuario = vSenha_usuarioint;
	end $$
		delimiter ;

drop procedure if exists sp_consultaDadosLogin_Com_Usuario_E_Senha;
	delimiter $$
create procedure sp_consultaDadosLogin_Com_Usuario_E_Senha
	(
		in vNome_usuario varchar(90),
		in vSenha_usuarioint varchar(15)
	)
	begin
		select * from vw_consultaDadosLogin 
        where nome_usuario = vNome_usuario
        and senha_usuario = vSenha_usuarioint;
	end $$
		delimiter ;
        
call sp_consultaDadosLogin_Com_Email_E_Senha('raur@gmail.com', 'ruarEstranho');
call sp_consultaDadosLogin_Com_Usuario_E_Senha('Raur', 'ruarEstranho');
