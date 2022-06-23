use rollsito;
create table Cliente(
	Tel varchar(200) primary key,
    Dir varchar(500),
    Nombre varchar(200)
);
create table Articulo(
	idArt mediumint primary key auto_increment not null,
    Ingredientes varchar(500),
    Nombre varchar(200),
    Disponible boolean,
    Precio double,
    Foto mediumblob
);
create table Pedido(
	NumPedido mediumint primary key auto_increment not null,
    Tel varchar(200),
    Estado varchar(100),
    Total double,
    HoraPedido time,
    HoraAceptado time,
    HoraPreparado time,
    HoraLlegada time,
    foreign key (Tel) references Cliente(Tel)
);

create table Extra(
	idE mediumint primary key auto_increment not null,
	Nombre varchar(200),
    Drecripcion varchar(500),
    Precio double
);

create table PuedeTenerExtra(
	idArt mediumint references Articulo(idArt),
    idE mediumint references Extra(idE),
    primary key (idArt, idE)
);

create table PidioExtra(
	idPE mediumint primary key auto_increment not null,
    Cant int,
    idE mediumint references Extra(idE),
    idPidio mediumint references Pidio(idPidio)
);
create table Pidio(
	idPidio mediumint primary key auto_increment not null,
	idArt mediumint references Articulo(idArt),
    NumPedido mediumint references Pedido(NumPedido)
);
create table Usuario(
	username varchar(500) primary key,
    pass varchar(500),
    roll VARCHAR(45)
);


