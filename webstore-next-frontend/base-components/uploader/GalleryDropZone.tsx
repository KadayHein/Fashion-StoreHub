import { AddPhotoAlternateRounded, DeleteOutlineRounded } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

export const GalleryDropzone = ({
    index,
    image,
    handleGalleryImage,
    handleGalleryMultiImage,
    setPreviewImage,
    removeGalleryImage
}: {
    index: number;
    image: File | null;
    handleGalleryImage: (index: number, file: File | null) => void;
    handleGalleryMultiImage: (files: File[]) => void;
    setPreviewImage: (file: File | null) => void;
    removeGalleryImage: (index: number) => void;
}) => {

    const onDrop = useCallback(

        (acceptedFiles: File[]) => {

            if (acceptedFiles.length === 0) return;

            if (acceptedFiles.length === 1) {
                // Single file → put it in the slot where dropped
                handleGalleryImage(index, acceptedFiles[0]);
            } else {
                // Multiple files → fill null slots
                handleGalleryMultiImage(acceptedFiles);
            }
        },
        [
            index,
            handleGalleryImage,
            handleGalleryMultiImage
        ]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        accept: {
            "image/*": []
        },
        multiple: true,
        onDrop
    });
    return (
        <Grid key={index}
            size={{ xs: 3 }}
        >
            <Box
                {...getRootProps()} //getRootProps for Area affected by dropzone functions
                sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "2px dashed",
                    borderColor:
                        image
                            ? "success.main"
                            : "divider",
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                {image ? (
                    <Box
                        onClick={() => setPreviewImage(image)}
                        component="img"
                        src={URL.createObjectURL(image)}
                        alt={`Gallery ${index + 1}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />

                ) : (
                    <AddPhotoAlternateRounded
                        sx={{
                            color: "text.disabled",
                            fontSize: 30
                        }}
                    />
                )}

                <input
                    accept="image/*"
                    id={`gallery-image-${index}`}
                    type="file"
                    hidden
                    onChange={(
                        event
                    ) => {
                        const files = event.target.files;
                        if (!files || files.length === 0) return;
                        files.length === 1 ?
                            handleGalleryImage(index, files[0])
                            :
                            handleGalleryMultiImage(Array.from(files))
                    }}
                />
                <label htmlFor={`gallery-image-${index}`}>
                    <IconButton
                        component="span"
                        size="small"
                        sx={{
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            "&:hover":
                            {
                                bgcolor:
                                    "background.paper",
                            }
                        }}
                    >
                        <AddPhotoAlternateRounded fontSize="small" />
                    </IconButton>
                </label>

                {image && (

                    <IconButton
                        size="small"
                        onClick={e => removeGalleryImage(index)}
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            bgcolor: "background.paper",
                            "&:hover":
                            {
                                bgcolor:
                                    "background.paper"
                            }
                        }}
                    >
                        <DeleteOutlineRounded fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Grid>
    )
}
