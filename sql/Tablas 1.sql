CREATE DATABASE Happy_Sushi;
USE Happy_Sushi;

CREATE TABLE tb_ingredients(
	[id] TINYINT PRIMARY KEY IDENTITY(1,1),
	[name] VARCHAR (25) NOT NULL,
	[type] VARCHAR (4) NOT NULL CHECK ([type] in ('ROLL','DISH','BOTH')),
	[picture] VARBINARY (MAX) NOT NULL,
	[state] bit NOT NULL DEFAULT 1,
);

CREATE TABLE tb_dishes(
	[id] SMALLINT PRIMARY KEY IDENTITY(1,1),
	[name] VARCHAR (25) NOT NULL,
	[price] int NOT NULL CHECK ([price]>=0),
	[picture] VARBINARY (MAX) NOT NULL,
	[state] bit NOT NULL DEFAULT 1,
);

CREATE TABLE tb_ingredients_dishes(
	[ingredient_id] TINYINT,
	[dish_id] SMALLINT,
	PRIMARY KEY([ingredient_id],[dish_id]),

	CONSTRAINT fk_ingredient_dish_ingredient 
	FOREIGN KEY ([ingredient_id]) REFERENCES tb_ingredients (id),

	CONSTRAINT fk_ingredient_dish_dish 
	FOREIGN KEY ([dish_id]) REFERENCES tb_dishes (id)
);

CREATE TABLE tb_coverages(
	[id] TINYINT PRIMARY KEY IDENTITY(1,1),
	[name] VARCHAR (25) NOT NULL,
	[picture] VARBINARY (MAX) NOT NULL,
	[state] bit NOT NULL DEFAULT 1
);

CREATE TABLE tb_rolls(
	[id] SMALLINT PRIMARY KEY,
	[tempura] bit NOT NULL DEFAULT 0,
	[coverage] TINYINT NOT NULL,
	[state] bit NOT NULL DEFAULT 1,

	CONSTRAINT fk_coverage_roll 
	FOREIGN KEY ([coverage]) REFERENCES tb_coverages (id),

	CONSTRAINT fk_dish_roll 
	FOREIGN KEY ([id]) REFERENCES tb_dishes (id)
);