import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
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
import { toast } from "react-toastify";

const TARGET_WIDTH = 450;
const TARGET_HEIGHT = 350;
const ASPECT_RATIO = 9 / 7;

const AddClientPage = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    designation: "",
  });
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

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
      !formData.description ||
      !formData.designation
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    const clientData = new FormData();
    clientData.append("image", formData.image);
    clientData.append("name", formData.name);
    clientData.append("description", formData.description);
    clientData.append("designation", formData.designation);

    try {
      await axiosInstance.post("/client", clientData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Client added successfully");
      navigate("../clients");
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Client
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

          <Grid item xs={12}>
            <TextField
              label="Client's Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Client's Description"
              fullWidth
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Client's Designation"
              fullWidth
              name="designation"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
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
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Client"}
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

export default AddClientPage;
