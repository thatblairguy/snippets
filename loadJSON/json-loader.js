'use strict';

/**
 * This example uses JSONStream, a streaming JSON parser to read a series of
 * JSON objects from a stream. In this example, the stream comes from a file,
 * but it could be ANY stream (The JSONStream documentation uses a stream
 * from an HTTP request).
 * 
 * This program reads a series of book information structures with the form:
 *    	{
 *    		"author" : NAME,
 *    		"title" : TITLE,
 *    		"isbn" : ISBN,
 *    		"pub_date" : PUBLICATION_DATE,
 *    		"publisher" : PUBLISHER
 *    	}
 * and outputs a list of books by author.
 */

const DATA_FILE = 'data.json';

var fs = require('fs');
var JSONStream = require('JSONStream');

var rs = fs.createReadStream(DATA_FILE);
var js = JSONStream.parse('*');

// Empty object for storing information about books.
var bookData = {};

// Tap into the stream. Passing the JSONStream object to the stream's pipe,
// causes 'data' events to be passed a JSON object. 
rs.on('error', (err) => {console.dir(err);})
  .pipe(js)
  .on('error', (err) => {console.dir(err);})
  .on('data', BookDataHandler)  // For each JSON record, call BookDataHandler().
  .on('end', OutputResult);     // When all records are processed, call OutputResult().

/**
 * Callback method for handling an individual book.
 */
function BookDataHandler(book) {
  // Find the info block for the book's author. Create one if it doesn't exist.
  let authorInfo = bookData[book.author];
  if(!authorInfo) {
    bookData[book.author] = {};
    authorInfo = bookData[book.author];
    authorInfo.name = book.author;
    authorInfo.bibliography = [];
  }

  // Add a book to the bibliography
  authorInfo.bibliography.push(book.title);
}

/**
 * Callback method for handling the end of data event.
 */
function OutputResult() {
  for (let key in bookData) {
    let bibliography = bookData[key].bibliography;
    console.log(key + ' wrote:');
    for(let index in bibliography) {
      console.log('\t' + bibliography[index]);
    }
    console.log();
  }
}