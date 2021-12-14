create table neptun(
	id int not null AUTO_INCREMENT,
    neptun_Code varchar(6) not null,
    
    CONSTRAINT PK_neptun PRIMARY KEY(id),
    CONSTRAINT UQ_neptun_neptun_Code UNIQUE(neptun_code)
);


create table address(
	id int not null AUTO_INCREMENT,
    zip_code int(4) not null,
    city varchar(200) not null,
    street_name varchar(200) not null,
    street_number varchar(15) not null,
    
    CONSTRAINT PK_address PRIMARY key (id)
);

create table student(
    id int not null AUTO_INCREMENT,
    name varchar(250) not null,
    tin char(10) not null,
    ssn char(9) not null,
    email varchar(200) DEFAULT null,
    phone varchar(200) DEFAULT null,
    neptun_id int,
    address_id int,
    
    CONSTRAINT PK_students PRIMARY key(id),
    CONSTRAINT UQ_students_tin UNIQUE(tin),
    CONSTRAINT UQ_students_ssn UNIQUE(ssn),
    CONSTRAINT FK_students_neptun_id FOREIGN KEY student(neptun_id) REFERENCES neptun(id),
    CONSTRAINT FK_students_address_id FOREIGN KEY student(address_id) REFERENCES address(id)
);

INSERT INTO neptun(neptun_Code)
VALUES
('OFQ8AE'),('KJU487'),('EJG955');

INSERT INTO address(zip_code, city, street_name, street_number)
VALUES
(3400,'Mezőkövesd', 'János út', '68'),
(3300,'Eger', 'Kelemen út', '13/b'),
(3420,'Nekeresd falva', 'Eötvös út', '69');

INSERT INTO student(name, tin, ssn, email, phone, neptun_id, address_id)
VALUES
('Fügedi Csaba', '1234567879', '123456789', 'fugedic@gmail.com', '+36307777777', 1, 1),
('Fazekas Tóni', '1234576879', '123446789', 'toni89@gmail.com', '+36303333333', 2, 2),
('Talléros Emese', '1234567679', '123486789', 'emese69@gmail.com', '+36305555555', 3, 3);