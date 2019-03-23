import React, { Component } from 'react';
import HomeNav from './HomeNav/HomeNav';
import axios from 'axios';

class Buy extends Component {

    state = {
        selectedFile: null,
        imageIsAvailable: false
    }

    fileSelectHandler = (event) => {
        const len = event.target.files.length;
        const files = [];
        for (var i = 0; i < len; i++) {
            files.push(event.target.files[i]);
        }

        // @debug 
        console.log(files);

        this.setState({
            selectedFile: files,
            imageIsAvailable: true
        });

        // @debug
        console.log('File(s) selected');
    }

    uploadFile = () => {
        // Have to check for contentType before uploading image
        const fd = new FormData();
        const files = this.state.selectedFile;
        const len = files.length;
        for (var i = 0; i < len; i++) {
            fd.append('files', files[i], files[i].name);
        }
        axios.post('/upload', fd)
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <HomeNav />
                <h1>
                    Coming Soon!
                </h1>
                <input type="file" name="files" id="files" multiple accept="image/*" onChange={this.fileSelectHandler}/>
                <button onClick={this.uploadFile}>Upload</button>
                <img src="http://localhost:8000/image/cea576b12436e85437e17c2316f1fc4b.jpeg" />
            </div>
        )
    }
}

export default Buy;