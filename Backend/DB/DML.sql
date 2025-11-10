insert into cliente (rut, nom_c, apell_c, fono_c, direcc) values
('11111111-1', 'Juan',   'Pérez',    '912345678', 'Santiago'),
('22222222-2', 'María',  'López',    '987654321', 'Valparaíso'),
('33333333-3', 'Pedro',  'González', '956789123', 'Concepción'),
('44444444-4', 'Ana',    'Martínez', '976543210', 'La Serena'),
('55555555-5', 'Luis',   'Ramírez',  '945612378', 'Antofagasta');

-- ???? ¿Agregamos un numero de stock al que realizarle un trigger?
insert into producto (codigo_p, nom_p, tipo, precio, imagen_url) values
('P001', 'Notebook HP',     'Electrónica', 550000, 'Assets/IMG/Notebook_HP.png'),
('P002', 'Mouse Logitech',  'Accesorio',    15000, 'Assets/IMG/Mouse_logitech.jpg'),
('P003', 'Teclado Mecánico','Accesorio',    35000, 'Assets/IMG/Teclado_mecanico.jpg'),
('P004', 'Monitor LG 24"',  'Electrónica', 120000, 'Assets/IMG/Monitor_LG_24.jpg'),
('P005', 'Impresora Epson', 'Oficina',      85000, 'Assets/IMG/Impresora_Epson.jpg');

insert into venta (id_v, cantidad, rut, codigo_p) values
('V001', 1, '11111111-1', 'P001'),
('V002', 2,  '22222222-2', 'P002'),
('V003', 1, '33333333-3', 'P004'),
('V004', 3, '44444444-4', 'P003'),
('V005', 1, '55555555-5', 'P005');

INSERT INTO reseñas (id_r, producto, valoracion, usuario) values
();

-- !!!! Si vamos a realizar reseñas de productos, faltarian agregar algunas que existan por predeterminado
-- ???? ¿Y tal vez falten agregar más productos para la pagina? 5 son muy pocos actualmente