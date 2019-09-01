CREATE DATABASE {{@dbname}}
GO
USE {{@dbname}}
GO

--Tables
CREATE TABLE [Culture](
CultureId int identity(1,1) NOT NULL,
[Name] nvarchar(50) NOT NULL,
[Value] nvarchar(50) NOT NULL,
[Active] bit NOT NULL,
[Flag] nvarchar(40) NOT NULL,
InUse bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_Culture PRIMARY KEY (CultureId)
)

CREATE TABLE [Resource](
ResourceId int identity(1,1) NOT NULL,
[Name] nvarchar(50) NOT NULL,

CONSTRAINT PK_Resource PRIMARY KEY (ResourceId)
)

CREATE TABLE [Translate](
TranslateId int IDENTITY(1,1) NOT NULL,
CultureId int NOT NULL,
ResourceId int NOT NULL,
[Value] nvarchar(500) NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_Translate PRIMARY KEY (TranslateId),
CONSTRAINT FK_Culture_Translate FOREIGN KEY (CultureId) REFERENCES Culture(CultureId),
CONSTRAINT FK_Resource_Translate FOREIGN KEY (ResourceId) REFERENCES [Resource](ResourceId)
)

CREATE TABLE ProductType(
ProductTypeId int identity(1,1) NOT NULL,
ParentId int NULL,
[Name] nvarchar(50) NOT NULL,
[Active] bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,
IndGuid uniqueidentifier NULL,
ParentGuid uniqueidentifier NULL

CONSTRAINT PK_ProductType PRIMARY KEY (ProductTypeId)
CONSTRAINT FK_ProductType_ProductType FOREIGN KEY (ParentId) REFERENCES ProductType(ProductTypeId),
)

CREATE TABLE Product(
ProductId int identity(1,1) NOT NULL,
[Name] nvarchar(300) NOT NULL,
[Code] nvarchar(100) NOT NULL,
ProductTypeId int NOT NULL,
Active bit NOT NULL,
sysDTCreated date NOT NULL,
sysDTEdit date NULL,
sysUserAddId int NOT NULL,
sysUserEditId int NULL,

CONSTRAINT PK_Product PRIMARY KEY (ProductId),
CONSTRAINT FK_ProductType_Product FOREIGN KEY (ProductTypeId) REFERENCES ProductType(ProductTypeId)
)

CREATE TABLE [Image](
ImageId int identity(1,1) NOT NULL,
[Path] nvarchar(200) NULL,
[Name] nvarchar(200) NOT NULL,
[Active] bit NOT NULL,
ProductId int NOT NULL,
sysDTCreated date NOT NULL,
sysDTEdit date NULL,
sysUserAddId int NOT NULL,
sysUserEditId int NULL,

CONSTRAINT PK_Image PRIMARY KEY (ImageId),
CONSTRAINT FK_Product_Image FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
)

CREATE TABLE [User](
UserId int identity(1,1) NOT NULL,
UserName nvarchar(100) NOT NULL,
[Password] nvarchar(100) NOT NULL,
Email nvarchar(100) NOT NULL,
[Active] bit NOT NULL,
sysDTCreated date NOT NULL,

CONSTRAINT PK_User PRIMARY KEY (UserId)
)

CREATE TABLE [Customer](
CustomerId int identity(1,1) NOT NULL,
FirstName nvarchar(100) NOT NULL,
LastName nvarchar(100) NOT NULL,
[Address] nvarchar(100) NOT NULL,
[Floor] nvarchar(20) NOT NULL,
Flat nvarchar(100) NOT NULL,
ContactNumber nvarchar(100) NOT NULL,
UserId int NOT NULL,
sysDTCreated date NOT NULL,

CONSTRAINT PK_Customer PRIMARY KEY (CustomerId)
)

CREATE TABLE Menu(
MenuId int identity(1,1) NOT NULL,
ParentId int NULL,
Code nvarchar(20) NOT NULL,
[Name] nvarchar(100) NOT NULL,
[Url] nvarchar(200) NOT NULL,
[Image] nvarchar(50) NULL,
Sort int NOT NULL,
Active bit NOT NULL,
sysDTCreated date NOT NULL,
sysDTEdit date NULL,
sysUserAddId int NOT NULL,
sysUserEditId int NULL,

CONSTRAINT PK_Menu PRIMARY KEY (MenuId),
CONSTRAINT FK_Menu_Menu FOREIGN KEY (ParentId) REFERENCES Menu(MenuId),
)

CREATE TABLE Permission(
PermissionId int identity(1,1) NOT NULL,
[Code] nvarchar(50) NOT NULL,
[Name] nvarchar(50) NOT NULL,
ParentId int NOT NULL,
[Active] bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_Permission PRIMARY KEY (PermissionId),
CONSTRAINT FK_Permission_Permission FOREIGN KEY (ParentId) REFERENCES Permission(PermissionId),
)

CREATE TABLE [Role](
RoleId int identity(1,1) NOT NULL,
[Code] nvarchar(50) NOT NULL,
[Name] nvarchar(50) NOT NULL,
[Active] bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_Role PRIMARY KEY (RoleId),
)

CREATE TABLE UserRole(
UserRoleId int identity(1,1) NOT NULL,
UserId int NOT NULL,
RoleId int NOT NULL,
Active bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_UserRole PRIMARY KEY (UserRoleId),
CONSTRAINT FK_User_UserRole FOREIGN KEY (UserId) REFERENCES [User](UserId),
CONSTRAINT FK_Role_UserRole FOREIGN KEY (RoleId) REFERENCES [Role](RoleId)
)

CREATE TABLE PermissionRole(
PermissionRoleId int identity(1,1) NOT NULL,
PermissionId int NOT NULL,
RoleId int NOT NULL,
Active bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_PermissionRole PRIMARY KEY (PermissionRoleId),
CONSTRAINT FK_Permission_PermissionRole FOREIGN KEY (PermissionId) REFERENCES [Permission](PermissionId),
)
INSERT INTO [User] (UserName, [Password], Email, Active, sysDTCreated) VALUES ('admin', PWDENCRYPT('123'), 'test@gmail.com', 1, GETDATE())
INSERT INTO [Role] ([Code], [Name], Active, sysDTCreated, sysUserAddId) VALUES ('1', 'Admin', 1, GETDATE(), 1)

CREATE TABLE MenuRole(
MenuRoleId int identity(1,1) NOT NULL,
MenuId int NOT NULL,
RoleId int NOT NULL,
Active bit NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL,

CONSTRAINT PK_MenuRole PRIMARY KEY (MenuRoleId),
CONSTRAINT FK_Menu_MenuRole FOREIGN KEY (MenuId) REFERENCES Menu(MenuId),
CONSTRAINT FK_Role_MenuRole FOREIGN KEY (RoleId) REFERENCES [Role](RoleId)
)

CREATE TABLE [Configuration](
ConfigurationId int identity(1,1) NOT NULL,
[Description] nvarchar(100) NULL,
[Name] nvarchar(50) NOT NULL,
[Value] nvarchar(100) NULL,
ParentId int NULL

CONSTRAINT PK_Configuration PRIMARY KEY (ConfigurationId)
)

CREATE TABLE Information(
InformationId int identity(1,1) NOT NULL,
[Value] nvarchar(max) NOT NULL,
Active bit NOT NULL,
ProductId int NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL

CONSTRAINT PK_Information PRIMARY KEY (InformationId),
CONSTRAINT FK_Product_Information FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
)

CREATE TABLE DocumentType(
DocumentTypeId int identity NOT NULL,
Code nvarchar(10) NOT NULL,
[Value] nvarchar(20) NOT NULL,
[Active] bit NOT NULL,

CONSTRAINT PK_DocumentType PRIMARY KEY (DocumentTypeId)
)

CREATE TABLE DocumentStatus(
DocumentStatusId int identity NOT NULL,
Code nvarchar(10) NOT NULL,
[Value] nvarchar(20) NOT NULL,
[Active] bit NOT NULL,

CONSTRAINT PK_DocumentStatus PRIMARY KEY (DocumentStatusId)
)

CREATE TABLE Document(
DocumentId int identity(1,1) NOT NULL,
DocumentTypeId int NOT NULL,
DocumentStatusId int NOT NULL,
Code nvarchar(50) NULL,
Number int NULL,
[Date] Date NOT NULL,
[Sum] decimal(18,4) NOT NULL,
CustomerId int NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL

CONSTRAINT PK_Document PRIMARY KEY (DocumentId)
CONSTRAINT FK_DocumentType_Document FOREIGN KEY (DocumentTypeId) REFERENCES DocumentType(DocumentTypeId),
CONSTRAINT FK_DocumentStatus_Document FOREIGN KEY (DocumentStatusId) REFERENCES DocumentStatus(DocumentStatusId),
CONSTRAINT FK_Customer_Document FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId),
)

CREATE TABLE Vat(
VatId int identity(1,1) NOT NULL,
Code nvarchar(10) NOT NULL,
[Value] decimal(3,2) NOT NULL,
[Active] bit NOT NULL,

CONSTRAINT PK_Vat PRIMARY KEY (VatId)
)

CREATE TABLE DocumentDetail(
DocumentDetailId int identity(1,1) NOT NULL,
DocumentId int NOT NULL,
ProductId int NOT NULL,
Quantity int NOT NULL,
VatId int NOT NULL,
Price decimal(18,4) NOT NULL,
Discount decimal(18,4) NULL,
PriceWithDiscount decimal(18,4) NOT NULL,
[Sum] decimal(18,4) NOT NULL,
sysDTEdit datetime NULL,
sysUserEditId int NULL,
sysDTCreated datetime NULL,
sysUserAddId int NULL

CONSTRAINT PK_DocumentDetail PRIMARY KEY (DocumentDetailId),
CONSTRAINT FK_Document_DocumentDetail FOREIGN KEY (DocumentId) REFERENCES Document(DocumentId),
CONSTRAINT FK_Product_DocumentDetail FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
CONSTRAINT FK_Vat_DocumentDetail FOREIGN KEY (VatId) REFERENCES Vat(VatId)
)

--User-defined table types
CREATE TYPE ImageList AS TABLE(
ImageId int NOT NULL,
[Path] nvarchar(200) NULL,
[Name] nvarchar(200) NOT NULL,
[Active] bit NOT NULL
)

CREATE TYPE InformationList AS TABLE(
InformationId int NOT NULL,
[Value] nvarchar(max) NOT NULL,
Active bit NOT NULL
)

CREATE TYPE IntList AS TABLE(
Value int NOT NULL
)

CREATE TYPE ProductTypeList AS TABLE(
ProductTypeId int NOT NULL,
[Name] nvarchar(200) NOT NULL,
[Active] bit NOT NULL,
[ParentId] int NOT NULL,
ToBeDeleted bit NOT NULL,
IndGuid uniqueidentifier NULL,
ParentGuid uniqueidentifier NULL
)

CREATE TYPE DocumentDetailList AS TABLE(
DocumentDetailId int NOT NULL,
ProductCode nvarchar(100) NOT NULL,
Quantity int NOT NULL,
Vat nvarchar(10) NOT NULL,
Price decimal(18,2) NOT NULL,
Discount int NOT NULL,
PriceWithDiscount decimal(18,2) NOT NULL,
[Sum] decimal(18, 2) NOT NULL
)

--Stored procedures
GO
CREATE PROCEDURE User_SelectAll
AS BEGIN
	SELECT UserId, Active FROM [User]

	SELECT R.*, UR.UserId FROM [Role] R
	LEFT Join UserRole UR
	ON R.RoleId = UR.RoleId
	
	SELECT M.*, UR.UserId FROM Menu M
	LEFT JOIN MenuRole MR
	ON M.MenuId = MR.MenuId
	LEFT JOIN UserRole UR
	ON UR.RoleId = MR.RoleId

	SELECT P.*, UR.UserId FROM Permission P
	LEFT JOIN PermissionRole PR
	ON P.PermissionId = PR.PermissionId
	LEFT JOIN UserRole UR
	ON UR.RoleId = PR.RoleId

END
GO

CREATE PROCEDURE Configuration_SelectAll
AS 
BEGIN
	DECLARE @config nvarchar(10) = 'Debug';
	WITH Config
	AS (
	   SELECT [ConfigurationId], [Name], [Value], ParentId,  CAST([Name] as NVARCHAR(MAX)) [Path]
	   FROM [dbo].[Configuration]
	   WHERE [ParentId] IS NULL AND [Name] = @config
	   UNION ALL
	   SELECT c.[ConfigurationId], c.[Name], c.[Value], c.[ParentId], CAST(Config.[Path] + ':' + c.[Name] as NVARCHAR(MAX))
	   FROM [dbo].[Configuration] c
	   INNER JOIN Config ON c.[ParentId] = Config.[ConfigurationId]
	   WHERE c.[ParentId] IS NOT NULL
	)
	SELECT
	REPLACE([Path], @config + ':', '') as [Name]
	,[Value]
	FROM Config
	WHERE [ParentId] IS NOT NULL
	AND [Value] IS NOT NULL
	ORDER BY ConfigurationId
END
GO

CREATE PROCEDURE User_Login
 @Username nvarchar(50),
 @Password nvarchar(50),
 @CultureId bit
AS
BEGIN
	DECLARE @UserId int
	DECLARE @RoleId int

	UPDATE [Culture]
	SET InUse = 1
	WHERE CultureId = @CultureId

	SELECT @UserId = UserId FROM [User] WHERE UserName = @Username AND Active = 1 AND PWDCOMPARE(@Password,[Password]) = 1
	SELECT @RoleId = R.RoleId FROM [Role] R 
	INNER JOIN UserRole UR
	ON R.RoleId = UR.RoleId WHERE UR.UserId = @UserId

	SELECT @UserId as UserId, 1 as Active

	SELECT R.* FROM [Role] R
	INNER JOIN UserRole UR
	ON R.RoleId = UR.RoleId
	WHERE UR.UserId = @UserId

	SELECT M.* FROM Menu M
	INNER JOIN MenuRole MR
	ON M.MenuId = MR.MenuId
	WHERE MR.RoleId = @RoleId

	SELECT P.* FROM Permission P
	INNER JOIN PermissionRole PR
	ON P.PermissionId = PR.PermissionId
	WHERE PR.RoleId = @RoleId
END
GO

CREATE PROCEDURE ProductType_SelectAll
AS BEGIN
	SELECT * FROM ProductType
END
GO

CREATE PROCEDURE Product_Save
@ProductId int,
@Name nvarchar(300),
@Code nvarchar(100),
@ProductTypeId int,
@Active bit,
@Images [ImageList] READONLY,
@Informations InformationList READONLY,
@UserId int
AS BEGIN
BEGIN TRANSACTION

	DECLARE @ImageId int

	IF (@ProductId > 0)
	BEGIN
		IF NOT EXISTS(SELECT TOP 1 1 FROM Product 
					 WHERE ProductId = @ProductId)
		BEGIN
			RAISERROR('product_does_not_exist', 13, 1)
			BEGIN ROLLBACK END
			RETURN
		END

		UPDATE Product
		SET 
		[Name] = @Name,
		Code = @Code,
		ProductTypeId = @ProductTypeId,
		[Active] = @Active,
		sysDTEdit = GETDATE(),
		sysUserEditId = @UserId
		WHERE ProductId = @ProductId
	END
	ELSE
	BEGIN
		INSERT INTO 
		Product ([Name], [Code], ProductTypeId, Active, sysDTCreated, sysUserAddId)
		VALUES (@Name, @Code, @ProductTypeId, @Active, GETDATE(), @UserId)
		SET @ProductId = SCOPE_IDENTITY()
	END

	UPDATE I
	SET 
	I.[Path] = It.[Path],
	I.[Name] = It.[Name],
	I.Active = It.Active,
	I.sysDTEdit = GETDATE(),
	I.sysUserEditId = @UserId
	FROM [Image] as I
	INNER JOIN @Images AS It
	ON I.ImageId = It.ImageId

	DELETE I FROM [Image] I
	LEFT JOIN @Images IM
	ON I.ImageId = IM.ImageId
	WHERE IM.ImageId IS NULL
	AND I.ProductId = @ProductId

	INSERT INTO 
	[Image] ([Path], [Name], Active, ProductId, sysDTCreated, sysUserAddId)
	SELECT [Path], [Name], Active, @ProductId, GETDATE(), @UserId
	FROM @Images It
	WHERE It.ImageId = 0
    
	UPDATE I
	SET 
	I.[Value] = It.[Value],
	I.Active = It.Active,
	I.sysDTEdit = GETDATE(),
	I.sysUserEditId = @UserId
	FROM Information as I
	INNER JOIN @Informations AS It
	ON I.InformationId = It.InformationId

	DELETE I FROM Information I
    LEFT JOIN @Informations INF
	ON I.InformationId = INF.InformationId
	WHERE INF.InformationId IS NULL
	AND I.ProductId = @ProductId

	INSERT INTO 
	Information ([Value], Active, ProductId, sysDTCreated, sysUserAddId)
	SELECT [Value], Active, @ProductId, GETDATE(), @UserId
	FROM @Informations It
	WHERE It.InformationId = 0


	BEGIN COMMIT END
	SELECT @ProductId

END
GO

CREATE PROCEDURE Product_SelectAll
@SortBy nvarchar(30),
@SortOrder tinyint,
@Skip int,
@Take int,
@Filter nvarchar(300) = ''
AS
BEGIN
	SELECT
	P.ProductId,
	P.[Name],
	P.[Code],
	P.ProductTypeId,
	--PT.[Name],
	P.Active
	FROM Product P
	WHERE 
	(P.[Name] like '%' + @Filter + '%' OR
	 P.[Code] like '%' + @Filter + '%')
	ORDER BY
	CASE WHEN @SortBy = N'Name' AND @SortOrder = 1 THEN P.[Name] END ASC,
	CASE WHEN @SortBy = N'Name' AND @SortOrder = 2 THEN P.[Name] END DESC,
	CASE WHEN @SortBy = N'Code' AND @SortOrder = 1 THEN P.Code END ASC,
	CASE WHEN @SortBy = N'Code' AND @SortOrder = 2 THEN P.Code END DESC,
	CASE WHEN @SortBy = N'Active' AND @SortOrder = 1 THEN P.Active END ASC,
	CASE WHEN @SortBy = N'Active' AND @SortOrder = 2 THEN P.Active END DESC
	OFFSET @Skip ROWS
	FETCH NEXT @Take ROWS ONLY

	SELECT
	ProductTypeId,
	ParentId,
	[Name],
	Active
	FROM ProductType

	SELECT
	ImageId,
	[Path],
	[Name],
	Active,
	ProductId
	FROM [Image]

	SELECT
	InformationId,
	[Value],
	Active,
	ProductId
	FROM Information

	SELECT
	COUNT(*)
	FROM Product P
	WHERE 
	(P.[Name] like '%' + @Filter + '%' OR
	 P.[Code] like '%' + @Filter + '%')
END
GO

CREATE PROCEDURE Product_Delete
@IdList IntList READONLY
AS
BEGIN
	BEGIN TRANSACTION

	DECLARE @Images AS TABLE(
	[Path] nvarchar(200)
	)
	INSERT INTO @Images (Path)
	VALUES ((SELECT [Name] FROM [Image] I 
			INNER JOIN @IdList Id
			ON Id.Value = I.ProductId))
	
	DELETE FROM Information
	WHERE ProductId IN (SELECT [Value] FROM @IdList)

	DELETE FROM [Image]
	WHERE ProductId IN (SELECT [Value] FROM @IdList)

	DELETE FROM Product
	WHERE ProductId IN (SELECT [Value] FROM @IdList)

	BEGIN COMMIT END

	SELECT * FROM @Images
END
GO

CREATE PROCEDURE Localization_SelectAll
AS BEGIN

	SELECT
	CultureId,
	[Name],
	[Value],
	Flag,
	Active
	FROM Culture

	SELECT 
	R.ResourceId,
	R.[Name],
	T.TranslateId,
	T.[Value],
	T.CultureId
	FROM [Translate] T
	Left JOIN [Resource] R
	ON R.ResourceId = T.ResourceId
END
GO

CREATE PROCEDURE Localization_Save
@ResourceId int,
@Name nvarchar(50),
@Value nvarchar(500),
@CultureId int,
@UserId int
AS BEGIN
BEGIN TRANSACTION
	IF (@ResourceId > 0)
	BEGIN
		IF NOT EXISTS (SELECT TOP 1 1 FROM [Resource] WHERE ResourceId = @ResourceId)
	       OR NOT EXISTS(SELECT TOP 1 1 FROM [Translate] WHERE ResourceId = @ResourceId)
		BEGIN
			RAISERROR('resource_not_found', 11, 1)
			BEGIN ROLLBACK END
			RETURN
		END

		UPDATE [Resource]
		SET [Name] = @Name 
		WHERE ResourceId = @ResourceId

		UPDATE [Translate]
		SET [Value] = @Value,
		CultureId = @CultureId,
		sysDTEdit = GETDATE(),
		sysUserEditId = @UserId
		WHERE ResourceId = @ResourceId
	END
	ELSE
	BEGIN
		INSERT INTO 
		[Resource] ([Name])
		VALUES (@Name)
		SET @ResourceId = SCOPE_IDENTITY()


		INSERT INTO
		[Translate] (CultureId, ResourceId, [Value], sysDTCreated, sysUserAddId)
		     VALUES (@CultureId, @ResourceId, @Value, GETDATE(), @UserId)
	END

	BEGIN COMMIT END
	SELECT @ResourceId
END
GO

CREATE PROCEDURE Product_SelectSingle
@ProductId int
AS
BEGIN
	SELECT
	ProductId,
	[Name],
	[Code],
	ProductTypeId,
	Active
	FROM Product P
	WHERE ProductId = @ProductId

	SELECT 
	PT.* 
	FROM ProductType PT
	INNER JOIN Product P
	ON P.ProductTypeId = PT.ProductTypeId
	WHERE ProductId = @ProductId

	SELECT
    ImageId,
	[Name],
	Active,
	ProductId
	FROM [Image]
	WHERE ProductId = @ProductId

	SELECT
    InformationId,
	[Value],
	Active,
	ProductId
	FROM Information
	WHERE ProductId = @ProductId
END
GO

CREATE PROCEDURE ProductType_SaveChanges
@ProductTypes [ProductTypeList] READONLY,
@UserId int
AS BEGIN
BEGIN TRANSACTION
	DECLARE @EmptyGuidValue uniqueidentifier = '00000000-0000-0000-0000-000000000000'

	DECLARE 
	@productTypeId int,
	@name nvarchar(200),
	@active bit,
	@parentId int,
	@indGuid uniqueidentifier,
	@parentGuid uniqueidentifier,
	@toBeDeleted bit
	DECLARE pt_cursor CURSOR
		FOR 
		SELECT 
		ProductTypeId, 
		[Name], 
		[Active], 
		[ParentId], 
		IndGuid, 
		ParentGuid,
		ToBeDeleted
		FROM @ProductTypes

	OPEN pt_cursor
	FETCH NEXT FROM pt_cursor
	INTO
	@productTypeId,
	@name,
	@active,
	@parentId,
	@indGuid,
	@parentGuid,
	@toBeDeleted


	WHILE @@FETCH_STATUS = 0 
	BEGIN
		IF @toBeDeleted = 1
		BEGIN
			IF EXISTS (SELECT TOP 1 1 FROM Product P
				       WHERE ProductTypeId = @productTypeId)
			BEGIN
				RAISERROR('producttype_connected_to_product;%s', 10, 1, @name)
				BEGIN ROLLBACK END
				RETURN
			END
			IF EXISTS (SELECT TOP 1 1 FROM ProductType
					   WHERE ParentId = @productTypeId)
			BEGIN
				UPDATE ProductType
				SET ParentId = NULL
				WHERE ParentId = @productTypeId
			END

			DELETE FROM ProductType
			WHERE ProductTypeId = @productTypeId
		END
		ELSE
		BEGIN
			IF @productTypeId = 0 OR @productTypeId = NULL
			BEGIN
				INSERT INTO ProductType 
				([Name], [Active], ParentId, sysDTCreated, sysUserAddId, IndGuid, ParentGuid) VALUES
				(@name, @Active, 
				(CASE
					WHEN EXISTS (SELECT TOP 1 ProductTypeId FROM ProductType PT WHERE @parentId = ProductTypeId)
					THEN @parentId
				ELSE (CASE
						  WHEN @parentGuid = @EmptyGuidValue
						  THEN NULL
					  ELSE (SELECT TOP 1 PT.ProductTypeId FROM ProductType PT WHERE @parentGuid = PT.IndGuid)
					  END)
				END),
				GETDATE(), @UserId, @indGuid, 
				CASE @parentGuid 
					WHEN @EmptyGuidValue 
					THEN NULL 
				ELSE @parentGuid 
				END)
			END
			ELSE
			BEGIN
				UPDATE ProductType
				SET
				[Name] = @name,
				Active = @active,
				sysDTEdit = GETDATE(),
				sysUserEditId = @UserId
              WHERE ProductTypeId = @productTypeId
			END
		END

		FETCH NEXT FROM pt_cursor
		INTO
		@productTypeId,
		@name,
		@active,
		@parentId,
		@indGuid,
		@parentGuid,
      @toBeDeleted

	END
	BEGIN COMMIT END

END
GO

CREATE PROCEDURE Culture_SelectInUse
AS BEGIN
	SELECT TOP 1 CultureId 
	FROM [Culture]
	WHERE InUse = 1
END
GO

CREATE PROCEDURE DocumentStatus_SelectAll
AS BEGIN
SELECT * FROM DocumentStatus
END
GO

CREATE PROCEDURE Vat_SelectAll
AS BEGIN
SELECT * FROM Vat
END
GO

CREATE PROCEDURE Product_SelectAllByFilter
@Filter nvarchar(300) = ''
AS
BEGIN
	SET @Filter = LOWER(@Filter)
	SELECT
	P.[Name],
	P.[Code]
	FROM Product P
	WHERE 
	(LOWER(P.[Name]) like '%' + @Filter + '%' OR
	 LOWER(P.[Code]) like '%' + @Filter + '%'AND 
	 P.Active = 1)
END
GO

CREATE PROCEDURE Customer_SelectAll
AS BEGIN
	SELECT 
	CustomerId,
	FirstName,
	LastName,
	[Address],
	[Floor],
	Flat,
	ContactNumber,
	UserId
	FROM Customer
END
GO

CREATE PROCEDURE Document_Save
@Code nvarchar(50),
@DocumentType nvarchar(10),
@DocumentStatus nvarchar(10),
@Date Date,
@Sum decimal(18,2),
@CustomerId int,
@Details DocumentDetailList readonly,
@UserId int
AS 
BEGIN
BEGIN TRANSACTION
	DECLARE 
	@DocumentId int,
	@DocumentTypeId int = (SELECT TOP 1 DocumentTypeId FROM DocumentType
							WHERE LOWER(@DocumentType) = LOWER([Value])),
	@DocumentStatusId int = (SELECT TOP 1 DocumentStatusId FROM DocumentStatus
							 WHERE @DocumentStatus = Code)
	IF @Code IS NOT NULL
	BEGIN
		IF NOT EXISTS (SELECT TOP 1 1 FROM Document
				   WHERE Code = @Code)
		BEGIN
			RAISERROR('document_does_not_exist', 13, 1)
			BEGIN ROLLBACK END
			RETURN
		END
		SELECT @DocumentId = DocumentId FROM Document
		WHERE Code = @Code
		UPDATE D
		SET 
		D.DocumentTypeId = DT.DocumentTypeId,
		D.DocumentStatusId = DS.DocumentStatusId,
		D.CustomerId = @CustomerId,
		D.[Date] = @Date,
		D.[Sum] = @Sum,
		D.sysDTEdit = GETDATE(),
		D.sysUserEditId = @UserId
		FROM Document as D
		RIGHT JOIN DocumentType DT
		ON @DocumentType = DT.Code
		RIGHT JOIN DocumentStatus DS
		ON @DocumentStatus = DS.Code
	END
	ELSE
	BEGIN
		INSERT INTO Document (DocumentTypeId, DocumentStatusId, CustomerId, [Date], [Sum], sysDTCreated, sysUserAddId)
					   SELECT @DocumentTypeId, @DocumentStatusId, @CustomerId, @Date, @Sum, GETDATE(), @UserId
		 SET @DocumentId = SCOPE_IDENTITY()
	END
	DELETE DD FROM DocumentDetail DD
	LEFT JOIN @Details D
	ON D.DocumentDetailId = DD.DocumentDetailId
	WHERE D.DocumentDetailId IS NULL AND
	DD.DocumentId = @DocumentId

	INSERT INTO DocumentDetail (ProductId, Quantity, VatId, Price, Discount, PriceWithDiscount, [Sum], sysDTCreated, sysUserAddId, DocumentId)
						SELECT P.ProductId, DD.Quantity, V.VatId, DD.Price, DD.Discount, DD.PriceWithDiscount, DD.[Sum], GETDATE(), @UserId, @DocumentId
						FROM @Details DD
						INNER JOIN Product P
						ON P.Code = DD.ProductCode
						INNER JOIN Vat V
						ON V.Code = DD.Vat
						WHERE DD.DocumentDetailId IS NULL OR
						DD.DocumentDetailId = 0

	UPDATE De
	SET
	De.ProductId = P.ProductId, 
	De.Quantity = DD.Quantity, 
	De.VatId = V.VatId, 
	De.Price = DD.Price, 
	De.Discount = DD.Discount, 
	De.PriceWithDiscount = DD.PriceWithDiscount, 
	De.[Sum] = DD.[Sum],
	De.sysDTEdit = GETDATE(),
	De.sysUserAddId = @UserId
	FROM DocumentDetail DE
	INNER JOIN @Details DD
	ON DE.DocumentDetailId = DD.DocumentDetailId
	RIGHT JOIN Product P
	ON P.Code = DD.ProductCode
	RIGHT JOIN Vat V
	ON V.Code = DD.Vat
	

	BEGIN COMMIT END
END
GO

CREATE PROCEDURE Document_SelectAll
@DocumentType nvarchar(20),
@SortBy nvarchar(30),
@SortOrder tinyint,
@Skip int,
@Take int,
@Filter nvarchar(300) = ''
AS
BEGIN
	DECLARE @documents AS Table(
	DocumentId int NOT NULL,
	DocumentTypeId int NOT NULL,
	DocumentStatusId int NOT NULL,
	Code nvarchar(50) NOT NULL,
	[Date] date NOT NULL,
	[Sum] decimal(18,2) NOT NULL,
	CustomerId int NOT NULL
	)
	INSERT INTO @documents
	SELECT
	DocumentId,
	D.DocumentTypeId,
	DocumentStatusId,
	D.Code,
	[Date],
	[Sum],
	CustomerId
	FROM
	Document D
	INNER JOIN DocumentType DT
	ON D.DocumentTypeId = DT.DocumentTypeId
	WHERE 
	(D.Code like '%' + @Filter + '%')
	AND DT.[Value] = @DocumentType
	ORDER BY
	CASE WHEN @SortBy = N'Code' AND @SortOrder = 1 THEN D.Code END ASC,
	CASE WHEN @SortBy = N'Code' AND @SortOrder = 2 THEN D.Code END DESC,
	CASE WHEN @SortBy = N'Date' AND @SortOrder = 1 THEN [Date] END ASC,
	CASE WHEN @SortBy = N'Date' AND @SortOrder = 2 THEN [Date] END DESC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 1 THEN [Sum] END ASC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 2 THEN [Sum] END DESC
	OFFSET @Skip ROWS
	FETCH NEXT @Take ROWS ONLY

	SELECT
	*
	FROM 
	@documents

	SELECT
	DT.DocumentTypeId,
	DT.Code,
	[Value]
	FROM DocumentType DT
	WHERE 
	Active = 1 AND
	DT.[Value] = @DocumentType

	SELECT
	DS.DocumentStatusId,
	DS.Code,
	DS.[Value]
	FROM DocumentStatus DS
	WHERE Active = 1

	SELECT 
	C.CustomerId,
	FirstName,
	LastName
	FROM Customer C

	SELECT
	COUNT(*)
	FROM
	Document D
	INNER JOIN DocumentType DT
	ON D.DocumentTypeId = DT.DocumentTypeId
	WHERE 
	(D.Code like '%' + @Filter + '%')
	AND DT.[Value] = @DocumentType
END
GO

CREATE PROCEDURE Document_SelectDetails
@DocumentId nvarchar(20),
@SortBy nvarchar(30),
@SortOrder tinyint,
@Skip int,
@Take int,
@Filter nvarchar(300) = ''
AS
BEGIN
	DECLARE @details AS Table(
	DocumentDetailId int NOT NULL,
	DocumentId int NOT NULL,
	Quantity int NOT NULL,
	Price decimal(18,2) NOT NULL,
	Discount decimal(18,2) NOT NULL,
	PriceWithDiscount decimal(18,2) NOT NULL,
	[Sum] decimal(18,2) NOT NULL,
	ProductId int NOT NULL,
	VatId int NOT NULL
	)
	INSERT INTO @details
	SELECT
	DocumentDetailId,
	DocumentId,
	Quantity,
	Price,
	Discount,
	PriceWithDiscount,
	[Sum],
	ProductId,
	VatId
	FROM 
	DocumentDetail
	WHERE DocumentId = @DocumentId
	ORDER BY
	CASE WHEN @SortBy = N'Quantity' AND @SortOrder = 1 THEN Quantity END ASC,
	CASE WHEN @SortBy = N'Quantity' AND @SortOrder = 2 THEN Quantity END DESC,
	CASE WHEN @SortBy = N'Price' AND @SortOrder = 1 THEN Price END ASC,
	CASE WHEN @SortBy = N'Price' AND @SortOrder = 2 THEN Price END DESC,
	CASE WHEN @SortBy = N'Discount' AND @SortOrder = 1 THEN Discount END ASC,
	CASE WHEN @SortBy = N'Discount' AND @SortOrder = 2 THEN Discount END DESC,
	CASE WHEN @SortBy = N'PriceWithDiscount' AND @SortOrder = 1 THEN PriceWithDiscount END ASC,
	CASE WHEN @SortBy = N'PriceWithDiscount' AND @SortOrder = 2 THEN PriceWithDiscount END DESC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 1 THEN [Sum] END ASC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 2 THEN [Sum] END DESC
	OFFSET @Skip ROWS
	FETCH NEXT @Take ROWS ONLY

	SELECT
	*
	FROM
	@details

	SELECT 
	P.ProductId,
	Code,
	[Name]
	FROM Product P
	INNER JOIN @details DD
	ON DD.ProductId =  P.ProductId
	WHERE Active = 1

	SELECT 
	VatId,
	[Code]
	FROM 
	Vat
	WHERE Active = 1

	SELECT
	COUNT(*)
	FROM
	DocumentDetail
	WHERE DocumentId = @DocumentId
END
GO

CREATE PROCEDURE Document_SelectById
@DocumentId nvarchar(20),
@SortBy nvarchar(30),
@SortOrder tinyint,
@Skip int,
@Take int,
@Filter nvarchar(300) = ''
AS BEGIN
	DECLARE @document AS Table(
	DocumentId int NOT NULL,
	DocumentTypeId int NOT NULL,
	DocumentStatusId int NOT NULL,
	Code nvarchar(50) NOT NULL,
	[Date] date NOT NULL,
	[Sum] decimal(18,2) NOT NULL,
	CustomerId int NOT NULL
	)
	INSERT INTO @document
	SELECT
	DocumentId,
	D.DocumentTypeId,
	DocumentStatusId,
	D.Code,
	[Date],
	[Sum],
	CustomerId
	FROM
	Document D
	WHERE DocumentId = @DocumentId

	DECLARE @details AS Table(
	DocumentDetailId int NOT NULL,
	DocumentId int NOT NULL,
	Quantity int NOT NULL,
	Price decimal(18,2) NOT NULL,
	Discount decimal(18,2) NOT NULL,
	PriceWithDiscount decimal(18,2) NOT NULL,
	[Sum] decimal(18,2) NOT NULL,
	ProductId int NOT NULL,
	VatId int NOT NULL
	)
	INSERT INTO @details
	SELECT
	DocumentDetailId,
	DocumentId,
	Quantity,
	Price,
	Discount,
	PriceWithDiscount,
	[Sum],
	ProductId,
	VatId
	FROM 
	DocumentDetail
	WHERE DocumentId = @DocumentId
	ORDER BY
	CASE WHEN @SortBy = N'Quantity' AND @SortOrder = 1 THEN Quantity END ASC,
	CASE WHEN @SortBy = N'Quantity' AND @SortOrder = 2 THEN Quantity END DESC,
	CASE WHEN @SortBy = N'Price' AND @SortOrder = 1 THEN Price END ASC,
	CASE WHEN @SortBy = N'Price' AND @SortOrder = 2 THEN Price END DESC,
	CASE WHEN @SortBy = N'Discount' AND @SortOrder = 1 THEN Discount END ASC,
	CASE WHEN @SortBy = N'Discount' AND @SortOrder = 2 THEN Discount END DESC,
	CASE WHEN @SortBy = N'PriceWithDiscount' AND @SortOrder = 1 THEN PriceWithDiscount END ASC,
	CASE WHEN @SortBy = N'PriceWithDiscount' AND @SortOrder = 2 THEN PriceWithDiscount END DESC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 1 THEN [Sum] END ASC,
	CASE WHEN @SortBy = N'Sum' AND @SortOrder = 2 THEN [Sum] END DESC
	OFFSET @Skip ROWS
	FETCH NEXT @Take ROWS ONLY

	SELECT 
	P.ProductId,
	Code,
	[Name],
	P.ProductTypeId
	FROM Product P
	INNER JOIN @details DD
	ON DD.ProductId =  P.ProductId
	WHERE Active = 1

	SELECT
	ProductTypeId,
	[Name]
	FROM
	ProductType

	SELECT
	*
	FROM
	@details

	SELECT 
	VatId,
	[Code]
	FROM 
	Vat
	WHERE Active = 1

	SELECT
	*
	FROM 
	@document

	SELECT
	DT.DocumentTypeId,
	DT.Code,
	[Value]
	FROM DocumentType DT
	INNER JOIN @document D
	ON D.DocumentTypeId = DT.DocumentTypeId
	WHERE Active = 1

	SELECT
	DS.DocumentStatusId,
	DS.Code,
	DS.[Value]
	FROM DocumentStatus DS
	INNER JOIN @document D
	ON DS.DocumentStatusId = D.DocumentStatusId
	WHERE Active = 1

	SELECT 
	C.CustomerId,
	FirstName,
	LastName
	FROM Customer C
	INNER JOIN @document D
	ON C.CustomerId = D.CustomerId

	SELECT
	COUNT(*)
	FROM
	DocumentDetail
	WHERE DocumentId = @DocumentId
END
GO

--Triggers
CREATE TRIGGER SetCode
	ON Document
	FOR INSERT

AS
BEGIN
	DECLARE @DocumentType nvarchar(10)
	DECLARE @Number int
	DECLARE @DocumentId int
	SELECT 
	@DocumentType = DT.Code,
	@DocumentId = D.DocumentId
	FROM 
	inserted D
	INNER JOIN DocumentType DT
	ON D.DocumentTypeId = DT.DocumentTypeId

	SELECT 
	@Number = MAX(ISNULL(Number, 0) + 1)
	FROM Document

	DECLARE @Code nvarchar(10) = CONCAT(@DocumentType,'-',@Number,'-',YEAR(GETDATE()))

	UPDATE Document
	SET Code = @Code,
	Number = @Number
	WHERE DocumentId = @DocumentId
END

GO
INSERT INTO Culture([Name], [Value], Active, Flag, sysUserAddId, sysDtCreated, InUse)
		    VALUES ('en-US', 'English', 1, 'flag-icon flag-icon-us', 1, GETDATE(), 0)
GO

INSERT INTO Culture([Name], [Value], Active, Flag, sysUserAddId, sysDtCreated, InUse)
		    VALUES ('sr-Latn-CS', 'Serbian-Latin', 1, 'flag-icon flag-icon-rs', 1, GETDATE(), 0)
GO
--Localization
exec [Localization_Save] 0, 'label_language_selection', 'Select a language', 1, 1
exec [Localization_Save] 0, 'label_language_selection', N'Izaberite jezik', 2, 1
GO

exec [Localization_Save] 0, 'label_password', 'Password', 1, 1
exec [Localization_Save] 0, 'label_password', N'Lozinka', 2, 1
GO

exec [Localization_Save] 0, 'label_username', 'Username', 1, 1
exec [Localization_Save] 0, 'label_username', N'Korisničko ime', 2, 1
GO

exec [Localization_Save] 0, 'label_login', 'Login', 1, 1
exec [Localization_Save] 0, 'label_login', N'Prijava', 2, 1
GO

exec [Localization_Save] 0, 'label_forgotten_password', 'Forgotten password', 1, 1
exec [Localization_Save] 0, 'label_forgotten_password', N'Zaboravljena lozinka', 2, 1
GO

exec [Localization_Save] 0, 'btn_login', 'Login', 1, 1
exec [Localization_Save] 0, 'btn_login', N'Prijavi se', 2, 1
GO

exec [Localization_Save] 0, 'menu_100', 'Inventory', 1, 1
exec [Localization_Save] 0, 'menu_100', N'Inventar', 2, 1
GO

exec [Localization_Save] 0, 'menu_101', 'Products', 1, 1
exec [Localization_Save] 0, 'menu_101', N'Proizvodi', 2, 1
GO

exec [Localization_Save] 0, 'menu_102', 'Product types', 1, 1
exec [Localization_Save] 0, 'menu_102', N'Tipovi proizvoda', 2, 1
GO

exec [Localization_Save] 0, 'title_products', 'Products', 1, 1
exec [Localization_Save] 0, 'title_products', N'Proizvodi', 2, 1
GO

exec [Localization_Save] 0, 'label_search', 'Search', 1, 1
exec [Localization_Save] 0, 'label_search', N'Pretraga', 2, 1
GO

exec [Localization_Save] 0, 'label_delete_selected', 'Delete selected', 1, 1
exec [Localization_Save] 0, 'label_delete_selected', N'Obriši izabrano', 2, 1
GO

exec [Localization_Save] 0, 'label_add_product', 'Add product', 1, 1
exec [Localization_Save] 0, 'label_add_product', N'Dodaj proizvod', 2, 1
GO

exec [Localization_Save] 0, 'label_name', 'Name', 1, 1
exec [Localization_Save] 0, 'label_name', N'Naziv', 2, 1
GO

exec [Localization_Save] 0, 'label_code', 'Code', 1, 1
exec [Localization_Save] 0, 'label_code', N'Šifra', 2, 1
GO

exec [Localization_Save] 0, 'label_product_type', 'Product type', 1, 1
exec [Localization_Save] 0, 'label_product_type', N'Tip proizvoda', 2, 1
GO

exec [Localization_Save] 0, 'label_active', 'Active', 1, 1
exec [Localization_Save] 0, 'label_active', N'Aktivan', 2, 1
GO

exec [Localization_Save] 0, 'inventory_breadcrumb', 'Inventory', 1, 1
exec [Localization_Save] 0, 'inventory_breadcrumb', N'Inventar', 2, 1
GO

exec [Localization_Save] 0, 'products_breadcrumb', 'Products', 1, 1
exec [Localization_Save] 0, 'products_breadcrumb', N'Proizvodi', 2, 1
GO

exec [Localization_Save] 0, 'label_items_per_page', 'Items per page', 1, 1
exec [Localization_Save] 0, 'label_items_per_page', N'Stavke po stranici', 2, 1
GO

exec [Localization_Save] 0, 'label_next_page', 'Next page', 1, 1
exec [Localization_Save] 0, 'label_next_page', N'Sledeća stranica', 2, 1
GO

exec [Localization_Save] 0, 'label_previous_page', 'Previous page', 1, 1
exec [Localization_Save] 0, 'label_previous_page', N'Prošla stranica', 2, 1
GO

exec [Localization_Save] 0, 'label_of', 'Of', 1, 1
exec [Localization_Save] 0, 'label_of', N'Od', 2, 1
GO

exec [Localization_Save] 0, 'home_breadcrumb', 'Home', 1, 1
exec [Localization_Save] 0, 'home_breadcrumb', N'Početna', 2, 1
GO

exec [Localization_Save] 0, 'add_breadcrumb', 'Add', 1, 1
exec [Localization_Save] 0, 'add_breadcrumb', N'Dodavanje', 2, 1
GO

exec [Localization_Save] 0, 'label_informations', 'Informations', 1, 1
exec [Localization_Save] 0, 'label_informations', N'Informacije', 2, 1
GO

exec [Localization_Save] 0, 'label_images', 'Images', 1, 1
exec [Localization_Save] 0, 'label_images', N'Slike', 2, 1
GO

exec [Localization_Save] 0, 'label_cancel', 'Cancel', 1, 1
exec [Localization_Save] 0, 'label_cancel', N'Otkaži', 2, 1
GO

exec [Localization_Save] 0, 'label_confirm', 'Confirm', 1, 1
exec [Localization_Save] 0, 'label_confirm', N'Potvrdi', 2, 1
GO

exec [Localization_Save] 0, 'label_add_information', 'Add information', 1, 1
exec [Localization_Save] 0, 'label_add_information', N'Dodaj informaciju', 2, 1
GO

exec [Localization_Save] 0, 'label_add_image', 'Add image', 1, 1
exec [Localization_Save] 0, 'label_add_image', N'Dodaj sliku', 2, 1
GO

exec [Localization_Save] 0, 'title_add', 'Add', 1, 1
exec [Localization_Save] 0, 'title_add', N'Dodavanje', 2, 1
GO

exec [Localization_Save] 0, 'label_information', 'Information', 1, 1
exec [Localization_Save] 0, 'label_information', N'Informacija', 2, 1
GO

exec [Localization_Save] 0, 'edit_breadcrumb', 'Edit', 1, 1
exec [Localization_Save] 0, 'edit_breadcrumb', N'Izmena', 2, 1
GO

exec [Localization_Save] 0, 'products_types_breadcrumb', 'Product types', 1, 1
exec [Localization_Save] 0, 'products_types_breadcrumb', N'Tipovi proizvoda', 2, 1
GO

exec [Localization_Save] 0, 'title_product_types', 'Product types', 1, 1
exec [Localization_Save] 0, 'title_product_types', N'Tipovi proizvoda', 2, 1
GO

exec [Localization_Save] 0, 'label_add_type', 'Add product type', 1, 1
exec [Localization_Save] 0, 'label_add_type', N'Dodaj tip proizvoda', 2, 1
GO

exec [Localization_Save] 0, 'label_save_changes', 'Save changes', 1, 1
exec [Localization_Save] 0, 'label_save_changes', N'Sačuvaj izmene', 2, 1
GO

exec [Localization_Save] 0, 'label_edit', 'Edit', 1, 1
exec [Localization_Save] 0, 'label_edit', N'Izmena', 2, 1
GO

exec [Localization_Save] 0, 'label_type', 'Type', 1, 1
exec [Localization_Save] 0, 'label_type', N'Tip', 2, 1
GO

exec [Localization_Save] 0, 'label_add_subtype', 'Add subtype', 1, 1
exec [Localization_Save] 0, 'label_add_subtype', N'Dodaj podtip', 2, 1
GO

exec [Localization_Save] 0, 'label_delete_type', 'Delete type', 1, 1
exec [Localization_Save] 0, 'label_delete_type', N'Obriši tip', 2, 1
GO

exec [Localization_Save] 0, 'menu_200', 'Documents', 1, 1
exec [Localization_Save] 0, 'menu_200', N'Dokumenti', 2, 1
GO

exec [Localization_Save] 0, 'menu_201', 'Bills', 1, 1
exec [Localization_Save] 0, 'menu_201', N'Računi', 2, 1
GO

exec [Localization_Save] 0, 'menu_202', 'Pricelists', 1, 1
exec [Localization_Save] 0, 'menu_202', N'Cenovnici', 2, 1

--Inserts
INSERT INTO [User] (UserName, [Password], Email, Active, sysDTCreated)
			VALUES ('acadj97', PWDENCRYPT('321'), 'acadj97@gmail.com', 1, GETDATE())

INSERT INTO Customer (FirstName, LastName, [Address], [Floor], Flat, ContactNumber, UserId, sysDTCreated)
		VALUES('Aleksandar', 'Djordjevic', 'Sarajevska', '1', '2', '0641919676', 2, GETDATE())

INSERT INTO DocumentType (Code, [Value], [Active])
				  VALUES('PR', 'Pricelist', 1)
INSERT INTO DocumentType (Code, [Value], [Active])
				  VALUES('B', 'Bill', 1)

INSERT INTO DocumentStatus(Code, [Value], [Active])
					VALUES('R', 'Released', 1)
INSERT INTO DocumentStatus(Code, [Value], [Active])
					VALUES('U', 'Unreleased', 1)
INSERT INTO DocumentStatus(Code, [Value], [Active])
					VALUES('D', 'Deleted', 1)

INSERT INTO Vat(Code, [Value], [Active])
		 VALUES('0', 0, 1)
INSERT INTO Vat(Code, [Value], [Active])
		 VALUES('10', 0.10, 1)
INSERT INTO Vat(Code, [Value], [Active])
		 VALUES('20', 0.20, 1)

INSERT INTO UserRole (UserId, RoleId, Active, sysDTCreated, sysUserAddId)
				VALUES (1, 1, 1, GETDATE(), 1)

INSERT INTO [Configuration] ([Description], [Name], [Value], ParentId)
					 VALUES (NULL, 'Debug', NULL, NULL)

INSERT INTO [Configuration] ([Description], [Name], [Value], ParentId)
					 VALUES (NULL, 'Security', NULL, 1)

INSERT INTO [Configuration] ([Description], [Name], [Value], ParentId)
					 VALUES (NULL, 'SecurityKey', (SELECT (LOWER(LEFT(REPLACE(NEWID(),'-',''),10)) + UPPER(LEFT(REPLACE(NEWID(),'-',''),10)) + 
					 LOWER(LEFT(REPLACE(NEWID(),'-',''),10)) + UPPER(LEFT(REPLACE(NEWID(),'-',''),10))
					 + LOWER(LEFT(REPLACE(NEWID(),'-',''),10)) + UPPER(LEFT(REPLACE(NEWID(),'-',''),10)) + 
					 LOWER(LEFT(REPLACE(NEWID(),'-',''),10)) + UPPER(LEFT(REPLACE(NEWID(),'-',''),10))
					 + LOWER(LEFT(REPLACE(NEWID(),'-',''),10)) + UPPER(LEFT(REPLACE(NEWID(),'-',''),10)))), 
					 2)

INSERT INTO [Configuration] ([Description], [Name], [Value], ParentId)
					 VALUES (NULL, 'Issuer', 'ECommerceApi', 2)

INSERT INTO [Configuration] ([Description], [Name], [Value], ParentId)
					 VALUES (NULL, 'Audience', 'ECommerceWeb', 2)


INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES(NULL, 'menu_100', 'Inventory', '#', 'assessment', 1, 1, GETDATE(), 1)

INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES((SELECT MenuId FROM Menu where Code = 'menu_100'), 'menu_101', 'Products', '/inventory/products', 'loyalty', 1, 1, GETDATE(), 1)

INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES((SELECT MenuId FROM Menu where Code = 'menu_100'), 'menu_102', 'ProductTypes', '/inventory/producttypes', 'device_hub', 2, 1, GETDATE(), 1)

insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_100'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 
insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_101'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 
insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_102'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 




INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES (NULL, 'Core Components', 1, GETDATE(), 1)
INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES ((SELECT ProductTypeId FROM ProductType WHERE [Name] = 'Core Components'), 'CPU', 1, GETDATE(), 1)
INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES ((SELECT ProductTypeId FROM ProductType WHERE [Name] = 'Core Components'), 'Memory', 1, GETDATE(), 1)
INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES ((SELECT ProductTypeId FROM ProductType WHERE [Name] = 'Core Components'), 'Motherboards', 1, GETDATE(), 1)

INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES (NULL, 'Accessories', 1, GETDATE(), 1)
INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES ((SELECT ProductTypeId FROM ProductType WHERE [Name] = 'Accessories'), 'Mouse', 1, GETDATE(), 1)
INSERT INTO ProductType (ParentId, [Name], [Active], sysDTCreated, sysUserAddId)	
			VALUES ((SELECT ProductTypeId FROM ProductType WHERE [Name] = 'Accessories'), 'Keyboard', 1, GETDATE(), 1)


INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES(NULL, 'menu_200', 'Documents', '#', 'list_alt', 1, 1, GETDATE(), 1)

INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES((SELECT MenuId FROM Menu where Code = 'menu_200'), 'menu_201', 'Bill', '/documents/bill', 'receipt', 1, 1, GETDATE(), 1)

INSERT INTO Menu (ParentId, Code, [Name], [Url], [Image], Sort, Active, sysDTCreated, sysUserAddId)
				 VALUES((SELECT MenuId FROM Menu where Code = 'menu_200'), 'menu_202', 'Pricelist', '/documents/pricelist', 'library_books', 2, 1, GETDATE(), 1)

insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_200'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 
insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_201'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 
insert into MenuRole (MenuId, RoleId, Active, sysDTCreated, sysUserAddId)
					VALUES((SELECT MenuId FROM Menu where Code = 'menu_202'), (SELECT RoleId FROM [Role] WHERE Code = '1'), 1, GETDATE(), 1) 