import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

const Ppt = () => {
  const [imagePaths, setImagePaths] = useState([]);

  const onDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();
      acceptedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const response = await fetch("http://localhost:9998/ppt/upload_image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImagePaths = [...imagePaths, data.image_path];
        setImagePaths(newImagePaths);
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container mt-5">
      <div {...getRootProps()} className={`dropzone text-center p-5 border ${isDragActive ? "bg-info" : "bg-light"}`}>
        <input {...getInputProps()} />
        <p className="lead">파일을 드래그해서 놓거나 클릭하여 파일을 선택하세요.</p>
      </div>
      {imagePaths.length > 0 && (
        <div className="mt-3 text-center">
          {imagePaths.map((imagePath, index) => (
            <div key={index} className="mb-3">
              <img
                src={imagePath}
                alt={`Uploaded Image ${index}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ppt;
