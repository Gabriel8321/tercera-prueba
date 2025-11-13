create database Tecno tienda;

create table cliente (rut varchar(10) primary key not null, nom_c varchar(20),
apell_c varchar(20), fono_c varchar(10), direcc varchar(20)); 

-- ???? ¿Agregamos un numero de stock para realizarle un trigger?
create table producto (codigo_p varchar(10) primary key not null, nom_p varchar(40),
tipo varchar(20), precio numeric(10), imagen_url VARCHAR); 


-- ???? ¿Agregamos una fecha de compra? (Con el fin de poder vincular compras de multiples productos en un mismo dia por el mismo usuario)
create table venta (id_v varchar(10) primary key not null, cantidad int not null,
rut varchar(10) not null, codigo_p varchar(10) not null,
foreign key (rut) references cliente(rut),
foreign key (codigo_p) references producto(codigo_p));

-- ???? ¿Que tal si agregamos una nueva tabla para realizar reseñas de los productos?

CREATE TABLE reseñas (id_r VARCHAR(10) PRIMARY KEY NOT NULL, producto VARCHAR(10) NOT NULL, valoracion NUMERIC(2,1) NOT NULL CHECK (valoracion BETWEEN 0 AND 5), usuario VARCHAR(10) NOT NULL,
FOREIGN KEY (producto) REFERENCES producto(codigo_p),
FOREIGN KEY (usuario) REFERENCES cliente(rut));
