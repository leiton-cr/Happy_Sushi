

-- =================================================
-- INDICE.-
--
-- 01. sp_dishes_list_all
-- 02. sp_dishes_list_byId
-- 03. sp_dishes_insert
-- 04. sp_dishes_update
-- 05. sp_dishes_delete
-- 06. sp_dishes_update_pictureless
-- 07. sp_dishes_image_byId
-- 08. sp_dishes_list_byName

-- =================================================

GO
-- =================================================
-- 01. sp_dishes_list_all
--
-- Description:	<Listado de todos los platillos>
-- =================================================
CREATE OR ALTER PROCEDURE sp_dishes_list_all

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[price],[picture] FROM tb_dishes
		WHERE [state] = 1 AND [id] NOT IN (SELECT [id] from tb_rolls)
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 02. sp_dishes_list_byId
--
-- Description:	<Obtencion de un platillo segun su id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_list_byId (
	@id SMALLINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[price],[picture] FROM tb_dishes
		WHERE [state] = 1 
		AND [id] = @id
		AND [id] NOT IN (SELECT [id] from tb_rolls)
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 03. sp_dishes_insert
--
-- Description:	<Insercion de un platillo>
-- ====================================================

CREATE OR ALTER PROCEDURE sp_dishes_insert (
	@name VARCHAR(25),
	@price INT,
	@picture VARBINARY(MAX),
	@ingredients VARCHAR(250)
)

AS
	BEGIN
		
		INSERT INTO tb_dishes ([name], [picture], [price]) 
		VALUES (@name, @picture, @price);
		
		SET NOCOUNT ON;
		-- Obtencion de variable ingresada.
		DECLARE @dish_id smallint = SCOPE_IDENTITY();
	
		EXEC sp_relation_ingredient_dishes_iterator @dish_id, @ingredients;
		
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 04. sp_dishes_update
--
-- Description:	<Actualizacion de un platillo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_update (
	@id SMALLINT,
	@name VARCHAR(25),
	@price INT,
	@picture VARBINARY(MAX),
	@ingredients VARCHAR(250)
)
AS
	BEGIN
		UPDATE tb_dishes 
		SET [name] = @name, [price] = @price, [picture] = @picture
		WHERE [id] = @id;

		SET NOCOUNT ON;

		EXEC sp_relation_ingredient_dishes_delete @id;

		EXEC sp_relation_ingredient_dishes_iterator @id, @ingredients;

	END
GO
-------------------------------------------------------------

GO
-- ====================================================
-- 05. sp_dishes_delete
--
-- Description:	<Eliminado logico de un platillo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_delete (
	@id SMALLINT
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_dishes SET [state] = 0
		WHERE [id] = @id
		AND [state] = 1;
	END
GO
--------------------------------------------------------------

GO
-- ====================================================
-- 06. sp_dishes_update_pictureless
--
-- Description:	<Actualizacion de un platillo sin actualizar foto>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_update_pictureless (
	@id SMALLINT,
	@name VARCHAR(25),
	@price INT,
	@ingredients VARCHAR(250)
)
AS
	BEGIN
		UPDATE tb_dishes 
		SET [name] = @name, [price] = @price
		WHERE [id] = @id;

		SET NOCOUNT ON;

		EXEC sp_relation_ingredient_dishes_delete @id;

		EXEC sp_relation_ingredient_dishes_iterator @id, @ingredients;

	END
GO
-------------------------------------------------------------


GO
-- ====================================================
-- 07. sp_dishes_image_byId
--
-- Description:	<Obtencion de imagen por id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_image_byId (
	@id SMALLINT
)
AS
	BEGIN
		SELECT [picture]
		FROM tb_dishes
		WHERE [id] = @id;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 08. sp_dishes_list_byName 
--
-- Description:	<Obtencion de platillo segun su nombre>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_list_byName (
	@name VARCHAR(25)
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[price] FROM tb_dishes
		WHERE [state] = 1 
		AND [name] = @name 
	END
GO
---------------------------------------------------------