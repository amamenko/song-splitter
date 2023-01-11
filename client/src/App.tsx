import React, { useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";

const App = () => {
  const [selectedFile, changeSelectedFile] = useState<File | null>(null);

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files)
      changeSelectedFile(event.currentTarget.files[0]);
  };

  const onFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append(
        "myFile",
        new Blob([new Uint8Array(await selectedFile.arrayBuffer())], {
          type: selectedFile.type,
        }),
        selectedFile.name
      );
      axios
        .post("/upload_file", formData)
        .then((res) => console.log(res))
        .catch((e) => console.error(e));
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Song Splitter.</h1>
        <Form>
          <FormGroup>
            <Label className="upload_label" for="exampleFile">
              File
            </Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              accept=".mp3"
              onChange={onFileChange}
            />
            <FormText>Upload or drop an mp3 file to split here</FormText>
          </FormGroup>
          <div className="bottom_audio_interactive">
            {selectedFile && (
              <>
                <p>Original Audio:</p>
                <ReactAudioPlayer
                  src={URL.createObjectURL(selectedFile)}
                  controls
                />
              </>
            )}
            <Button
              className="start_button"
              color="primary"
              onClick={onFileUpload}
              disabled={!selectedFile}
            >
              Start
            </Button>
          </div>
        </Form>
      </header>
    </div>
  );
};

export default App;
