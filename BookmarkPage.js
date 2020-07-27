import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./BookmarkPage.css";
import BookmarkForm from "./BookmarkForm";
import Table from "./Table";
import SimpleStorage from "react-simple-storage";

class BookmarkPage extends Component {
  state = {
    data: [],
    editIdx: -1,
  };

  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  render() {
    return (
      <MuiThemeProvider>
        <SimpleStorage parent={this} />
        <div>
          <div className="form">
            <BookmarkForm
              onSubmit={(submission) =>
                this.setState({
                  data: [...this.state.data, submission],
                })
              }
            />
          </div>

          <br />
          <Table
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            data={this.state.data}
            header={[
              {
                name: "Title",
                prop: "title",
              },
              {
                name: "Timetable Link",
                prop: "link",
              },
              {
                name: "Modules taken",
                prop: "modules",
              },
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default BookmarkPage;
