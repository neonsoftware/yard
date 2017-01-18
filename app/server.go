package main

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"github.com/syndtr/goleveldb/leveldb"
	"github.com/syndtr/goleveldb/leveldb/util"
	"log"
	"math/rand"
	"net/http"
	"os"
)

var db *leveldb.DB

const keyLen = 6
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

type (
	// User represents the structure of our resource
	Application struct {
		Id           string `json:"id"`
		Portal       string `json:"portal"`
		PortalLink   string `json:"portal_link"`
		Company      string `json:"company"`
		CompanyLink  string `json:"company_link"`
		Position     string `json:"position"`
		PositionLink string `json:"position_link"`
		Salary       string `json:"salary"`
		Contract     string `json:"contract"`
		Latitude     string `json:"latitude"`
		Longitude    string `json:"longitude"`
		Skills       string `json:"skills"`
		Written      bool   `json:"written"`
		Called       bool   `json:"called"`
		Interviewed  bool   `json:"interviewed"`
		Followup     bool   `json:"followup"`
		Notes        string `json:"notes"`
		Next         string `json:"next"`
		Cover        string `json:"content"`
		Address1     string `json:"address1"`
		Address2     string `json:"address2"`
		C1Name       string `json:"c1name"`
		C1Mail       string `json:"c1mail"`
		C1Phone      string `json:"c1phone"`
		C2Name       string `json:"c2name"`
		C2Mail       string `json:"c2mail"`
		C2Phone      string `json:"c2phone"`
		C3Name       string `json:"c3name"`
		C3Mail       string `json:"c3mail"`
		C3Phone      string `json:"c3phone"`
		C4Name       string `json:"c4name"`
		C4Mail       string `json:"c4mail"`
		C4Phone      string `json:"c4phone"`
	}

	// User represents the structure of our resource
	Cover struct {
		Id      string `json:"id"`
		Name    string `json:"name"`
		Content string `json:"content"`
	}

	// User represents the structure of our resource
	Category struct {
		Id          string `json:"id"`
		Tags        string `json:"tags"`
		Pieces      string `json:"pieces"`
		Description string `json:"description"`
		Name        string `json:"name"`
		Language    string `json:"language"`
	}

	// User represents the structure of our resource
	Block struct {
		Id       string `json:"id"`
		Tags     string `json:"tags"`
		Legend   string `json:"legend"`
		Language string `json:"language"`
		Content  string `json:"content"`
	}
)

func NewKey(prefix string) string {
	b := make([]byte, keyLen)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return prefix + "-" + string(b)
}

func Applications(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	blocks := make([]Application, 0)

	t := Application{}
	jt, _ := json.Marshal(t)
	log.Println("New is", string(jt))

	iter := db.NewIterator(util.BytesPrefix([]byte("a-")), nil)
	for iter.Next() {
		t := Application{}
		json.Unmarshal(iter.Value(), &t)
		blocks = append(blocks, t)
	}
	iter.Release()
	err := iter.Error()
	if err != nil {
		log.Panic("Error iterating")
	}

	jData, err := json.Marshal(blocks)
	if err != nil {
		panic(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jData)
}

func ApplicationsDetail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	data, err := db.Get([]byte(ps.ByName("id")), nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func ApplicationsUpdate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	log.Println("update id ", ps.ByName("id"))
	t := Application{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding application")
		w.WriteHeader(500)
	}
	t.Id = ps.ByName("id")
	tj, _ := json.Marshal(t)

	err = db.Put([]byte(ps.ByName("id")), tj, nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(tj)
}

func ApplicationsNew(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// Stub an user to be populated from the body
	t := Application{}
	log.Println("New is", t)
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding application")
		w.WriteHeader(500)
	}

	// Add an Id
	for present := true; present; {
		t.Id = NewKey("a")
		present, _ = db.Has([]byte(t.Id), nil)
	}

	tj, _ := json.Marshal(t)
	err = db.Put([]byte(t.Id), tj, nil)
	if err != nil {
		log.Println("Problems saving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	w.Write(tj)
}

func Covers(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	blocks := make([]Cover, 0)

	iter := db.NewIterator(util.BytesPrefix([]byte("co-")), nil)
	for iter.Next() {
		t := Cover{}
		json.Unmarshal(iter.Value(), &t)
		blocks = append(blocks, t)
	}
	iter.Release()
	err := iter.Error()
	if err != nil {
		log.Panic("Error iterating")
	}

	jData, err := json.Marshal(blocks)
	if err != nil {
		panic(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jData)
}

func CoversDetail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	data, err := db.Get([]byte(ps.ByName("id")), nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func CoversUpdate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	log.Println("update id ", ps.ByName("id"))
	t := Cover{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding cover")
		w.WriteHeader(500)
	}
	t.Id = ps.ByName("id")
	tj, _ := json.Marshal(t)

	err = db.Put([]byte(ps.ByName("id")), tj, nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(tj)
}

func CoversNew(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// Stub an user to be populated from the body
	t := Cover{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding piece")
		w.WriteHeader(500)
	}

	// Add an Id
	for present := true; present; {
		t.Id = NewKey("co")
		present, _ = db.Has([]byte(t.Id), nil)
	}

	tj, _ := json.Marshal(t)
	err = db.Put([]byte(t.Id), tj, nil)
	if err != nil {
		log.Println("Problems saving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	w.Write(tj)
}

func Categories(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	blocks := make([]Category, 0)

	iter := db.NewIterator(util.BytesPrefix([]byte("ca-")), nil)
	for iter.Next() {
		t := Category{}
		json.Unmarshal(iter.Value(), &t)
		blocks = append(blocks, t)
	}
	iter.Release()
	err := iter.Error()
	if err != nil {
		log.Panic("Error iterating")
	}

	jData, err := json.Marshal(blocks)
	if err != nil {
		panic(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jData)
}

func CategoriesDetail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	data, err := db.Get([]byte(ps.ByName("id")), nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func CategoriesUpdate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	log.Println("update id ", ps.ByName("id"))
	t := Category{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding category")
		w.WriteHeader(500)
	}
	t.Id = ps.ByName("id")
	tj, _ := json.Marshal(t)

	err = db.Put([]byte(ps.ByName("id")), tj, nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(tj)
}

func CategoriesNew(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// Stub an user to be populated from the body
	t := Category{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding piece")
		w.WriteHeader(500)
	}

	// Add an Id
	for present := true; present; {
		t.Id = NewKey("ca")
		present, _ = db.Has([]byte(t.Id), nil)
	}

	tj, _ := json.Marshal(t)
	err = db.Put([]byte(t.Id), tj, nil)
	if err != nil {
		log.Println("Problems saving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	w.Write(tj)
}

func Pieces(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	blocks := make([]Block, 0)

	iter := db.NewIterator(util.BytesPrefix([]byte("t-")), nil)
	for iter.Next() {
		t := Block{}
		json.Unmarshal(iter.Value(), &t)
		blocks = append(blocks, t)
	}
	iter.Release()
	err := iter.Error()
	if err != nil {
		log.Panic("Error iterating")
	}

	jData, err := json.Marshal(blocks)
	if err != nil {
		panic(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jData)
}

func PiecesDetail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	data, err := db.Get([]byte(ps.ByName("id")), nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func PiecesUpdate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	log.Println("update id ", ps.ByName("id"))
	t := Block{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding piece")
		w.WriteHeader(500)
	}
	t.Id = ps.ByName("id")
	tj, _ := json.Marshal(t)

	err = db.Put([]byte(ps.ByName("id")), tj, nil)
	if err != nil {
		log.Println("Problems retrieving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(tj)
}

func ElementDelete(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	err := db.Delete([]byte(ps.ByName("id")), nil)
	if err != nil {
		log.Println("Problems deleting !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
}

func PiecesNew(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// Stub an user to be populated from the body
	t := Block{}
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal("error decoding piece")
		w.WriteHeader(500)
	}

	// Add an Id
	for present := true; present; {
		t.Id = NewKey("t")
		present, _ = db.Has([]byte(t.Id), nil)
	}

	tj, _ := json.Marshal(t)
	err = db.Put([]byte(t.Id), tj, nil)
	if err != nil {
		log.Println("Problems saving !!!")
		w.WriteHeader(500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	w.Write(tj)
}

func main() {

	db_file := "/Users/sammythegoat/Documents/text_data/my.db"
	if len(os.Args[1:]) > 0 {
		db_file = os.Args[1]
	}

	f, err := os.OpenFile("/tmp/servy", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	defer f.Close()
	if err != nil {
		log.Fatalf("error opening file %s : %v", db_file, err)
	}

	log.SetOutput(f)

	//var db
	db, err = leveldb.OpenFile(db_file, nil)
	defer db.Close()
	if err != nil {
		log.Fatal("Could not open database")
	}

	_ = db.Put([]byte("key"), []byte("value"), nil)

	log.Println("Starting to handling")

	router := httprouter.New()
	router.HandleMethodNotAllowed = false

	router.GET("/pieces", Pieces)
	router.POST("/pieces", PiecesNew)
	router.GET("/pieces/:id", PiecesDetail)
	router.PUT("/pieces/:id", PiecesUpdate)
	router.DELETE("/pieces/:id", ElementDelete)

	router.GET("/categories", Categories)
	router.POST("/categories", CategoriesNew)
	router.GET("/categories/:id", CategoriesDetail)
	router.PUT("/categories/:id", CategoriesUpdate)
	router.DELETE("/categories/:id", ElementDelete)

	router.GET("/documents", Covers)
	router.POST("/documents", CoversNew)
	router.GET("/documents/:id", CoversDetail)
	router.PUT("/documents/:id", CoversUpdate)
	router.DELETE("/documents/:id", ElementDelete)

	router.GET("/applications", Applications)
	router.POST("/applications", ApplicationsNew)
	router.GET("/applications/:id", ApplicationsDetail)
	router.PUT("/applications/:id", ApplicationsUpdate)
	router.DELETE("/applications/:id", ElementDelete)

	log.Println("Running build server at :8082")
	log.Fatal(http.ListenAndServe(":8082", router))
}

// 	log.Println("\n:::::::: END - Output file is", output_file)
// 	w.Header().Set("Content-Type", "application/zip")
// 	w.Header().Set("Content-Disposition", "attachment; filename='file.zip'")
// 	http.ServeFile(w, req, output_file)
// }
