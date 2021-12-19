

-- =================================================
-- INDICE.-
--
-- 01. sp_relation_ingredient_dishes_insert
-- 02. sp_relation_ingredient_dishes_delete
-- 03. sp_relation_ingredient_dishes_iterator

-- =================================================

GO
-- =================================================
-- 01. sp_relation_ingredient_dishes_insert
--
-- Description:	<Tabla de relacion entre ingredientes y platos>
-- =================================================
CREATE OR ALTER PROCEDURE sp_relation_ingredient_dishes_insert(
	@ingredient_id TINYINT,
	@dish_id SMALLINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		INSERT INTO tb_ingredients_dishes([ingredient_id], [dish_id]) 
		VALUES ( @ingredient_id, @dish_id);
	END
GO
---------------------------------------------------------

GO
-- =================================================
-- 02. sp_relation_ingredient_dishes_delete
--
-- Description:	<Elimina las relaciones de determinado platillo>
-- =================================================
CREATE OR ALTER PROCEDURE sp_relation_ingredient_dishes_delete(
	@dish_id SMALLINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		DELETE FROM tb_ingredients_dishes 
		WHERE [dish_id] = @dish_id;
	END
GO
---------------------------------------------------------


GO
-- =================================================
-- 03. sp_relation_ingredient_dishes_iterator
--
-- Description:	<Itera por cada ingrediente a insertar>
-- =================================================
CREATE OR ALTER PROCEDURE sp_relation_ingredient_dishes_iterator(
	@dish_id SMALLINT,
	@ingredients VARCHAR(250)
)
AS
	BEGIN
		-- Drop de tabla temporal si existiera.
		IF OBJECT_ID('tempdb..#temp_ingredients') IS NOT NULL
			BEGIN
				DROP TABLE #temp_ingredients
			END
		
		-- Reasignacion de la tabla temporal.
		SELECT Row_Number() over (Order By [value]) as [index], [value] INTO #temp_ingredients FROM String_split(@ingredients, ',');
		
		DECLARE @i TINYINT
		SET @i = 1
		WHILE (@i <= (select COUNT([value]) from #temp_ingredients)) 
		BEGIN
			DECLARE @ingredient_id TINYINT;
			SELECT @ingredient_id = VALUE FROM #temp_ingredients WHERE [index] = @i;
			
			IF  @ingredient_id != '' AND @ingredient_id is not null
				EXEC sp_relation_ingredient_dishes_insert @ingredient_id, @dish_id ;
			ELSE 
				RAISERROR(13006,11,1)
			SET @i = @i + 1
		END
	END
GO
---------------------------------------------------------