import React from "react";
import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

export default function FileList({ files }) {
  return (
    <Container>
      {files.map(uploadedFile => {
        return (
          <li key={uploadedFile.id}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{" "}
                  {!!uploadedFile.url && (
                    <button onClick={() => {}}>Excluir</button>
                  )}
                </span>
              </div>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: "#7159c1" }
                  }}
                  strokeWidth={10}
                  percentage={uploadedFile.progress}
                />
              )}

              {uploadedFile.url && (
                <a
                  href="http://localhost:3001/files/b8775b6f0f8146c0643ab579db06dfbf-torta-gelada-cafe-chocolate.jpg"
                  target="_blanck"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginLRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        );
      })}
    </Container>
  );
}

const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
