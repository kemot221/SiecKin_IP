CREATE TABLE `sieckin`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `login` VARCHAR(20) NOT NULL , `password` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`roles` (`id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE user_role (user_id INT NOT NULL, role_id INT NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id), CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id)); 

