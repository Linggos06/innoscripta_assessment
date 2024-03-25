import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, selectNews, setQuery } from "../config/store/newsSlice";
import { generateUrl } from "../config/generateUrl";
import categories from "../config/categories";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import "./Menu.scss";

const Menu = () => {
  const dispatch = useDispatch();
  const { sources, query } = useSelector(selectNews);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (!query && activeTab !== "home") {
      setActiveTab("home");
    }
  }, [query]);

  const handleChange = (event, value) => {
    if (query) {
      dispatch(setQuery(""));
    }
    setActiveTab(value);
    const url = generateUrl(value, sources);
    dispatch(fetchNews(url));
  };

  return (
    <Box className="menu_container">
      <Tabs
        value={query ? false : activeTab}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        onChange={handleChange}
      >
        {categories.map(({ label, value }, index) => (
          <Tab key={index} className="menu_tab" label={label} value={value} />
        ))}
      </Tabs>
    </Box>
  );
};

export default Menu;
