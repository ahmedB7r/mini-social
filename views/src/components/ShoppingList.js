import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, likeItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import EditModal from "./EditModal";
class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  like = (postId, actions) => {
    console.log(actions);
  };
  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
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

                  {isAuthenticated ? (
                    <Button
                      className="like-btn"
                      color="primary"
                      size="sm"
                      // onClick={this.like.bind(this, _id)}
                    >
                      like
                    </Button>
                  ) : (
                    <Button
                      className="like-btn"
                      color="primary"
                      size="sm"
                      disabled
                    >
                      like
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
  { getItems, deleteItem, likeItem }
)(ShoppingList);
