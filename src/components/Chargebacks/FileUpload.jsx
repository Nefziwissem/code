import React, { useState,Link } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate

const FileUpload = () => {
    const { chargebackId } = useParams();
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // use navigate to redirect after upload

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file for Chargeback ID:", chargebackId);

        axios.post(`http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/upload-file/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("File uploaded successfully", response.data);
            navigate(`/chargebacks/${chargebackId}`); // Navigate to the details page
        })
        .catch(error => {
            console.error("Failed to upload file:", error.response.data);
        });
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>

            <Link to="/chargebacks/${chargebackId}">Upload</Link>

        </div>
    );
};

export default FileUpload;
