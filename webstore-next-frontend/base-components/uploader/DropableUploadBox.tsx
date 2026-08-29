import { AddPhotoAlternateRounded, CloudUploadRounded } from '@mui/icons-material';
import { Box, Button, Chip, Typography } from '@mui/material';
import React from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone';

export default function DropableUploadBox({
    previewImage, onChange , onDrop
}: {
    previewImage: File;
    onChange: (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
    onDrop: (acceptedFiles: File[]) => void
}) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop,
        multiple: true
    });
    return (
        <Box
            {...getRootProps()} //getRootProps for Area affected by dropzone functionsF
            sx={{
                position: "relative",
                width: "100%",
                height: {
                    xs: 300,
                    sm: 380,
                    md: 400,
                },
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "grey.100",
                border: "2px dashed",
                borderColor:
                    previewImage
                        ? "success.main"
                        : "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >

            {previewImage ? (
                <Box
                    component="img"
                    src={URL.createObjectURL(
                        previewImage
                    )}
                    alt="Main product"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            ) : (
                <Box
                    sx={{
                        textAlign: "center",
                        px: 2
                    }}
                >
                    <AddPhotoAlternateRounded
                        sx={{
                            fontSize: 60,
                            color: "primary.main",
                            mb: 1
                        }}
                    />
                    {
                        isDragActive
                            ? (<Typography variant='h6' fontWeight={600}>Drop the Image Here ...</Typography>)
                            : (<Typography variant='h6' fontWeight={600}>Drag & Drop to upload an image</Typography>)
                    }
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Recommended:
                        1000 × 1000px
                    </Typography>

                    <input
                        accept="image/*"
                        id="gallery-preview-image"
                        type="file"
                        multiple
                        hidden
                        onChange={(event) => onChange(event)}
                    />

                    <Button
                        component="label"
                        htmlFor="gallery-preview-image"
                        variant="contained"
                        startIcon={<CloudUploadRounded />}
                        sx={{
                            position: "absolute",
                            bottom: 50,
                            left: "50%",
                            transform: "translateX(-50%)"
                        }}
                    >
                        Upload Image
                    </Button>
                </Box>
            )}

            {/* <input
                //{...getInputProps()} //getInputProps to trigger onClick image-selection 
                // disabled={previewImage !== null}
                accept="image/*"
                id="main-product-image"
                type="file"
                hidden
                onChange={(
                    event
                ) => {
                    const file = event.target.files?.[0];
                    if (file) {
                        handleGalleryImage(0, file);
                    }
                }}
            /> */}


            {previewImage && (
                <Chip label="PREVIEW" sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "error.main",
                    color: "error.contrastText",
                    boxShadow: 2
                }}
                />
            )}

        </Box>
    )
}
