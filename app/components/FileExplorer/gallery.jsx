import React from 'react';
import ReactDOM from 'react-dom';
import { readdir } from 'fs';
import File from './file.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      workingDirectory: this.props.workingDirectory || process.env.HOME + '/src',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextDirectory) {
    readdir(nextDirectory, (err, files) => {
      this.setState({
          files: ['.'].concat(files),
          workingDirectory: nextDirectory,
      });
    });
  }

    componentDidMount() {
        this.handleChange(this.state.workingDirectory);
    }

  render() {
    return <div style={{
      width: "calc(100% - 20rem)",
      minHeight: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "flex-start",
      alignContent: "flex-start",
      margin: "0 auto",
    }}>
      {
        this
        .state
        .files
          .map((file) => <File filename={file}
                               path={this.state.workingDirectory} key={file}
                               onChange={this.handleChange}
                               onSelect={this.props.onSelect}>
          </File>)
      }
    </div>;
  }
}

export default Gallery;
