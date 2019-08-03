import React from "react";
import Dropzone from "react-dropzone";
import styled, { css } from "styled-components";

export default function Upload({ onUpload }) {
  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado.</UploadMessage>;
    }

    return (
      <UploadMessage type="success">Solte os arquivos aqui.</UploadMessage>
    );
  }

  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5"
};

const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const UploadMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => messageColors[props.type || "default"]};
  padding: 15px 0;
`;
