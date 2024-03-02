import React, { useState } from "react";
import axios from 'axios';
import SubmissionDisplay from "./SubmissionDisplay";

const CreateForm = ({ handleSubmission }) => {
  const [imageFiles, setImageFiles] = useState([
    { file: null, description: "" },
    { file: null, description: "" },
    { file: null, description: "" },
  ]);
  const [projectName, setProjectName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [goals, setGoals] = useState("");
  const [whatLearned, setWhatLearned] = useState("");
  const [role, setRole] = useState("");
  const [yourStake, setYourStake] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = { file, description: newImageFiles[index].description };
    setImageFiles(newImageFiles);
  };

  const handleDescriptionChange = (index, e) => {
    const description = e.target.value;
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = { file: newImageFiles[index].file, description };
    setImageFiles(newImageFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      // Append image files to formData
      imageFiles.forEach((imgFile, index) => {
        if (imgFile.file) {
          formData.append(`imageFiles[${index}][file]`, imgFile.file);
          formData.append(`imageFiles[${index}][description]`, imgFile.description);
        }
      });
  
      // Append other form data to formData
      formData.append('projectName', projectName);
      formData.append('numberOfPeople', numberOfPeople);
      formData.append('goals', goals);
      formData.append('whatLearned', whatLearned);
      formData.append('role', role);
      formData.append('yourStake', yourStake);
  
      const response = await axios.post('http://localhost:9998/form/submit_form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
  
      setSubmitted(true);
    } catch (error) {
      console.error('양식 제출 오류:', error);
    }
  };
  
  return (
    <div>
      {submitted ? (
        <SubmissionDisplay
          imageFiles={imageFiles}
          projectName={projectName}
          numberOfPeople={numberOfPeople}
          goals={goals}
          whatLearned={whatLearned}
          role={role}
          yourStake={yourStake}
        />
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            {imageFiles.map((data, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>{`이미지 ${index + 1} (${data.description}): `}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(index, e)}
                  style={{ display: "inline-block" }}
                />
                <label style={{ marginLeft: "10px" }}>설명: </label>
                <input
                  type="text"
                  value={data.description}
                  onChange={(e) => handleDescriptionChange(index, e)}
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
                {data.file && (
                  <div
                    style={{
                      width: "300px",
                      height: "300px",
                      position: "relative",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(data.file)}
                      alt={`이미지 ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        background: "rgba(255,255,255,0.7)",
                        padding: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {data.description}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <label>프로젝트 이름: </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <label>참여 인원 수: </label>
            <input
              type="text"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />
            <br />
            <label>목표: </label>
            <textarea value={goals} onChange={(e) => setGoals(e.target.value)} />
            <br />
            <label>배운 점: </label>
            <textarea
              value={whatLearned}
              onChange={(e) => setWhatLearned(e.target.value)}
            />
            <br />
            <label>역할: </label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
            <br />
            <label>당신의 기여: </label>
            <input
              type="text"
              value={yourStake}
              onChange={(e) => setYourStake(e.target.value)}
            />
            <br />
            <button type="submit">제출</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateForm;
