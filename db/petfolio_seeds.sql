Use stalks_db;

Insert Into Users (firstname, lastname, username, email, password, balance, mongo_id, last_login, createdAt, updatedAt, status)
Values ('Ozair', 'Khan', 'okhan', 'okhan@gmail.com', '111111', '5000000', 1, null, '2018-07-07', '2018--7-10', 'active'),
('Ross', 'Messer', 'rmess', 'rmess@gmail.com', '111111', '5000000', 2, null, '2018-07-08', '2018--7-10', 'active');

Insert Into UserLogins (userId, createdAt, updatedAt)
Values (1, '2018-07-07', '2018-07-10'),
(2, '2018-07-06', '2018-07-10');

Insert Into UserWatchlists (UserId, uniqueStockSymbol, createdAt, updatedAt)
Values (1, 'HD', '2018-07-07', '2018-07-10'),
(1, 'GPRO', '2018-07-07', '2018-07-10'),
(1, 'LOW', '2018-07-07', '2018-07-10'),
(2, 'TSLA', '2018-07-07', '2018-07-10'), 
(2, 'KO', '2018-07-07', '2018-07-10');