'use client';

import React, { useState, useCallback, ChangeEvent, DragEvent, useRef } from 'react';

const DragDropUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
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
    if (!uploaded && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [handleDrag, uploaded]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!uploaded && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  const uploadFile = async () => {
    if (!file) return;
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
      console.log(uploadData.IpfsHash);
      setUploading(false);
      setUploaded(true);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <div className="justify-center items-center h-screen w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-gray-400 bg-gray-100' : 'border-gray-300'
          } ${uploaded ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploaded && inputFile.current?.click()}
      >
        <input
          type="file"
          ref={inputFile}
          className="hidden"
          onChange={handleFileInput}
          disabled={uploaded}
        />
        <p className="text-gray-700">
          {uploaded
            ? 'File uploaded'
            : isDragging
              ? 'Drop file here'
              : 'Drag & Drop file here or click to select'}
        </p>
      </div>
      {file && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded">
            {file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-40 h-40 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-gray-600">
                File
              </div>
            )}
            <div className="flex-grow">
              <p className="text-sm truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            {!uploaded && (
              <>
                <button
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
                <button onClick={uploadFile} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </>
            )}
          </div>
          {/* // this part of showing the cid on frontend. (working) */}
          {/* <div>
            {uploaded && (
              <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded">
                <p className="text-sm">IPFS CID:</p>
                <p className="text-sm font-medium text-gray-800">{cid}</p>
              </div>
            )}
          </div> */}
          {/* // this part of code fetch the image from ipfs and display it on frontend. (working)
          {cid && (
            <img
              src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
              alt="Image from IPFS"
            />
          )} */}
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;