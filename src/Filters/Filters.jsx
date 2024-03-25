import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, selectNews } from "../config/store/newsSlice";
import { generateUrlByQuery } from "../config/generateUrl";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Wrapper from "../layout/Wrapper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { BBC_NEWS, GUARDIAN_NEWS, NYTIMES_NEWS } from "../config/constants";

import "./Filters.scss";

const initialFilters = {
  source: "",
  category: "",
  timestamp: null,
};

const Filters = () => {
  const dispatch = useDispatch();
  const { query } = useSelector(selectNews);
  const [filters, setFilters] = useState(initialFilters);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  useEffect(() => {
    if (!query & hasFilters()) {
      setFilters(initialFilters);
    }
  }, [query]);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event?.target?.name || "timestamp"]: event?.target?.value || event,
    });
  };

  const handleFilters = () => {
    if (!hasFilters()) return;
    const res = formatFilters();
    const url = generateUrlByQuery(query, res);
    dispatch(fetchNews(url));
  };

  const handleClearFilters = () => {
    if (!hasFilters()) return;
    setFilters(initialFilters);
  };

  const hasFilters = () => {
    const res = formatFilters();

    const appliedFilters = Object.keys(res).filter((key) => !!res[key]);

    if (appliedFilters.length === 0) return false;
    return true;
  };

  const formatFilters = () => {
    const res = {
      ...filters,
      timestamp: filters.timestamp
        ? dayjs(filters.timestamp)?.format("YYYY-MM-DD")
        : filters.timestamp,
    };
    return res;
  };

  return (
    <Wrapper>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" gutterBottom sx={{ textAlign: "left" }}>
          Filter by:
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          alignItems="center"
        >
          <FormControl
            className="control_select"
            disabled={!!!query}
            size="small"
          >
            <InputLabel id="source">Source</InputLabel>
            <Select
              className="select_input"
              name="source"
              labelId="source"
              id="source"
              label="Source"
              value={filters.source}
              onChange={handleChange}
            >
              <MenuItem value={BBC_NEWS}>BBC News</MenuItem>
              <MenuItem value={NYTIMES_NEWS}>New York Times</MenuItem>
              <MenuItem value={GUARDIAN_NEWS}>The Guardian</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            className="control_select"
            disabled={!!!query}
            size="small"
          >
            <InputLabel id="category">Category</InputLabel>
            <Select
              className="select_input"
              name="category"
              labelId="category"
              id="category"
              label="Category"
              value={filters.category}
              onChange={handleChange}
            >
              <MenuItem value={"world"}>World</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
              <MenuItem value={"technology"}>Technology</MenuItem>
              <MenuItem value={"sports"}>Sports</MenuItem>
              <MenuItem value={"science"}>Science</MenuItem>
              <MenuItem value={"health"}>Health</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            className="control_select"
            disabled={!!!query}
            size="small"
          >
            <DatePicker
              className="select_input date-select_input"
              name="timestamp"
              label="Date"
              value={filters.timestamp}
              referenceDate={dayjs()}
              onChange={handleChange}
              disabled={!!!query}
              disableFuture
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </FormControl>
          <Button
            className="filter_button"
            variant="contained"
            onClick={handleFilters}
            disabled={!!!query}
          >
            Apply
          </Button>
          <Button
            className="filter_button"
            variant="outlined"
            onClick={handleClearFilters}
            disabled={!!!query}
          >
            Clear filters
          </Button>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
export default Filters;
