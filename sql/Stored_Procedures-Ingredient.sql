

-- =================================================
-- INDICE.-
--
-- 01. sp_ingredients_list_all
-- 02. sp_ingredients_list_byType
-- 03. sp_ingredients_list_byId
-- 04. sp_ingredients_insert
-- 05. sp_ingredients_update
-- 06. sp_ingredients_delete
-- 07. sp_ingredients_update_pictureless
-- 08. sp_ingredients_image_byId
-- 09. sp_ingredients_list_byName
-- =================================================

GO
-- =================================================
-- 01. sp_ingredients_list_all
--
-- Description:	<Listado de todos los ingredientes>
-- =================================================
CREATE OR ALTER PROCEDURE sp_ingredients_list_all

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[type] FROM tb_ingredients
		WHERE [state] = 1
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 02. sp_ingredients_list_byType
--
-- Description:	<Listado de ingredientes segun su tipo>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_list_byType (
	@type VARCHAR(4)
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[type] FROM tb_ingredients
		WHERE [state] = 1 
		AND [type] = @type
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 03. sp_ingredients_list_byId
--
-- Description:	<Obtencion de ingrediente segun su id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_list_byId (
	@id TINYINT
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[type] FROM tb_ingredients
		WHERE [state] = 1 
		AND [id] = @id
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 04. sp_ingredients_insert
--
-- Description:	<Insercion de un ingrediente>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_insert (
	@name VARCHAR(25),
	@type VARCHAR(4),
	@picture VARBINARY(MAX)
)

AS
	BEGIN
		INSERT INTO tb_ingredients ([name], [type], [picture]) 
		VALUES (@name, @type, @picture);
		RETURN SCOPE_IDENTITY();
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 05. sp_ingredients_update
--
-- Description:	<Actualizacion de un ingrediente>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_update (
	@id TINYINT,
	@name VARCHAR(25),
	@type VARCHAR(4),
	@picture VARBINARY(MAX)
)
AS
	BEGIN
		UPDATE tb_ingredients 
		SET [name] = @name, [type] = @type, [picture] = @picture
		WHERE [id] = @id;
	END
GO
-------------------------------------------------------------

GO
-- ====================================================
-- 06. sp_ingredients_delete
--
-- Description:	<Eliminado logico de un ingrediente>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_delete (
	@id TINYINT
)
AS
	BEGIN
		UPDATE tb_ingredients SET [state] = 0
		WHERE [id] = @id
		AND [state] = 1;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 07. sp_ingredients_update_pictureless
--
-- Description:	<Actualizacion de un ingrediente sin imagen>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_update_pictureless (
	@id TINYINT,
	@name VARCHAR(25),
	@type VARCHAR(4)
)
AS
	BEGIN
		UPDATE tb_ingredients 
		SET [name] = @name, [type] = @type
		WHERE [id] = @id;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 08. sp_ingredients_image_byId
--
-- Description:	<Obtencion de imagen por id>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_image_byId (
	@id TINYINT
)
AS
	BEGIN
		SELECT [picture]
		FROM tb_ingredients
		WHERE [id] = @id;
	END
GO
---------------------------------------------------------

GO
-- ====================================================
-- 09. sp_ingredients_list_byName 
--
-- Description:	<Obtencion de ingrediente segun su nombre>
-- ====================================================
CREATE OR ALTER PROCEDURE sp_ingredients_list_byName (
	@name VARCHAR(25)
)

AS
	BEGIN
		SET NOCOUNT ON;
		SELECT [id],[name],[type] FROM tb_ingredients
		WHERE [state] = 1 
		AND [name] = @name 
	END
GO
---------------------------------------------------------