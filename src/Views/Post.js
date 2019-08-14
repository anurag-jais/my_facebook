import React, { Component } from "react";
import "./Post.css";

import { Icon } from "antd";
// import Editform from './EditForm';
// import ReactExport from "react-data-export";

class Post extends Component {
  state = {
    isLiked: false,
    showModal: false
  };

  iconLike = () => {
    const like = this.state.isLiked;
    this.setState({
      isLiked: !like
    });
  };

  // updateUser = (state) => {
  //     this.state.showModal = false;
  //     this.props.updateUserArr(state);

  // }
  // backgroundFix = () => {
  //     this.props.stopScollingbackGround();
  // }
  // iconEditHandler = (id) => {
  //     const show = this.state.showModal;
  //     this.setState({
  //         showModal: !show
  //     });
  // }

  // iconDeleteHandler = (id) => {
  //     //alert("I'm running");
  //     this.props.deluser(id);
  // }

  render() {
    return (
      <div>
        <article className="Post">
          {/* <img
            src={
              "https://avatars.dicebear.com/v2/avataaars/" +
              this.props. +
              ".svg?options[mood][]=happy"
            }
          /> */}
          <hr />
          <h4>{this.props.creator}</h4>
          <div className="Title">
            <Icon type="mail" />
            {this.props.Title}
          </div>
          <br />
          <div className="Content">
            <Icon type="phone" />
            {this.props.Content}
          </div>
          <br />
          {/* <div className="Website">
            <Icon type="global" />
            {this.props.website}
          </div> */}

          <hr />
          <div className="Icons">
            <Icon
              onClick={this.iconLike}
              type="heart"
              style={{ color: "red" }}
              theme={this.state.isLiked === true ? "filled" : "outlined"}
            />
            <Icon
              onClick={() => this.iconEditHandler(this.props.id)}
              type="edit"
            />
            <Icon
              onClick={() => {
                this.iconDeleteHandler(this.props.id);
              }}
              type="delete"
            />
          </div>
        </article>
      </div>
    );
  }
}

export default Post;
