export $(shell sed 's/=.*//' .env)

all:
	@echo "Usage make [target]\n\
	available targets:\n\
	\tinstall\t\tinstall dependencies\n\
	\tdev\t\tstart development server\n\
	\tbuild\t\tbuild production version\n\
	\tstart\t\tstart production server\n\
	\tclean\t\tremove build files\n\
	\tfclean\t\tremove build files and dependencies\n\
	\tre\t\trebuild production version"

install:
	@cd app && npm install

dev:
	@cd app && npm run dev

build:
	@cd app && npm run build

start: build
	@cd app && npm run start

## Drizzle ## drizzle-kit is a tool to manage database migrations
# see: https://orm.drizzle.team/kit-docs/overview#prototyping-with-db-push
db-push:
	cd app && npx drizzle-kit push:pg
# see: https://orm.drizzle.team/kit-docs/overview#schema-updates
db-generate:
	cd app && npx drizzle-kit generate:pg
clean:
	@cd app && rm -rf .next

fclean: clean
	# ask for confirmation
	@echo "This will remove all dependencies, are you sure? [y/N]"
	@read -r answer; \
	if [ "$$answer" = "y" ] || [ "$$answer" = "Y" ]; then \
		cd app && rm -rf node_modules; \
	fi

re: clean build

.PHONY: all dev build start clean fclean re