insert into cliente (rut, nom_c, apell_c, fono_c, direcc) values
('11111111-1', 'Juan',   'Pérez',    '912345678', 'Santiago'),
('22222222-2', 'María',  'López',    '987654321', 'Valparaíso'),
('33333333-3', 'Pedro',  'González', '956789123', 'Concepción'),
('44444444-4', 'Ana',    'Martínez', '976543210', 'La Serena'),
('55555555-5', 'Luis',   'Ramírez',  '945612378', 'Antofagasta');

-- ???? ¿Agregamos un numero de stock al que realizarle un trigger?
insert into producto (codigo_p, nom_p, tipo, stock, precio, imagen_url) values
('P001', 'Notebook HP',     'Electrónica', 5, 569990, 'Assets/IMG/Notebook_HP.png'),
('P002', 'Mouse Logitech',  'Accesorio', 5,    14990, 'Assets/IMG/Mouse_logitech.jpg'),
('P003', 'Teclado Mecánico','Accesorio', 5,     35500, 'Assets/IMG/Teclado_mecanico.jpg'),
('P004', 'Monitor LG 24"',  'Electrónica', 5, 119990, 'Assets/IMG/Monitor_LG_24.jpg'),
('P005', 'Impresora Epson', 'Oficina', 5,      105990, 'Assets/IMG/Impresora_Epson.jpg'),
('P006', 'Parlante PC Xtech 2.0', 'Accesorio', 5, 26990, 'Assets/IMG/Parlante_PC_Xtech 2.0.jpg'),
('P007', 'Notebook IdeaPad 1 Intel Core', 'Electronica', 5, 609990, 'Assets/IMG/Notebook_IdeaPad1_Intel_Core_i3.jpg'),
('P008', 'RAM DDR4 16GB-2666MT/s Dual Rank Modul', 'Componente', 5, 58990, 'Assets/IMG/RAM_DDR4_16GB.jpg'),
('P009', 'RAM DDR4 8GB 3200MHZ so-dimm', 'Componente', 5, 39990, 'Assets/IMG/RAM_DDR4_16GB.jpg'),
('P010', 'Tarjeta madre Intel H610', 'Componente', 5, 72990, 'Assets/IMG/Tarjeta_Madre_Intel_H610.png');


insert into venta (cantidad, fecha_compra, rut, codigo_p) values
(1, '2025-11-20', '11111111-1', 'P001'),
(2, '2025-07-10',  '22222222-2', 'P002'),
(1, '2025-10-28', '33333333-3', 'P004'),
(3, '2025-09-14', '44444444-4', 'P003'),
(1, '2025-06-11', '55555555-5', 'P005');

-- !!!! Si vamos a realizar reseñas de productos, faltarian agregar algunas que existan por predeterminado
-- ???? ¿Y tal vez falten agregar más productos para la pagina? 5 son muy pocos actualmente