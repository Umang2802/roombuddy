import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {ReactComponent as LineSvg} from "../Assets/line.svg";
import {ReactComponent as BlockSvg} from "../Assets/block.svg";

const Home = () => {
    return (
        <div>
             <LineSvg style={{position: 'absolute'}}/>
            <BlockSvg style={{position: 'absolute',right:0}}/>
            <Container sx={{ mt: 4, mx: 7, position: 'absolute' }}>
                <Box sx={{ height: "50vh", p: 5 }}>
                    <Typography variant="h1" component="h2">
                        <Box sx={{ fontFamily: "Poppins, sans-serif" }}>ROOMBUDDY</Box>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <Box
                            sx={{
                                fontSize: 20,
                                fontFamily: "Montserrat, sans-serif",
                                m: 0.5,
                                width: 500,
                            }}
                        >
                            Find rooms and roommates at the tip of your fingers!
                        </Box>
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        color="inherit"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ borderRadius: 5, mt: 2 }}
                    >
                        Get Started
                    </Button>
                </Box>
            </Container>
           
        </div>
    );
};

export default Home;
