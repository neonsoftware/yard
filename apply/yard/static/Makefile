PROJECT_NAME=yard

EXTENSION_BUILD_FOLDER=dist/extension
ONEFILE_BUILD_FOLDER=dist/onefile
DESKTOP_BUILD_FOLDER=dist/desktop_app

all: onefile extension_crisp

serve:
	. ../../../venv/bin/activate && cd ../.. && python manage.py runserver

onefile:
	@echo "--> onefile"
	vulcanize --inline-css --inline-scripts index.html > $(ONEFILE_BUILD_FOLDER)/yard.html

extension_crisp:
	@echo "--> extension"
	vulcanize --inline-css --inline-scripts extension.html > $(EXTENSION_BUILD_FOLDER)/vulcanized.html
	crisper --source $(EXTENSION_BUILD_FOLDER)/vulcanized.html --html $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).html --js $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).js
	rm -fr $(EXTENSION_BUILD_FOLDER)/vulcanized.html

desktop:
	@echo "--> desktop"
	vulcanize --inline-css --inline-scripts extension.html > $(DESKTOP_BUILD_FOLDER)/vulcanized.html
	crisper --source $(DESKTOP_BUILD_FOLDER)/vulcanized.html --html $(DESKTOP_BUILD_FOLDER)/$(PROJECT_NAME).html --js $(DESKTOP_BUILD_FOLDER)/$(PROJECT_NAME).js
	rm -fr $(DESKTOP_BUILD_FOLDER)/vulcanized.html
	mkdir -p $(DESKTOP_BUILD_FOLDER)/build
	cd $(DESKTOP_BUILD_FOLDER) && npm run build


clean:
	rm -fr $(EXTENSION_BUILD_FOLDER)/*.html $(EXTENSION_BUILD_FOLDER)/*.js
	rm -fr $(ONEFILE_BUILD_FOLDER)/*.html $(ONEFILE_BUILD_FOLDER)/*.js
	rm -fr $(DESKTOP_BUILD_FOLDER)/$(PROJECT_NAME).html $(DESKTOP_BUILD_FOLDER)/$(PROJECT_NAME).js
