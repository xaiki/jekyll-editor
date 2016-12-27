import React from 'react';
import ReactDOM from 'react-dom';
import { readdir } from 'fs';
import File from './file.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return <div style={{
      // width:"100%",
      minHeight:"100%",
      backgroundColor:"#ECEFF1",
      width: "12rem",
      borderRight: "1px solid #CFD8DC"
    }}>

    </div>;
  }
}

export default Sidebar;
