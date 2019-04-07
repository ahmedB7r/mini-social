import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, likeItem, unlikeItem, comment } from "../actions/itemActions";
import PropTypes from "prop-types";
import EditModal from "./EditModal";
class ShoppingList extends Component {
  state = {
    comment: '',
    postId: ''
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getId = id => {
    this.setState({ postId: id });

  }
  onSubmit = (e, _id) => {
    e.preventDefault();

    const comment = {
      comment: this.state.comment,
      userId: this.props.auth.user._id,
      postId: this.state.postId
    };
    // Add comment via comment action
    this.props.comment(comment);
    this.setState({ [e.target.name]: "" });

  };
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  like = (likeIds) => {

    this.props.likeItem(likeIds._id, likeIds.user._id);

  };
  unLike = (unLikeIds) => {
    this.props.unlikeItem(unLikeIds._id, unLikeIds.user._id);


  }
  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Container>


        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, likes, comments }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Container>
                    <Row>
                      <Col xs="1">  <Button
                        className="remove-btn mb-3"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                  </Button>

                      </Col>
                      <Col xs="11">
                        <EditModal id={_id} className="h-25" />

                      </Col>
                    </Row>
                    <Row>
                      <Col><h3 className="mb-3">
                        {name}
                      </h3></Col>

                    </Row>
                    <Row>
                      <Col xs="1">  <Button
                        className="remove-btn "
                        color="danger"
                        size="sm"
                      >
                        {likes.length}
                      </Button></Col>
                      <Col xs="8">  {isAuthenticated ? likes.filter(like => like === user._id).toString() !== user._id
                        ? (
                          <Button
                            className="like-btn "
                            color="primary"
                            size="sm"
                            onClick={this.like.bind(this, { _id, user })}
                          >
                            like
                      </Button>
                        ) :
                        (
                          <Button
                            className="like-btn "
                            color="primary"
                            size="sm"
                            onClick={this.unLike.bind(this, { _id, user })}
                          >
                            unlike
                    </Button>
                        )
                        : (
                          <Button
                            className="like-btn mx-3"
                            color="primary"
                            size="sm"
                            disabled
                          >
                            sign in to like
                    </Button>
                        )}</Col>
                    </Row>

                  </Container>




                  <h4 className="my-4">

                    comments of the post
</h4>
                  {comments.map(({ _id, text, postedBy }) => (
                    <ListGroup key={_id}>
                      <CSSTransition timeout={300} classNames="fade">
                        <ListGroupItem>
                          <Row>
                            <Col sm="6">
                              {text}

                            </Col>
                            <Col sm="6">
                              by  {postedBy.name}

                            </Col>
                          </Row>
                        </ListGroupItem>
                      </CSSTransition>
                    </ListGroup>


                  ))}


                  {isAuthenticated ? (
                    <Form onSubmit={this.onSubmit}
                      className="my-3"
                    >

                      <FormGroup>
                        <Label for="comment">comment</Label>
                        <Input type="text"
                          name="comment"
                          placeholder="Add comment"
                          value={this.state.comment}
                          onChange={this.onChange}
                          onClick={this.getId.bind(this, _id)}
                        />
                      </FormGroup>


                      <Button >comment</Button>
                    </Form >

                  ) : null}

                </ListGroupItem>


              </CSSTransition>


            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,

};
Form.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // default: 'form'
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

FormGroup.propTypes = {
  children: PropTypes.node,
  // Applied the row class when true, does nothing when false
  row: PropTypes.bool,
  // Applied the form-check class when true, form-group when false
  check: PropTypes.bool,
  inline: PropTypes.bool,
  // Applied the disabled class when the check and disabled props are true, does nothing when false
  disabled: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.string, // default: 'div'
  className: PropTypes.string,
  cssModule: PropTypes.object,
};


const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, likeItem, unlikeItem, comment }
)(ShoppingList);
