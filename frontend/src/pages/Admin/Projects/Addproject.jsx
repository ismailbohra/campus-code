import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axiosInstance from "../../../utils/axiosInstance";

const TARGET_WIDTH = 450;
const TARGET_HEIGHT = 350;
const ASPECT_RATIO = 9 / 7;

const AddProjectPage = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    image: null,
  });
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [openCropDialog, setOpenCropDialog] = useState(false);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString())
      );
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
      setCrop(undefined);
      setOpenCropDialog(true);
    },
  });

  const handleImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, ASPECT_RATIO, width, height),
        width,
        height
      )
    );
  };

  const handleDoneCropping = () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    if (!canvas || !image || !completedCrop) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      TARGET_WIDTH,
      TARGET_HEIGHT
    );

    canvas.toBlob((blob) => {
      if (blob) {
        setFormData((prev) => ({ ...prev, image: blob }));
        setOpenCropDialog(false);
      }
    }, "image/png");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.image ||
      !formData.name ||
      !formData.description
    ) {
      alert("All fields are required.");
      return;
    }

    const projectData = new FormData();
    projectData.append("image", formData.image); // Use updated image blob
    projectData.append("name", formData.name);
    projectData.append("description", formData.description);

    try {
      await axiosInstance.post("/project", projectData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("../projects");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #1976d2",
                padding: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1" color="textSecondary">
                Drag & drop an image here, or click to select one
              </Typography>
              {imgSrc && (
                <Box sx={{ mt: 2 }}>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      width: 100,
                      height: 100,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Project Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Descripiton"
              fullWidth
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Project
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)}>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECT_RATIO}
            >
              <img
                ref={imgRef}
                alt="Crop preview"
                src={imgSrc}
                onLoad={handleImageLoad}
              />
            </ReactCrop>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDoneCropping} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddProjectPage;
