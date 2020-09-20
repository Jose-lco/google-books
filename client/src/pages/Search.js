import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/BookList"
import { Input, FormBtn } from "../components/Form";
function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [bookSearch, setBookSearch] = useState("")
  
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setBookSearch(value)
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    API.search(bookSearch).then(res => {
        console.log(res.data.items)
       setBooks(res.data.items) 
    })
        .catch(err => console.log(err));
    }
  
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Search for a Book"
                value={bookSearch}
              />
              
              <FormBtn
                disabled={!(bookSearch)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          </Row>
            <Row>
          <Col size="xs-12">
            {!books.length ? (
              <h1 className="text-center">No Books to Display</h1>
            ) : (
              <BookList>
                {books.map(book => {
                  return (
                    <BookListItem
                      key={book.id}
                      title={book.volumeInfo.title}
                      author={book.volumeInfo.authors[0]}
                      href={book.volumeInfo.infoLink}
                      description={book.volumeInfo.description}
                      thumbnail={book.volumeInfo.imageLinks.thumbnail}
                    />
                  );
                })}
              </BookList>
            )}
          </Col>
        </Row>
          
      </Container>
    );
  }

export default Search;
