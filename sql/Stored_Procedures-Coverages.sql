

-- =================================================
-- INDICE.-
--
-- 01. sp_coverages_list_all
-- 02. sp_coverages_list_byId
-- 03. sp_coverages_insert
-- 04. sp_coverages_update
-- 05. sp_coverages_delete
-- 06. sp_coverages_update_pictureless
-- 07. sp_coverages_image_byId
-- 08. sp_coverages_list_byName
-- =================================================

GO
-- =================================================
-- 01. sp_coverages_list_all
--
-- Description:	<Listado de todas las coverturas
-- =================================================
CREATE OR ALTER PROCEDURE sp_coverages_list_all

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name] FROM tb_coverages
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
CREATE OR ALTER PROCEDURE sp_coverages_list_byId(
	@id TINYINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name] FROM tb_coverages
		WHERE [state] = 1 
		AND [id] = @id
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 03. sp_coverages_insert
--
-- Description:	<Insercion de una covertura
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_insert(
	@name VARCHAR(25),
	@picture VARBINARY(MAX)
)

AS
	BEGIN
		INSERT INTO tb_coverages([name], [picture]) 
		VALUES (@name, @picture);
		RETURN SCOPE_IDENTITY();
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
CREATE OR ALTER PROCEDURE sp_coverages_delete(
	@id TINYINT
)
AS
	BEGIN
		UPDATE tb_coverages 
		SET [state] = 0
		WHERE [id] = @id
		AND [state] = 1;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 06. sp_coverages_update_pictureless
--
-- Description:	<Actualizacion de una covertura sin imagen>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_update_pictureless(
	@id TINYINT,
	@name VARCHAR(25)
)
AS
	BEGIN
		UPDATE tb_coverages
		SET [name] = @name
		WHERE [id] = @id;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 07. sp_coverages_image_byId
--
-- Description:	<Obtencion de imagen por id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_image_byId(
	@id TINYINT
)
AS
	BEGIN
		SELECT [picture]
		FROM tb_coverages
		WHERE [id] = @id;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 08. sp_coverages_list_byName
--
-- Description:	<Obtencion de una covertura segun su nombre>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_coverages_list_byName(
	@name VARCHAR(25)
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name]
		FROM tb_coverages
		WHERE [state] = 1 
		AND [name] = @name 
	END
GO
---------------------------------------------------------