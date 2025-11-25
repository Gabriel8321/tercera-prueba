create database Tecno_tienda;

create table cliente (rut varchar(10) primary key not null, nom_c varchar(20),
apell_c varchar(20), fono_c varchar(10), direcc varchar(20)); 

create table producto (codigo_p varchar(10) primary key not null, nom_p varchar(40),
tipo varchar(20), precio numeric(10) CHECK (precio>0), stock int CHECK (stock>=0), imagen_url VARCHAR); 

create table venta (id_v serial primary key not null, cantidad int not null CHECK (cantidad>0), fecha_compra date, 
rut varchar(10) not null, codigo_p varchar(10) not null,
foreign key (rut) references cliente(rut),
foreign key (codigo_p) references producto(codigo_p));
