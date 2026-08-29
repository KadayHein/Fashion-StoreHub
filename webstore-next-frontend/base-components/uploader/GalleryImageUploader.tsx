import { AddPhotoAlternateRounded, CloudUploadRounded, DeleteOutlineRounded, RemoveCircleRounded } from '@mui/icons-material';
import { Box, Button, Chip, Grid, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { GalleryDropzone } from './GalleryDropZone';
import DropableUploadBox from './DropableUploadBox';

export default function GalleryImageUploader(
    { galleryImages, setGalleryImages }:
        { galleryImages: File[], setGalleryImages: React.Dispatch<React.SetStateAction<File[]>> }
) {

    const [previewImage, setPreviewImage] = useState<File | null>(null);
    const [moreSlotFlag, setMoreSlotFlag] = useState<boolean>(false);

    const handleGalleryImage = (
        index: number | null,
        file: File | null
    ) => {
        setGalleryImages(prev => {
            const updated = [...prev];
            if (index == null) {
                const emptyIndex = updated.findIndex(file => file == null)
                updated[emptyIndex] = file;
            } else updated[index] = file;
            setPreviewImage(file);
            return updated;
        });
    };

    const handleGalleryMultiImage = (files: File[]) => {
        setGalleryImages(prev => {
            const updated = [...prev];
            for (const file of files) {
                const emptyIndex = updated.findIndex(image => image === null);
                if (emptyIndex === -1) {
                    enqueueSnackbar(`Gallery is full. Maximum ${moreSlotFlag ? "8" : "4"} images is allowed!`, { variant: "error" })
                    break;
                }
                updated[emptyIndex] = file;
            }

            const firstAddedFile = files.find((_, fileIndex) => {
                return updated.indexOf(files[fileIndex]) !== -1;
            });

            if (firstAddedFile) {
                setPreviewImage(firstAddedFile);
            }

            return updated;
        });
    };

    const removeGalleryImage = (
        index: number
    ) => {
        setGalleryImages(prev => {
            const updated = [...prev];
            updated[index] = null;
            return updated;
        });
        setPreviewImage(null);
    };

    const TriggerAdditionalSlots = () => {
        moreSlotFlag ?
            setGalleryImages(prev => prev.slice(0, 4))
            :
            setGalleryImages(prev => [
                ...prev,
                null, null, null, null
            ])
        setMoreSlotFlag(!moreSlotFlag);
    }

    const onChangePreviewImage = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        if (files.length === 1) {
            handleGalleryImage(null, files[0]);
        } else {
            handleGalleryMultiImage(Array.from(files));
        }

        // Allow selecting the same file again
        event.target.value = "";
    }

    const onDropCallback = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.length == 1 && handleGalleryImage(null, acceptedFiles[0]);
        acceptedFiles.length > 1 && handleGalleryMultiImage(acceptedFiles)
    }, []);



    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 1 }}
            >
                Product Images
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                Upload a main product image and up to {moreSlotFlag ? 8 : 4} additional gallery images.
            </Typography>

            <DropableUploadBox onChange={onChangePreviewImage} onDrop={onDropCallback} previewImage={previewImage} />

            <Grid container spacing={1.5} mt={2}>
                {galleryImages.map(
                    (
                        image,
                        index
                    ) => (
                        <GalleryDropzone key={index} index={index} image={image}
                            handleGalleryImage={handleGalleryImage}
                            handleGalleryMultiImage={handleGalleryMultiImage}
                            setPreviewImage={setPreviewImage}
                            removeGalleryImage={removeGalleryImage} />
                    )
                )}
            </Grid>

            <Button
                onClick={TriggerAdditionalSlots}
                variant="outlined"
                fullWidth
                startIcon={
                    moreSlotFlag ? <RemoveCircleRounded /> : <CloudUploadRounded />
                }
                sx={{
                    mt: 2,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform:
                        "none",
                }}
            >
                {moreSlotFlag ? "No More" : "Upload"} Additional Images
            </Button>



        </Box>
    )
}
