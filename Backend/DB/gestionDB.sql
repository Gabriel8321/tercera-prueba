-- Vista para ver las ventas que se realizaron de forma mas detallada
create view vista_compras as
select c.rut as rut,
	   c.nom_c as comprador,
	   p.nom_p,
	   v.cantidad,
	   sum(p.precio * v.cantidad) as total,
	   v.fecha_compra
from venta v inner join cliente c on c.rut = v.rut
inner join producto p on p.codigo_p = v.codigo_p
group by c.rut, c.nom_c, c.apell_c, p.nom_p, v.cantidad, v.fecha_compra
order by c.rut;

select * from vista_compras;

-- Funcion para actualizar el stock, pero falta que se reinicie cuando llega a 0

create or replace function actualizar_stock()
returns trigger as $$
declare stock_actual int; 
begin
select stock into stock_actual from producto where codigo_p =new.codigo_p for update;

if new.cantidad > stock_actual then
	raise exception 'stock vacio para el producto ID: %', new.codigo_p;
end if;
 
update producto
	set stock = stock - new.cantidad
	where codigo_p = new.codigo_p;

return new;
END;
$$ language plpgsql;

-- El trigger que llamara a la funcion

create trigger trg_actualizar_stock
before insert on venta for each row
execute function actualizar_stock();

-- Para probar la funcion
insert into venta (cantidad, fecha_compra, rut, codigo_p) values
(3, '2025-11-20', '11111111-1', 'P001');
insert into venta (cantidad, fecha_compra, rut, codigo_p) values
(2, '2025-11-20', '11111111-1', 'P001');

select stock from producto;

-- Procedimiento simple para aumentar precio (no se me ocurria nada mas)

create or replace procedure Aumentar_precio(porcentaje int)
language plpgsql
as $$

begin
    UPDATE producto
    SET precio = precio * (1 + porcentaje/100)
	where precio is not null;
END;
$$;

select nom_p, precio from producto;
call Aumentar_precio(10);