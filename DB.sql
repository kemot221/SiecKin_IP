CREATE TABLE `sieckin`.`users` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `login` VARCHAR(20) NOT NULL , `password` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));

INSERT INTO `users` (`id`, `email`, `login`, `password`) VALUES (NULL, 'admin@mail.com', 'admin', 'zaq21wSX');
