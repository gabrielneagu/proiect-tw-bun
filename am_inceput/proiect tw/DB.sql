IF(DB_ID('Proiect') IS NULL)
	CREATE DATABASE Proiect
GO
use Proiect;
GO

if OBJECT_ID('Utilizatori') is null
		create table Utilizatori
		(
		idUtilizator int not null IDENTITY(1,1),
		numeUtilizator nvarchar(100) not null,
		constraint PK_Utilizator primary key (idUtilizator)
		)
GO

if OBJECT_ID('Alimente') is null
		create table Alimente
		(
		idAliment int not null IDENTITY(1,1),
		numeAliment nvarchar(100) not null,
		dataExpirare date not null,
		disponibilitate bit not null,
		idUtilizator int not null,
		constraint PK_Aliment primary key (idAliment)
		)
GO

if OBJECT_ID('FK_Aliment_Utilizator') is null
		alter table Alimente add constraint FK_Aliment_Utilizator 
		foreign key (idUtilizator) references Utilizatori(idUtilizator)
GO

if OBJECT_ID('Claim') is null
		create table Claim
		(
		idClaim int not null IDENTITY(1,1),
		idUtilizator int not null,
		idAliment int not null,
		constraint PK_Claim primary key (idClaim)
		)
GO

if OBJECT_ID('FK_Claim_Utilizator') is null
		alter table Claim add constraint FK_Claim_Utilizator 
		foreign key (idUtilizator) references Utilizatori(idUtilizator)
GO

if OBJECT_ID('FK_Claim_Aliment') is null
		alter table Claim add constraint FK_Claim_Aliment 
		foreign key (idAliment) references Alimente(idAliment)
GO

select* from Utilizatori;
select* from Alimente;

