// components/EditForm.js

import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditForm = ({ initialData, onSubmit, onCancel, handleUpdate }) => {
  const [editedData, setEditedData] = useState(initialData);

  useEffect(() => {
    setEditedData(initialData);
  }, [initialData]);

  const handleImageChange = (index, file, description) => {
    const newImageFiles = [...editedData.imageFiles];
    newImageFiles[index] = { file, description };
    setEditedData((prevData) => ({
      ...prevData,
      imageFiles: newImageFiles,
    }));
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    handleImageChange(index, file, editedData.imageFiles[index]?.description || "");
  };

  const handleDescriptionChange = (index, e) => {
    const description = e.target.value;
    handleImageChange(index, editedData.imageFiles[index]?.file, description);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // handleUpdate 호출 전에 DB에 수정을 적용하도록 수정
      const formData = new FormData();

      // 텍스트 필드를 formData에 추가
      formData.append('projectName', editedData.projectName);
      formData.append('numberOfPeople', editedData.numberOfPeople);
      formData.append('goals', editedData.goals);
      formData.append('whatLearned', editedData.whatLearned);
      formData.append('role', editedData.role);
      formData.append('yourStake', editedData.yourStake);

      // 이미지 파일을 formData에 추가
      editedData.imageFiles.forEach((imgFile, index) => {
        if (imgFile.file instanceof File) {
          formData.append(`imageFiles[${index}][file]`, imgFile.file);
          formData.append(`imageFiles[${index}][description]`, imgFile.description);
        }
      });

      const response = await axios.put(`http://localhost:9998/form/update_form/${initialData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("DB update response:", response.data);

      // handleUpdate 호출
      handleUpdate(editedData);

      // onSubmit 호출
      onSubmit(editedData);
    } catch (error) {
      console.error('DB 수정 오류:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {editedData.imageFiles.map((data, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body" style={{ position: "relative" }}>
                <label className="d-block">{`이미지 ${index + 1} (${data.description}): `}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(index, e)}
                  className="form-control-file"
                />
                <br />
                <label className="d-block">설명: </label>
                <input
                  type="text"
                  value={data.description}
                  onChange={(e) => handleDescriptionChange(index, e)}
                  className="form-control"
                />
                {data.file && (
                  <div style={{ position: "relative" }}>
                    {data.file instanceof File ? (
                      <img
                        src={URL.createObjectURL(data.file)}
                        alt={`Image ${index + 1}`}
                        className="img-thumbnail mt-3"
                      />
                    ) : (
                      <img
                        src={data.file}
                        alt={`Image ${index + 1}`}
                        className="img-thumbnail mt-3"
                      />
                    )}
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
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>프로젝트 이름: </label>
            <input
              type="text"
              value={editedData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              className="form-control"
            />
        <label>인원 수: </label>
        <input
          type="text"
          value={editedData.numberOfPeople}
          onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
          className="form-control"
        />
        <br />
        <label>목표: </label>
        <textarea
          value={editedData.goals}
          onChange={(e) => handleInputChange("goals", e.target.value)}
          className="form-control"
        />
        <br />
        <label>배운 점: </label>
        <textarea
          value={editedData.whatLearned}
          onChange={(e) => handleInputChange("whatLearned", e.target.value)}
          className="form-control"
        />
        <br />
        <label>역할: </label>
        <input
          type="text"
          value={editedData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
          className="form-control"
        />
        <br />
        <label>당신의 지분: </label>
        <input
          type="text"
          value={editedData.yourStake}
          onChange={(e) => handleInputChange("yourStake", e.target.value)}
          className="form-control"
        />
        <br />
        <button type="submit" className="btn btn-success ml-2">
          제출
        </button>
        <button type="button" onClick={handleCancel} className="btn btn-secondary ml-2">
          취소
        </button>
      </form>
    </div>
  );
};

export default EditForm;
