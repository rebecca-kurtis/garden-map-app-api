// Filename - App.js

import axios from "axios";

import React, { Component } from "react";

class FileUpload extends Component {

	state = {
		// Initially, no file is selected
		selectedFile: null,
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		// Update the state
		this.setState({
			selectedFile: event.target.files[0],
		});
	};

	// On file upload (click the upload button)
	onFileUpload = () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		const uploadPhotoRoute =
    process.env.REACT_APP_SERVER +
    ":" +
    process.env.REACT_APP_SERVER_PORT +
    `/uploadPhoto/${this.props.plotID}`;

		const formObject = {
			formData: formData,
			plotID: this.props.plotID,
			gardenID: this.props.gardenID
		}

		axios.post(uploadPhotoRoute, formData);
	};

	// File content to be displayed after
	// file upload is complete
	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div>
					<h4>File Details:</h4>
					<p>
						File Name:{" "}
						{this.state.selectedFile.name}
					</p>

					<p>
						File Type:{" "}
						{this.state.selectedFile.type}
					</p>

					<p>
						{/* Last Modified:{" "} */}
						{/* {this.state.selectedFile.lastModifiedDate.toDateString()} */}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>
						Choose before Pressing the Upload
						button
					</h4>
				</div>
			);
		}
	};

	render() {

		const props = this.props;
		console.log("props", props);
		return (
			<div>
				<h3>Upload Photos:</h3>
				<div>
					<input
						type="file"
						onChange={this.onFileChange}
					/>
					<button onClick={this.onFileUpload}>
						Upload!
					</button>
				</div>
				{this.fileData()}
			</div>
		);
	}
}

export default FileUpload;
