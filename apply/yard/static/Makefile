PROJECT_NAME=yard

EXTENSION_BUILD_FOLDER=dist/extension
ONEFILE_BUILD_FOLDER=dist/onefile

all: onefile extension_crisp

onefile:
	@echo "--> onefile"
	vulcanize --inline-css --inline-scripts app/extension.html > $(ONEFILE_BUILD_FOLDER)/yard.html

extension_crisp:
	@echo "--> extension"
	vulcanize --inline-css --inline-scripts app/extension.html > $(EXTENSION_BUILD_FOLDER)/vulcanized.html
	crisper --source $(EXTENSION_BUILD_FOLDER)/vulcanized.html --html $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).html --js $(EXTENSION_BUILD_FOLDER)/$(PROJECT_NAME).js
	rm -fr $(EXTENSION_BUILD_FOLDER)/vulcanized.html

clean:
	rm -fr $(EXTENSION_BUILD_FOLDER)/*.html $(EXTENSION_BUILD_FOLDER)/*.js
	rm -fr $(ONEFILE_BUILD_FOLDER)/*.html $(ONEFILE_BUILD_FOLDER)/*.js
