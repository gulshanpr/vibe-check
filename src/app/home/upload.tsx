'use client';
import React, { useState, useCallback, ChangeEvent, DragEvent, useRef } from 'react';
import { PinataSDK } from "pinata";


interface UploadedFile {
  file: File;
  preview: string;
}

const DragDropUpload: React.FC = () => {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, [handleDrag]);

  const handleDragOut = useCallback((e: DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    setIsDragging(false);
  }, [handleDrag]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFile = useCallback((uploadedFile: File) => {
    const newFile: UploadedFile = {
      file: uploadedFile,
      preview: URL.createObjectURL(uploadedFile),
    };
    setFile((prevFile) => {
      if (prevFile) {
        URL.revokeObjectURL(prevFile.preview);
      }
      return newFile;
    });
  }, []);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = useCallback(() => {
    if (file) {
      URL.revokeObjectURL(file.preview);
      setFile(null);
    }
  }, [file]);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const uploadData = await uploadRequest.json();
      setCid(uploadData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  }

  return (
    <div className="justify-center items-center h-screen w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-gray-400 bg-gray-100' : 'border-gray-300'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileInput}
        />
        <p className="text-gray-700">
          {isDragging ? 'Drop file here' : 'Drag & Drop file here or click to select'}
        </p>
      </div>
      {file && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded">
            {file.file.type.startsWith('image/') ? (
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-gray-600">
                File
              </div>
            )}
            <div className="flex-grow">
              <p className="text-sm truncate">{file.file.name}</p>
              <p className="text-xs text-gray-500">{(file.file.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={removeFile}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
            <button onClick={handleUpload}>upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
