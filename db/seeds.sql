INSERT INTO department(name)
VALUES
('Computer Support'),
('Information Technology'),
('Web Development'),
('Tech Sales'),
('Information Security Specialist');

INSERT INTO role (title, salary, department_id)
VALUES
('IT Manager', 110000, 1),
('Systems analyst', 60000, 1),
('UX/UI specialist', 90000, 2),
('Web Developer', 70000, 2),
('Tech Support', 60000, 3),
('IT Sales Executive', 66000, 3),
('Business Systems Analyst', 80000, 4),
('Security Specialist', 70000, 4),
('Cyber Security Manager', 150000, 5),
('Database Developer', 111177, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Gabriel', 'Ramos', 2, null),
('Anthony', 'Johnson', 1, 1),
('Maria', 'Garcia', 4, null),
('Robert', 'Jackson', 3, 3),
('Kimberly', 'Martinez', 6, null),
('Rosa', 'Campbell', 5, 5),
('Ericka', 'Robinson', 7, null),
('Mark', 'Lee', 8, 7),
('Teirique', 'Parker', 9, null),
('Chris', 'Carter', 10, null);