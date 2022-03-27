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

	CONSTRAINT fk_coverage_roll 
	FOREIGN KEY ([coverage]) REFERENCES tb_coverages (id),

	CONSTRAINT fk_dish_roll 
	FOREIGN KEY ([id]) REFERENCES tb_dishes (id)
);






CREATE TABLE tb_extras(
	[id] TINYINT PRIMARY KEY IDENTITY(1,1),
	[name] VARCHAR (25) NOT NULL,
	[price] int NOT NULL CHECK ([price]>=0),
	[state] bit NOT NULL DEFAULT 1,
)


CREATE TABLE tb_drinks(
	[id] TINYINT PRIMARY KEY,
	size SMALLINT NOT NULL CHECK (size>=0),

	CONSTRAINT fk_extra_drink 
	FOREIGN KEY ([id]) REFERENCES tb_extras (id)
)

CREATE TABLE tb_sauces(
	[id] TINYINT PRIMARY KEY,
	
	CONSTRAINT fk_extra_sauce
	FOREIGN KEY ([id]) REFERENCES tb_extras (id)
)

CREATE TABLE tb_entries(
	[id] TINYINT PRIMARY KEY,
	quantity TINYINT NOT NULL CHECK (quantity>=0),

	CONSTRAINT fk_extra_entry 
	FOREIGN KEY ([id]) REFERENCES tb_extras (id)
)





CREATE TABLE tb_food_packs(
	[id] SMALLINT PRIMARY KEY,
	quantity TINYINT NOT NULL CHECK (quantity>=0)
)



CREATE TABLE tb_extras_packs(
	[extra_id] TINYINT,
	[pack_id] SMALLINT,
	PRIMARY KEY([extra_id],[pack_id]),

	CONSTRAINT fk_extras_packs_extra 
	FOREIGN KEY ([extra_id]) REFERENCES tb_extras (id),

	CONSTRAINT fk_extras_packs_pack 
	FOREIGN KEY ([pack_id]) REFERENCES tb_food_packs (id)
)


CREATE TABLE tb_dishes_packs(
	[dish_id] SMALLINT,
	[pack_id] SMALLINT,
	PRIMARY KEY([dish_id],[pack_id]),

	CONSTRAINT fk_dish_packs_dish 
	FOREIGN KEY ([dish_id]) REFERENCES tb_dishes (id),

	CONSTRAINT fk_dish_packs_pack 
	FOREIGN KEY ([pack_id]) REFERENCES tb_food_packs (id)
)


CREATE TABLE tb_combos(
	[id] SMALLINT PRIMARY KEY IDENTITY(1,1),
	[name] VARCHAR (25) NOT NULL,
	[price] int NOT NULL CHECK ([price]>=0),
	[state] bit NOT NULL DEFAULT 1,
)




CREATE TABLE tb_packs_combos(
	[combo_id] SMALLINT,
	[pack_id] SMALLINT,
	quantity TINYINT NOT NULL CHECK (quantity>=0)

	PRIMARY KEY([combo_id],[pack_id]),

	CONSTRAINT fk_packs_combos_combo
	FOREIGN KEY ([combo_id]) REFERENCES tb_combos (id),

	CONSTRAINT fk_packs_combos_pack 
	FOREIGN KEY ([pack_id]) REFERENCES tb_food_packs (id)
)


CREATE TABLE tb_orders(
	[id] INT PRIMARY KEY IDENTITY(1,1),
)


CREATE TABLE tb_combos_orders(
	[combo_id] SMALLINT,
	[order_id] INT,

	PRIMARY KEY([combo_id],[order_id]),

	CONSTRAINT fk_combos_orders_combo
	FOREIGN KEY ([combo_id]) REFERENCES tb_combos (id),

	CONSTRAINT fk_combos_orders_order
	FOREIGN KEY ([order_id]) REFERENCES tb_orders (id)
)



CREATE TABLE tb_packs_orders(
	[pack_id] SMALLINT,
	[order_id] INT,

	PRIMARY KEY([pack_id],[order_id]),

	CONSTRAINT fk_packs_orders_pack
	FOREIGN KEY ([pack_id]) REFERENCES tb_food_packs (id),

	CONSTRAINT fk_packs_orders_order
	FOREIGN KEY ([order_id]) REFERENCES tb_orders (id)
)
