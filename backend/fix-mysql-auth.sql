-- Fix MySQL authentication issue
-- Run this in MySQL Workbench or command line

-- Change root user to use mysql_native_password (compatible with older clients)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'oracle';

-- If you have a different host, use:
-- ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'oracle';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify the change
SELECT user, host, plugin FROM mysql.user WHERE user = 'root';

