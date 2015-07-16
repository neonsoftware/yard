
BUILD_FOLDER=dist/extension
PROJECT_NAME=yard

all: crisp

crisp:
		vulcanize --inline-css --inline-scripts app/extension.html > $(BUILD_FOLDER)/vulcanized.html
		crisper --source $(BUILD_FOLDER)/vulcanized.html --html $(BUILD_FOLDER)/$(PROJECT_NAME).html --js $(BUILD_FOLDER)/$(PROJECT_NAME).js
		rm -fr $(BUILD_FOLDER)/vulcanized.html

clean:
		rm -fr $(BUILD_FOLDER)/*.html $(BUILD_FOLDER)/*.js
