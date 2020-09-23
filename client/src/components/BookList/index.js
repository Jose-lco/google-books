import React, { useState } from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import API from "../../utils/API"
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}


export function BookListItem({
  thumbnail,
  title,
  description,
  href, 
  author
}) {
  const [formObject, setFormObject] = useState({
    title: "",
    author: "",
    synopsis: ""
  })
  function addBooksToDatabase(event){
    event.preventDefault();
    setFormObject({
      title,
      author,
      synopsis: description
    })
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(() => setFormObject({
          title: "",
          author: "",
          synopsis: "",
        }))
        .then(() => {
          console.log("added")
        })
        .catch(err => console.log(err));
    }
  }
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail || "https://placehold.it/300x300"} />
          </Col>
          <Col size="xs-8 sm-9">
  <h3>{title} by {author}</h3>
            <p>Description: {description}</p>
            <a rel="noreferrer noopener" target="_blank" href={href}>
              Go read more!
            </a>
            <button type="button" className="btn btn-secondary" onClick={addBooksToDatabase}> Add to List</button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
