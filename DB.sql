CREATE TABLE `sieckin`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `login` VARCHAR(20) NOT NULL , `password` VARCHAR(20) NOT NULL , `code` VARCHAR(6) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`roles` (`id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `user_role` (`user_id` INT NOT NULL, `role_id` INT NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id), CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id)); 
CREATE TABLE `sieckin`.`movies` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(20) NOT NULL , `length` INT NOT NULL , `description` VARCHAR(500) NOT NULL , `state` ENUM(`new`, `running`, `retired`) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`cinemas` (`id` INT NOT NULL AUTO_INCREMENT , `location` VARCHAR(150) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`halls` (`id` INT NOT NULL AUTO_INCREMENT , `cinema_id` INT NOT NULL, `tag` VARCHAR(3) NOT NULL, `capacity` INT NOT NULL, PRIMARY KEY (`id`), CONSTRAINT fk_cinema_id FOREIGN KEY (cinema_id) REFERENCES cinemas(id));
CREATE TABLE `sieckin`.`showings` (`id` INT NOT NULL AUTO_INCREMENT , `hall_id` INT NOT NULL , `time` DATETIME NOT NULL , `movie_id` INT NOT NULL , PRIMARY KEY (`id`) , CONSTRAINT fk_hall_id FOREIGN KEY (hall_id) REFERENCES halls(id) , CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movies(id));
CREATE TABLE `sieckin`.`tickets` (`id` INT NOT NULL AUTO_INCREMENT , `showing_id` INT NOT NULL , `row` INT NOT NULL , `seat` INT NOT NULL , `customer` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`) , CONSTRAINT fk_showing_id FOREIGN KEY (showing_id) REFERENCES showings(id));
CREATE TABLE `sieckin`.`support_tickets` (`id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `title` VARCHAR(30) NOT NULL , `description` VARCHAR(500) NOT NULL , PRIMARY KEY (`id`) , CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE `sieckin`.`salaries` (`user_id` INT NOT NULL , `salary` INT NOT NULL , CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id));

--PROCEDURY DO TWORZENIA TABEL DLA SAL I SEANSÓW
DELIMITER //
CREATE PROCEDURE createHall(tblName VARCHAR(255))
BEGIN
    SET @tableName = tblName;
    SET @q = CONCAT('
        CREATE TABLE IF NOT EXISTS `' , @tableName, '` (
            `row` INT NOT NULL,
            `seats` INT NOT NULL
        )');
    PREPARE stmt FROM @q;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
CREATE PROCEDURE createShowing(tblName VARCHAR(255))
BEGIN
    SET @tableName = tblName;
    SET @q = CONCAT('
        CREATE TABLE IF NOT EXISTS `' , @tableName, '` (
            `row` INT NOT NULL,
            `seat` INT NOT NULL,
            `is_taken` BOOLEAN NOT NULL
        )');
    PREPARE stmt FROM @q;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
