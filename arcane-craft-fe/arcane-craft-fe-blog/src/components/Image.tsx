import { useState } from 'react';
import { Box, Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

const ImagePage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageId, setImageId] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImageId(response.data);
        }
    };

    return (
        <Box>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload</Button>
            {imageId && <Image src={`/image/${imageId}`} alt="Uploaded Image" />}
        </Box>
    );
};

export default ImagePage;