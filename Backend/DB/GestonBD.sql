--Vista
create view vista_compras as
select c.rut as rut,
	   c.nom_c as nombre_comprador,
	   p.nom_p as nombre_producto,
	   cantidad,
	   sum(p.precio * v.cantidad) as total
from venta v inner join cliente c on c.rut = v.rut
inner join producto p on p.codigo_p = v.codigo_p
group by c.rut, c.nom_c, p.nom_p, v.cantidad;

select * from vista_compras;




-- Trigger
CREATE OR REPLACE FUNCTION stock_producto()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE producto p
    SET p.stock = p.stock - NEW.stock
    WHERE p.cod_p = NEW.p.cod_p;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_stock_producto
AFTER INSERT ON stock
FOR EACH ROW
EXECUTE FUNCTION stock_producto()