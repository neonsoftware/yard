PROJECT_NAME=yard

DIST_FOLDER=../dist
EXTENSION_BUILD_FOLDER=$(DIST_FOLDER)/extension
ONEFILE_BUILD_FOLDER=$(DIST_FOLDER)/onefile
DESKTOP_BUILD_FOLDER=$(DIST_FOLDER)/desktop_app

all: onefile extension_crisp

serve:
	. ../../../venv/bin/activate && cd ../.. && python manage.py runserver

onefile:
	@echo "--> onefile"
	vulcanize --inline-css --inline-scripts index.html > $(ONEFILE_BUILD_FOLDER)/yard.html

extension_crisp:
	@echo "--> extension"
	sed 's/main.css/main-extension.css/g' index.html	> extension.html
	vulcanize --inline-css --inline-scripts extension.html > $(EXTENSION_BUILD_FOLDER)/vulcanized.html
	crisper --source $(EXTENSION_BUILD_FOLDER)/vulcanized.html --html $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).html --js $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).js
	rm -fr extension.html
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
