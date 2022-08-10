import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const ChatLoading = () => {
  return (
    <Box>
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
      <Skeleton animation="wave" sx={{ p: 1 }} />
    </Box>
  );
};

export default ChatLoading;
