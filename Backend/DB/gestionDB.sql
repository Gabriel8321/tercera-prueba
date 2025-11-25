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
order by v.fecha_compra;

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

-- Procedimiento que cambia precio 

create or replace procedure cambiar_precio(p_codigo_p varchar, p_new_precio numeric)
language plpgsql as $$

begin
    update producto
    set precio = p_new_precio
   	where codigo_p = p_codigo_p;
end;
$$;

-- Para probar el procedimiento 
call cambiar_precio('P002', 3000);

select codigo_p, nom_p, precio from producto;