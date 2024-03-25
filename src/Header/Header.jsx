import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import {
  setCurrentSources,
  setQuery,
  selectNews,
  fetchNews,
} from "../config/store/newsSlice";
import { generateUrl } from "../config/generateUrl";
import { generateUrlByQuery } from "../config/generateUrl";

import {
  StyledSearch,
  StyledSearchIconWrapper,
  StyledInputBase,
} from "./styledComponents";
import Wrapper from "../layout/Wrapper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Menu from "../Menu";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { GUARDIAN_NEWS, BBC_NEWS, NYTIMES_NEWS } from "../config/constants";

import "./Header.scss";

const initialPreferencies = {
  [BBC_NEWS]: false,
  [GUARDIAN_NEWS]: false,
  [NYTIMES_NEWS]: false,
};

const Header = () => {
  const dispatch = useDispatch();
  const { currentSource, query } = useSelector(selectNews);

  const [value] = useDebounce(query, 300);

  const [open, setOpen] = useState(false);
  const [preferencies, setPreferencies] = useState(initialPreferencies);

  const hasPreferencies = Object.keys(preferencies).some(
    (item) => preferencies[item]
  );

  useEffect(() => {
    if (value) {
      const url = generateUrlByQuery(value);
      dispatch(fetchNews(url));
    }
    if (value && hasPreferencies) {
      resetPreferencies();
    }
  }, [value]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSearch = (e) => {
    dispatch(setQuery(e.target.value));
  };
  const handleClear = () => {
    dispatch(setQuery(""));
  };

  const handleSourceChange = (event) => {
    setPreferencies({
      ...preferencies,
      [event.target.name]: event.target.checked,
    });
  };
  const handlePreferencies = () => {
    if (!hasPreferencies) return;
    if (query) {
      dispatch(setQuery(""));
    }

    dispatch(setCurrentSources(preferencies));
    const urls = generateUrl("home", preferencies);
    dispatch(fetchNews(urls));

    toggleDrawer(false)();
  };
  const handleClearPreferencies = () => {
    if (!hasPreferencies) return;
    resetPreferencies();

    const urls = generateUrl("home", initialPreferencies);
    dispatch(fetchNews(urls));
    toggleDrawer(false)();
  };
  const resetPreferencies = () => {
    setPreferencies(initialPreferencies);
    dispatch(setCurrentSources(initialPreferencies));
  };
  return (
    <AppBar className="appbar_container">
      <Wrapper>
        <Toolbar disableGutters className="header_container">
          <Typography className="logo" variant="h6" noWrap component="div">
            NEWS
          </Typography>
          <Box className="search_container">
            <StyledSearch>
              <StyledSearchIconWrapper>
                <SearchIcon />
              </StyledSearchIconWrapper>
              <StyledInputBase
                value={query}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
                endAdornment={
                  query ? (
                    <ClearIcon
                      onClick={handleClear}
                      sx={{ cursor: "pointer", color: "#bdc1c6" }}
                    />
                  ) : null
                }
              />
            </StyledSearch>
          </Box>
          <Box>
            <Chip
              label="Personalize"
              variant="outlined"
              clickable
              onClick={toggleDrawer(true)}
              icon={
                <StarBorderPurple500Icon
                  sx={{ fill: "#ffb206", height: "20px" }}
                />
              }
              sx={{ color: "#bdc1c6" }}
            />
            <Drawer
              open={open}
              keepMounted={hasPreferencies}
              onClose={toggleDrawer(false)}
              anchor="right"
              SlideProps={{
                sx: {
                  backgroundColor: "#333333",
                  color: "#bdc1c6",
                  padding: "20px",
                },
              }}
            >
              <Box sx={{ width: 250 }} role="presentation">
                <Divider>Source</Divider>
                <FormGroup sx={{ mt: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={currentSource[BBC_NEWS]}
                        name={BBC_NEWS}
                        onChange={handleSourceChange}
                      />
                    }
                    label="BBC News"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={currentSource.NYTIMES_NEWS}
                        name={NYTIMES_NEWS}
                        onChange={handleSourceChange}
                      />
                    }
                    label="New York Times"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={currentSource[GUARDIAN_NEWS]}
                        name={GUARDIAN_NEWS}
                        onChange={handleSourceChange}
                      />
                    }
                    label="The Guardian"
                  />
                  <Button
                    onClick={handlePreferencies}
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleClearPreferencies}
                    variant="outlined"
                    sx={{ mt: 3 }}
                  >
                    Clear All
                  </Button>
                </FormGroup>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
        <Menu />
      </Wrapper>
    </AppBar>
  );
};

export default Header;
