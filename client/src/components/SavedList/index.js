import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import API from "../../utils/API";
export function SavedList({ children }) {
  return <ul className="list-group">{children}</ul>;
}


export function SavedListItem({
  thumbnail,
  title,
  description,
  href,
  author,
  key
}) {

  function deleteBook(id) {
    API.deleteBook(id)
      .catch(err => console.log(err));
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
            <button onClick={deleteBook(key)}> Delete from list</button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
