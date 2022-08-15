import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { IconButton, InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
        overflow: "auto",
        maxHeight: "50vh",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 300,
        }}
      >
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type address to search"
          inputProps={{ "aria-label": "Type address to search" }}
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Search
            const params = {
              q: searchText,
              format: "json",
              addressdetails: 1,
              polygon_geojson: 0,
            };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
              method: "GET",
              redirect: "follow",
            };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
              .then((response) => response.text())
              .then((result) => {
                console.log(JSON.parse(result));
                setListPlace(JSON.parse(result));
              })
              .catch((err) => console.log("err: ", err));
          }}
        >
          Search
        </Button>
      </Paper>
      <div sx={{ fontSize: "small" }}>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item, index) => {
            return (
              index < 10 && (
                <div key={item?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectPosition(item);
                      setSearchText("");
                      setListPlace([]);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src="./placeholder.png"
                        alt="Placeholder"
                        style={{ width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              )
            );
          })}
        </List>
      </div>
    </div>
  );
}
