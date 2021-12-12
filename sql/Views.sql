
-- =================================================
-- INDICE.-
--
-- 01. vw_all_rolls

-- =================================================


-- =================================================
-- 01. vw_all_rolls
--
-- Description:	<Lista de todos los rolls con join
--				 para visualizar coverturas>
-- =================================================
CREATE VIEW vw_all_rolls
AS SELECT d.[id],d.[name],d.[price],d.[picture], r.[tempura], c.[name] as coverage
FROM tb_dishes as d inner join tb_rolls as r
ON d.id = r.id
INNER JOIN tb_coverages as c
ON r.coverage = c.id 
WHERE d.state = 1;