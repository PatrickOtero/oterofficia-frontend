create database oterofficia_database;

create table studyPosts (
	id serial not null,
  	title varchar(20) not null,
  	content text not null
);

create table projects (
	id serial not null,
  	image_url text not null,
  	project_name varchar(20),
  	project_desc text not null,
  	frontend_url text,
  	backend_url text,
  	video_url text
)