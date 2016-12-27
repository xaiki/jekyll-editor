import React from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'
import Editor from 'react-md-editor'

import Sidebar from './FileExplorer/sidebar.jsx'
import Gallery from './FileExplorer/gallery.jsx'

import fs from 'fs'

class FileManager extends React.Component {
    render(){
        return (
            <div>
                <Gallery {...this.props}/>
            </div>)
    }
}

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
	    code: '# React Markdown Editor\n\n* A list\n\nSome **bold** and _italic_ text\n\n> A quote...\n\nBy [Jed Watson](https://github.com/JedWatson) and [Joss Mackison](https://github.com/jossmac)'
        }
    }
    updateCode (newCode) {
	this.setState({
	    code: newCode
	});
    };
    onSelect (file) {
        let data = fs.readFileSync(file)
        this.setState({
            code: data.toString()
        });
    };
    render() {
        let preview = marked(this.state.code);
        return (
                <div>
                <h1>Editor Test</h1>
                <div className="hint">The editor is below, with default options. This example also uses marked to generate the preview on the right as you type.</div>
	        <div className="editor">
                <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
	        </div>
	        <div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
                <FileManager onSelect={this.onSelect.bind(this)}/>
                </div>
                )
    }
}

ReactDOM.render(
  <Hello image={"dist/img/logo.png"} width={200} />,
  document.getElementById("app")
)
