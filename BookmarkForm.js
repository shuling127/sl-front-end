import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class BookmarkForm extends React.Component {
  state = {
    title: "",
    titleError: "",
    link: "",
    linkError: "",
    modules: "",
    modulesError: "",
  };

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      titleError: "",
      linkError: "",
      modulesError: "",
    };

    if (this.state.title.length === 0) {
      isError = true;
      errors.titleError = "Please input a valid title";
    }

    if (this.state.link.indexOf("nusmods") === -1) {
      isError = true;
      errors.linkError = "Please input a valid link";
    }

    if (this.state.modules.length === 0) {
      isError = true;
      errors.modulesError = "Please input valid modules";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        title: "",
        titleError: "",
        link: "",
        linkError: "",
        modules: "",
        modulesError: "",
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <TextField
            name="title"
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.title}
            onChange={(e) => this.change(e)}
            errorText={this.state.titleError}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="link"
            hintText="Timetable Link"
            floatingLabelText="Link"
            value={this.state.link}
            onChange={(e) => this.change(e)}
            errorText={this.state.linkError}
            floatingLabelFixed
          />
          <br />

          <TextField
            name="modules"
            hintText="Modules"
            floatingLabelText="Modules Taken"
            value={this.state.modules}
            onChange={(e) => this.change(e)}
            errorText={this.state.modulesError}
            floatingLabelFixed
          />
          <br />
        </form>

        <RaisedButton
          className="submitbutton"
          label="Submit"
          onClick={(e) => this.onSubmit(e)}
          primary
        />
        <br />
      </React.Fragment>
    );
  }
}
