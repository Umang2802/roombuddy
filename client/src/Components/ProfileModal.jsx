import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  outline: "none",
};

export default function ProfileModal(props) {
  const { item, setOpen, open } = props;

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card sx={style}>
            <CardMedia
              component="img"
              sx={{
                width: 400,
                display: "flex",
                flexDirection: "column",
              }}
              image={item?.image.url}
              alt="Live from space album cover"
            />
            <Box>
              <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                <Typography component="div" variant="h5">
                  {item?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Occupation: {item?.occupation}
                </Typography>
                <Divider />
                <br />
                <Typography component="div" variant="">
                  Age: <b>{item?.age}</b> &nbsp;&nbsp;&nbsp;Gender:{" "}
                  <b>{item?.gender}</b>
                </Typography>
                <Typography component="div" variant="subtitle2">
                  Looking from room in: &nbsp;<b>{item?.lookingForRoomIn}</b>
                </Typography>
                <Typography component="div" variant="subtitle2">
                  Looking to move in from: &nbsp;<b>{item?.lookingToMoveIn}</b>
                </Typography>
                <Typography component="div" variant="subtitle2">
                  Preferred Size: &nbsp;<b>{item?.preferredSize}BHK</b>
                </Typography>
                <Divider />
                <br />
                <Typography component="div" variant="body1">
                  Preferences:
                </Typography>

                {item.preferences.map((value, i) => (
                  <Typography component="span" variant="caption">
                    <b>{value}</b>&nbsp;&nbsp;
                  </Typography>
                ))}
                <br />
                <br />
                <Button
                  sx={{ color: "#6177D4", border: "solid 1px #6177D4" }}
                  variant="outlined"
                  size="small"
                  //   onClick={handleOpen}
                >
                  <ReportIcon fontSize="small" />
                  &nbsp; Report
                </Button>
              </CardContent>
            </Box>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
