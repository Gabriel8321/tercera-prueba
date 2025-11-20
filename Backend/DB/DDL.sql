create database Tecno_tienda;

create table cliente (rut varchar(10) primary key not null, nom_c varchar(20),
apell_c varchar(20), fono_c varchar(10), direcc varchar(20)); 

-- ???? ¿Agregamos un numero de stock para realizarle un trigger?
create table producto (codigo_p varchar(10) primary key not null, nom_p varchar(40),
tipo varchar(20),stock int, precio numeric(10), imagen_url VARCHAR); 


-- ???? ¿Agregamos una fecha de compra? (Con el fin de poder vincular compras de multiples productos en un mismo dia por el mismo usuario)
create table venta (id_v serial primary key not null, cantidad int not null,
rut varchar(10) not null, codigo_p varchar(10) not null, fecha_compra date,
foreign key (rut) references cliente(rut),
foreign key (codigo_p) references producto(codigo_p));

