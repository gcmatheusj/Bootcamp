import React, { useState } from "react";
import styled from "styled-components";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "./services/api";

import GlobalStyle from "./styles/global";

import Upload from "./components/Upload/Upload";
import FileList from "./components/FileList/FileList";

export default function App() {
  let [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = files => {
    const fileList = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFiles((uploadedFiles = uploadedFiles.concat(fileList)));

    uploadedFiles.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      (uploadedFiles = uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }))
    );
  };

  const processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api.post("posts", data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        updateFile(uploadedFile.id, {
          progress
        });
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
