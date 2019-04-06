import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, likeItem, unlikeItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import EditModal from "./EditModal";
class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  like = (likeIds) => {

    this.props.likeItem(likeIds._id, likeIds.user._id);
    // console.log(likeIds._id)

  };
  unLike = (unLikeIds) => {
    this.props.unlikeItem(unLikeIds._id, unLikeIds.user._id);


  }
  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;
    // const { userId } = this.props.auth;
    // const userIdd = this.props.auth.user.userId;
    console.log(items)
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, likes }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <EditModal id={_id} />

                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  <Button
                    className="remove-btn ml-3"
                    color="danger"
                    size="sm"
                  >
                    {likes.length}
                  </Button>
                  {isAuthenticated ? likes.filter(like => like === user._id).toString() !== user._id
                    ? (
                      <Button
                        className="like-btn ml-3"
                        color="primary"
                        size="sm"
                        onClick={this.like.bind(this, { _id, user })}
                      >
                        like
                      </Button>
                    ) :
                    (
                      <Button
                        className="like-btn ml-3"
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
                    )}

                  {name}
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
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, likeItem, unlikeItem }
)(ShoppingList);
