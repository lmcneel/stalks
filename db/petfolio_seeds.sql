Use stalks_db;

Insert Into User (firstname, lastname, username, email, password, balance, mongo_id, last_login, status)
Values ('Ozair', 'Khan', 'okhan', 'okhan@gmail.com', '111111', '5000000', 1, null, 'active'),
('Ross', 'Messer', 'rmess', 'rmess@gmail.com', '111111', '5000000', 2, null, 'active');

Insert Into User_logins (userId, updatedAt)
Values (1, '2018-07-07'),
(2, '2018-07-06');

Insert Into User_watchlist (userId, unique_stock_id)
Values (1, 1),
(1, 2),
(1, 3),
(2, 1), 
(2, 2);