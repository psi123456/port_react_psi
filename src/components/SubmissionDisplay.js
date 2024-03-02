import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";
import axios from 'axios';

const SubmissionDisplay = ({ handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9998/form/get_forms');
        setForms(response.data.forms);
      } catch (error) {
        console.error('양식 불러오기 오류:', error);
      }
    };

    fetchData();
  }, [isEditing]); // isEditing 상태가 변경될 때마다 데이터 다시 불러옴

  const handleEdit = (data) => {
    setEditedData(data);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  const handleDelete = async (id) => {
    try {
      // DB에서 데이터 삭제
      await axios.delete(`http://localhost:9998/form/delete_form/${id}`);
      // 삭제된 데이터를 화면에서 제거
      setForms((prevForms) => prevForms.filter((form) => form.id !== id));
    } catch (error) {
      console.error('DB 삭제 오류:', error);
    }
  };

  const handleUpdateSubmission = async (editedSubmission) => {
    try {
      const response = await axios.put(`http://localhost:9998/form/update_form/${editedSubmission.id}`, editedSubmission);
      console.log("DB update response:", response.data);
      // 업데이트된 데이터로 상태 업데이트
      setForms((prevForms) =>
        prevForms.map((form) => (form.id === editedSubmission.id ? editedSubmission : form))
      );
    } catch (error) {
      console.error('DB 수정 오류:', error);
    }
  };

  return (
    <div className="container mt-4">
      {forms &&
        forms.map((submission) => (
          <div key={submission.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{submission.description}</h5>
              <div className="d-flex justify-content-start mb-2">
              {submission.imageFiles.map((image, index) => (
  <div key={index} className="mr-2" style={{ position: "relative" }}>
    <div className="text-center mb-2">{image.description}</div>
    <img
      src={`http://localhost:9998/form/${image}`}  // 수정된 부분
      alt={`Image ${index + 1}`}
      className="img-thumbnail"
    />
  </div>
))}
              </div>
              <div>
                <p className="card-text">
                  <strong>프로젝트 이름:</strong> {submission.projectName}
                </p>
                <p className="card-text">
                  <strong>인원 수:</strong> {submission.numberOfPeople}
                </p>
                <p className="card-text">
                  <strong>목표:</strong> <pre>{submission.goals}</pre>
                </p>
                <p className="card-text">
                  <strong>배운 점:</strong> <pre>{submission.whatLearned}</pre>
                </p>
                <p className="card-text">
                  <strong>역할:</strong> {submission.role}
                </p>
                <p className="card-text">
                  <strong>당신의 지분:</strong> {submission.yourStake}
                </p>
                <button className="btn btn-primary" onClick={() => handleEdit(submission)}>
                  수정
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(submission.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      {isEditing && (
        <EditForm
          initialData={editedData}
          onSubmit={(editedSubmission) => {
            handleUpdateSubmission(editedSubmission);
            setIsEditing(false);
            setEditedData(null);
          }}
          onCancel={handleCancelEdit}
          handleUpdate={handleUpdateSubmission}  // handleUpdate 전달
        />
      )}
    </div>
  );
};

export default SubmissionDisplay;
