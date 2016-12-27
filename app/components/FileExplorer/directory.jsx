import React from 'react';
import ReactDOM from 'react-dom';
import { stat } from 'fs';
import { resolve } from 'path';

import { clipboard, remote } from 'electron';
const { Menu, MenuItem } = remote;

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.fullPath = resolve(this.props.path, this.props.filename);
    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  handleClick() {
    this.props.onChange(this.fullPath);
  }

  handleContextMenu(e) {
    e.preventDefault();

    const menu = new Menu();

    [
      {
        label: 'Copy path',
        click: () => clipboard.writeText(this.fullPath)
      }
    ]
      .map((item) => new MenuItem(item))
      .forEach(menu.append)

    menu.popup(remote.getCurrentWindow())
  }

  render() {
      const url = resolve(__dirname, '../icons/folder.svg');
      let filename = this.props.filename;
      if (filename === '.') filename = '[Back]';
    return <div style={{
      fontFamily: 'sans-serif',
      textAlign: 'center',
      margin: '1rem',
      opacity: filename[0] === '.' ? '0.7' : '1.0',
      cursor: 'pointer',
    }} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
      <div style={{
        width: '6rem',
        height: '6rem',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        margin: 'auto',
      }}></div>
      <div style={{
        maxWidth: '6rem',
        margin: 'auto',
        wordBreak: 'break-all',
        maxHeight: '3.5em',
        overflowY: 'hidden',
      }} title={filename}>
        {filename}
      </div>
    </div>
  }
}

export default Directory;
