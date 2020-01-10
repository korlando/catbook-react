import React, { Component } from "react";
import ChatList from "../modules/ChatList.js";
import Modal from "../modules/Modal.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

class Chatbook extends Component {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  /**
   * @typedef MessageObject
   * @property {UserObject} sender
   * @property {string} content
   */
  /**
   * @typedef ChatData
   * @property {MessageObject[]} messages
   * @property {UserObject} recipient
   */

  constructor(props) {
    super(props);
    this.state = {
      activeUsers: [],
      activeChat: {
        recipient: ALL_CHAT,
        messages: [],
      },
      showModal: false,
    };
  }

  loadMessageHistory(recipient) {
    get("/api/messages", { recipient_id: recipient._id }).then((messages) => {
      this.setState({
        activeChat: {
          recipient: recipient,
          messages: messages,
        },
      });
    });
  }

  componentDidMount() {
    document.title = "Chatbook";

    this.loadMessageHistory(ALL_CHAT);

    get("/api/activeUsers").then((data) => {
      this.setState({
        activeUsers: [ALL_CHAT].concat(data.activeUsers),
      });
    });

    socket.on("chat", (data) => {
      if (
        data.recipient._id === this.state.activeChat.recipient._id ||
        data.sender._id === this.state.activeChat.recipient._id
      ) {
        this.setState((prevstate) => ({
          activeChat: {
            recipient: prevstate.activeChat.recipient,
            messages: prevstate.activeChat.messages.concat(data),
          },
        }));
      }
    });
    socket.on("activeUsers", (data) => {
      this.setState({
        activeUsers: [ALL_CHAT].concat(data.activeUsers),
      });
    });
  }

  setActiveUser = (user) => {
    this.loadMessageHistory(user);
    this.setState({
      activeChat: {
        recipient: user,
        messages: [],
      },
    });
  };

  render() {
    if (!this.props.userId) return <div>Log in before using Chatbook</div>;

    return (
      <>
        <Modal show={this.state.showModal} />
        <div className="u-flex u-relative Chatbook-container">
          <div className="Chatbook-userList">
            <ChatList
              setActiveUser={this.setActiveUser}
              userId={this.props.userId}
              users={this.state.activeUsers}
              active={this.state.activeChat.recipient}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Chatbook;
