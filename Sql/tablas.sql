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
	NumPedido mediumint,
    Tel varchar(200),
    Estado varchar(100),
    Total double,
    HoraPedido time,
    HoraAceptado time,
    HoraPreparado time,
    HoraLlegada time,
    foreign key (Tel) references Cliente(Tel),
    primary key (NumPedidio,Tel)
);

create table Pidio(
	idArt mediumint references Articulo(idArt),
    NumPedido mediumint references Articulo(idArt),
    Cant int,
    primary key (idArt,NumPedido)
    
);

create table Usuario(
	username varchar(500) primary key,
    pass varchar(500)
);


update Usuario set pass = 'abc' where username = 'admin';