

.PHONY: help install setup start run stop restart status clean

# Checking if we are on Windows or Mac/Linux
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell uname -s)
endif

# The help command to show what we can do
help:
	@printf "\n"
	@printf "  \033[0;32mmake run\033[0m        \033[0;32m- Install + Setup + Start\033[0m\n"
	@printf "  \033[0;31mmake stop\033[0m       \033[0;31m- Stop MySQL service\033[0m\n"
	@printf "  \033[0;36mmake restart\033[0m    \033[0;36m- Restart MySQL service\033[0m\n"
	@printf "  \033[0;35mmake status\033[0m     \033[0;35m- Check if MySQL is running\033[0m\n"
	@printf "  \033[0;35mmake clean\033[0m      \033[0;35m- Clean up dependencies\033[0m\n"
	@printf "\n"

# Installing all the node modules we need
install:
	@printf "\033[0;34mInstalling dependencies...\033[0m\n"
	@cd "$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))" && \
	if [ ! -f package.json ]; then \
		printf "\033[1;33mNo package.json found. Creating minimal package.json...\033[0m\n"; \
		echo '{"name":"securelog","version":"1.0.0","main":"server-database.js","scripts":{"start":"node server-database.js"},"dependencies":{"express":"^4.18.2","mysql2":"^3.6.0","cors":"^2.8.5"}}' > package.json; \
	fi && npm install && \
	printf "\033[0;32mDependencies installed successfully!\033[0m\n"

# Setting up the database with the schema and data
setup:
	@printf "\033[0;34mSetting up database...\033[0m\n"
	@printf "\033[0;36mPlease enter your MySQL credentials\033[0m\n"
	@printf "\n"
	@printf "\033[1;33mEnter your MySQL root password:\033[0m "; \
	if [ "$(DETECTED_OS)" = "Windows" ]; then \
		read MYSQL_PASSWORD; \
	else \
		stty -echo; \
		read MYSQL_PASSWORD; \
		stty echo; \
	fi; \
	printf "\n"; \
	printf "\033[1;33mEnter MySQL port (default 3306):\033[0m "; \
	read MYSQL_PORT; \
	MYSQL_PORT=$${MYSQL_PORT:-3306}; \
	printf "\033[0;36mImporting database schema...\033[0m\n"; \
	MYSQL_PWD=$$MYSQL_PASSWORD mysql -u root -P$$MYSQL_PORT < data_files/schema.sql && \
	printf "\033[0;32mSchema imported successfully!\033[0m\n" && \
	printf "\033[0;36mImporting incident data (3000+ records)...\033[0m\n"; \
	MYSQL_PWD=$$MYSQL_PASSWORD mysql -u root -P$$MYSQL_PORT project < data_files/all_incidents_data.sql && \
	printf "\033[0;32mData imported successfully!\033[0m\n" && \
	printf "\033[0;32mDatabase setup complete!\033[0m\n" || \
	printf "\033[0;31mDatabase setup failed!\033[0m\n"

# Starting the server
start:
	@printf "\033[0;36mStarting SecureLog application on port 3000...\033[0m\n"
	@if [ -f server-database.js ]; then \
		node server-database.js; \
	else \
		printf "\033[0;31mError: server-database.js not found!\033[0m\n"; \
		printf "\033[1;33mPlease create a server-database.js file to run the application.\033[0m\n"; \
		exit 1; \
	fi

# One command to rule them all (install, setup, start)
run:
	@make install
	@printf "\n"
	@make setup
	@printf "\n"
	@make start

# Stopping the database service
stop:
	@printf "\033[1;33mStopping MySQL...\033[0m\n"
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		net stop mysql && printf "\033[0;32mMySQL stopped!\033[0m\n" || printf "\033[0;31mFailed to stop MySQL (try running as Admin)!\033[0m\n"; \
	else \
		brew services stop mysql && printf "\033[0;32mMySQL stopped!\033[0m\n" || printf "\033[0;31mFailed to stop MySQL!\033[0m\n"; \
	fi

# Restarting the database if it acts up
restart:
	@printf "\033[1;33mRestarting MySQL...\033[0m\n"
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		net stop mysql && net start mysql && printf "\033[0;32mMySQL restarted!\033[0m\n" || printf "\033[0;31mFailed to restart MySQL (try running as Admin)!\033[0m\n"; \
	else \
		brew services restart mysql && printf "\033[0;32mMySQL restarted!\033[0m\n" || printf "\033[0;31mFailed to restart MySQL!\033[0m\n"; \
	fi

# Checking if the database is actually running
status:
	@printf "\033[0;34mChecking MySQL status...\033[0m\n"
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		sc query mysql | grep STATE; \
	else \
		brew services list | grep mysql; \
	fi
	@printf "\n"
	@printf "\033[0;34mTesting connection...\033[0m\n"
	@mysql -u root -p -e "SELECT 'MySQL is running!' as Status;" 2>/dev/null && \
	printf "\033[0;32mMySQL is running!\033[0m\n" || \
	printf "\033[0;31mCannot connect to MySQL\033[0m\n"

# Cleaning up all the installed stuff
clean:
	@printf "\033[0;35mCleaning up node_modules...\033[0m\n"
	@rm -rf node_modules && \
	printf "\033[0;32m✓ node_modules removed\033[0m\n" || \
	printf "\033[0;31mFailed to remove node_modules\033[0m\n"
	@printf "\033[0;35mCleaning up dependencies...\033[0m\n"
	@rm -rf package.json package-lock.json && \
	printf "\033[0;32m✓ package.json and package-lock.json removed\033[0m\n" || \
	printf "\033[0;31mFailed to remove dependency files\033[0m\n"
	@printf "\033[0;32mCleanup complete!\033[0m\n"
