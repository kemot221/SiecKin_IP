CREATE TABLE `sieckin`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `login` VARCHAR(20) NOT NULL , `password` VARCHAR(20) NOT NULL , `code` VARCHAR(6) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`roles` (`id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `user_role` (`user_id` INT NOT NULL, `role_id` INT NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id), CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id)); 
CREATE TABLE `sieckin`.`movies` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(20) NOT NULL , `length` INT NOT NULL , `description` VARCHAR(500) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`cinemas` (`id` INT NOT NULL AUTO_INCREMENT , `location` VARCHAR(150) NOT NULL , PRIMARY KEY (`id`));
CREATE TABLE `sieckin`.`halls` (`id` INT NOT NULL AUTO_INCREMENT , `cinema_id` INT NOT NULL, `tag` VARCHAR(3) NOT NULL, `capacity` INT NOT NULL, PRIMARY KEY (`id`), CONSTRAINT fk_cinema_id FOREIGN KEY (cinema_id) REFERENCES cinemas(id));
CREATE TABLE `sieckin`.`showings` (`id` INT NOT NULL AUTO_INCREMENT , `hall_id` INT NOT NULL , `time` DATETIME NOT NULL , `movie_id` INT NOT NULL , PRIMARY KEY (`id`) , CONSTRAINT fk_hall_id FOREIGN KEY (hall_id) REFERENCES halls(id) , CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movies(id));
CREATE TABLE `sieckin`.`tickets` (`id` INT NOT NULL AUTO_INCREMENT , `showing_id` INT NOT NULL , `row` INT NOT NULL , `seat` INT NOT NULL , PRIMARY KEY (`id`) , CONSTRAINT fk_showing_id FOREIGN KEY (showing_id) REFERENCES showings(id));

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

CREATE TABLE `sieckin`.`hall_1` (`row` INT NOT NULL , `seats` INT NOT NULL);

-- generate 10 insert statements for hall_1
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('1', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('2', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('3', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('4', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('5', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('6', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('7', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('8', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('9', '10');
INSERT INTO `sieckin`.`hall_1` (`row`, `seats`) VALUES ('10', '10');

-- drop last 3 rows
DELETE FROM `sieckin`.`hall_1` WHERE `row` = 10;
DELETE FROM `sieckin`.`hall_1` WHERE `row` = 9;
DELETE FROM `sieckin`.`hall_1` WHERE `row` = 8;

CREATE TABLE `sieckin`.`showing_1` (`row` INT NOT NULL , `seat` INT NOT NULL , `is_taken` BOOLEAN NOT NULL);
-- generate 70 insert statements for showing_1

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('1', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('2', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('3', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('4', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('5', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('6', '10', false);

INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '1', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '2', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '3', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '4', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '5', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '6', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '7', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '8', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '9', false);
INSERT INTO `sieckin`.`showing_1` (`row`, `seat`, `is_taken`) VALUES ('7', '10', false);

--set whole last row to taken
UPDATE `sieckin`.`showing_1` SET `is_taken` = true WHERE `row` = '7';