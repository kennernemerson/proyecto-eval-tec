create database medios;

use medios;

CREATE TABLE plan (
    id int NOT NULL AUTO_INCREMENT,
    plan_medio varchar(255) NOT NULL,
    cliente varchar(255),
    campania varchar(255),
    PRIMARY KEY (id)
);

insert into plan (plan_medio, cliente, campania)
values('Enfluencers Enero','Maximo', 'Posicionamiento');
insert into plan (plan_medio, cliente, campania)
values('pasicionamiento san simon','centro de entrenamiento sar', 'Posicionamiento centro de er');



select * from plan ;