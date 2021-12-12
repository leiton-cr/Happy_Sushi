

-- =================================================
-- INDICE.-
--
-- 01. sp_dishes_list_all
-- 02. sp_dishes_list_byId
-- 03. sp_dishes_insert
-- 04. sp_dishes_update
-- 05. sp_dishes_delete
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
	@id TINYINT
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
--------------------------------------------------------------------------------- FALTA HACER INSERT Y UPDATE
GO
-- ====================================================
-- 03. sp_dishes_insert
--
-- Description:	<Insercion de un platillo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_insert (
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)

AS
	BEGIN
		SET NOCOUNT ON;
		INSERT INTO tb_dishes ([name], [picture]) 
		VALUES (@name, @picture);
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
	@id TINYINT,
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_dishes 
		SET [name] = @name, [picture] = @picture
		WHERE [id] = @id;
	END
GO
-------------------------------------------------------------
--------------------------------------------------------------------------------- FALTA HACER INSERT Y UPDATE
GO
-- ====================================================
-- 05. sp_dishes_delete
--
-- Description:	<Eliminado logico de un platillo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_dishes_delete (
	@id TINYINT
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_dishes SET [state] = 0
		WHERE [id] = @id;
	END
GO
--------------------------------------------------------------