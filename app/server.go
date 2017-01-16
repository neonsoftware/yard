package main

import (
	"github.com/syndtr/goleveldb/leveldb"
	"github.com/julienschmidt/httprouter"
	"fmt"
	"net/http"
	"log"
	"encoding/json"
)


// struct tag {
// 	id int
// 	name string
// }

// func tagHandler(w http.ResponseWriter, req *http.Request) {

// 	log.Println("\n::::::: ", req.RequestURI)
// 	device := &nms.Device{}

// 	// Unmarshaling the received json
// 	body, err := ioutil.ReadAll(req.Body)
// 	if err != nil {
// 		log.Println("ERROR reading body : %s", err)
// 		return
// 	}
// 	if err = json.Unmarshal(body, &device); err != nil {
// 		log.Println("ERROR unmarshaling : %s", err)
// 		return
// 	}

// 	output_file, err := GenerateDevice(device, data_dir, extra_svg)
// 	if output_file == "" {
// 		log.Println("Error during device building : ", err)
// 		w.WriteHeader(500)
// 		return
// 	}

// 	log.Println("\n:::::::: END - Output file is", output_file)
// 	w.Header().Set("Content-Type", "application/zip")
// 	w.Header().Set("Content-Disposition", "attachment; filename='file.zip'")
// 	http.ServeFile(w, req, output_file)
// }


func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, "Welcome!\n")
}

func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
}

func Pieces(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

data := make([]string, 0)
jData, err := json.Marshal(data)
if err != nil {
    panic(err)
    return
}
w.Header().Set("Content-Type", "application/json")
w.Write(jData)


    //fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
}

func main() {

	//var db 

	db, _ := leveldb.OpenFile("./my.db", nil)
	defer db.Close()

	_ = db.Put([]byte("key"), []byte("value"), nil)




    router := httprouter.New()
    router.GET("/", Index)
    router.GET("/pieces", Pieces)
    router.GET("/applications", Pieces)
    router.GET("/documents", Pieces)
    router.GET("/categories", Pieces)
    router.GET("/hello/:name", Hello)

    fmt.Println("Running build server at :8082")
    log.Fatal(http.ListenAndServe(":8082", router))
}
