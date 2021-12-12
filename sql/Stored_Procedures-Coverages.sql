

-- =================================================
-- INDICE.-
--
-- 01. sp_coverages_list_all
-- 02. sp_coverages_list_byId
-- 03. sp_coverages_insert
-- 04. sp_coverages_update
-- 05. sp_coverages_delete
-- =================================================

GO
-- =================================================
-- 01. sp_coverages_list_all
--
-- Description:	<Listado de todos los ingredientes>
-- =================================================
CREATE OR ALTER PROCEDURE sp_coverages_list_all

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[picture] FROM tb_coverages
		WHERE [state] = 1
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 02. sp_coverages_list_byId
--
-- Description:	<Obtencion de una covertura segun su id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_list_byId (
	@id TINYINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[picture] FROM tb_coverages
		WHERE [state] = 1 
		AND [id] = @id
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 03. sp_coverages_insert
--
-- Description:	<Insercion de una covertura>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_insert (
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)

AS
	BEGIN
		SET NOCOUNT ON;
		INSERT INTO tb_coverages ([name], [picture]) 
		VALUES (@name, @picture);
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 04. sp_coverages_update
--
-- Description:	<Actualizacion de una covertura>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_update (
	@id TINYINT,
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_coverages 
		SET [name] = @name, [picture] = @picture
		WHERE [id] = @id;
	END
GO
-------------------------------------------------------------

GO
-- ====================================================
-- 05. sp_coverages_delete
--
-- Description:	<Eliminado logico de una covertura>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_delete (
	@id TINYINT
)
AS
	BEGIN
		SET NOCOUNT ON;
		UPDATE tb_coverages SET [state] = 0
		WHERE [id] = @id;
	END
GO
--------------------------------------------------------------