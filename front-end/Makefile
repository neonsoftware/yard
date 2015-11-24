test: context install
	@ echo "------------------- Running Tests "
	wct --skip-update-check -l chrome --webserver-port 2121

archive: clean context install
	@ echo "------------------- Creating build folder to be archived "
	cd app && make
	tar cvf dist.tar dist

clean:
	@ echo "------------------- Removing previous builds and temporary files "
	rm -fr dist.tar bower_components

install:
	@ echo "------------------- Installing Bower elements "
	rm -fr bower_components
	bower install

context:
	@ echo "------------------- Context "
	@ printf "    Bower version : "
	@ bower -v
	@ printf "    Node version : "
	@ node -v
	@ printf "    User : "
	@ whoami
