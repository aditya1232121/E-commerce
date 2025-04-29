import React, { useState } from 'react';
import './sidebar.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p>
            <ImportExportIcon /> Products
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem button component={Link} to="/admin/product">
              <PostAddIcon />
              <ListItemText primary="All Products" />
            </ListItem>
            <ListItem button component={Link} to="/admin/products">
              <AddIcon />
              <ListItemText primary="Create Product" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Link to = "/admin/orders">
      <p> 
        <ListAltIcon/>
        Orders
      </p>
      </Link>
      <Link to = "/admin/users">
      <p> 
        <PeopleIcon/>
        Users
      </p>
      </Link>
      <Link to = "/admin/reviews">
      <p> 
        <RateReviewIcon/>
        Reviews
      </p>
      </Link> *
    </div>
  );
}
