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