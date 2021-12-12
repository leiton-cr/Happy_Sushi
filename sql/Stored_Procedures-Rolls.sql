

-- =================================================
-- INDICE.-
--
-- 01. sp_rolls_list_all
-- 02. sp_rolls_list_byId
-- 03. sp_rolls_insert
-- 04. sp_rolls_update
-- 05. sp_rolls_delete
-- =================================================

GO
-- =================================================
-- 01. sp_rolls_list_all
--
-- Description:	<Listado de todos los rollos>
-- =================================================
CREATE OR ALTER PROCEDURE sp_rolls_list_all

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[price],[tempura],[coverage],[picture] FROM vw_all_rolls
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 02. sp_rolls_list_byId
--
-- Description:	<Obtencion de un rollo segun su id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_rolls_list_byId (
	@id TINYINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[price],[tempura],[coverage],[picture] FROM vw_all_rolls
		WHERE AND [id] = @id
	END
GO
---------------------------------------------------------
--------------------------------------------------------------------------------- FALTA HACER INSERT Y UPDATE
GO
-- ====================================================
-- 03. sp_rolls_insert
--
-- Description:	<Insercion de un rollo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_rolls_insert (
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)

AS
	BEGIN
		SET NOCOUNT ON;
		INSERT INTO tb_rolls ([name], [picture]) 
		VALUES (@name, @picture);
	END
GO
---------------------------------------------------------
GO
-- ====================================================
-- 04. sp_rolls_update
--
-- Description:	<Actualizacion de un rollo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_rolls_update (
	@id TINYINT,
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_rolls 
		SET [name] = @name, [picture] = @picture
		WHERE [id] = @id;
	END
GO
-------------------------------------------------------------
--------------------------------------------------------------------------------- FALTA HACER INSERT Y UPDATE
GO
-- ====================================================
-- 05. sp_rolls_delete
--
-- Description:	<Eliminado logico de un rollo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_rolls_delete (
	@id TINYINT
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_dishes 
		SET [state] = 0
		WHERE [id] = @id;

		UPDATE tb_rolls 
		SET [state] = 0
		WHERE [id] = @id;
	END
GO
--------------------------------------------------------------