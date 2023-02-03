import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import "./css/DepartmentSearchResult.css"
export default function AlignItemsList(props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                props.searchData && props.searchData.map((department, idx) => {
                    return (
                        <div className = "search-result-box" >
                            <ListItem alignItems="flex-start" key={idx} onClick = {
                                () => {
                                    props.setSearch(false);
                                    props.setDepartmentSeq(department.departmentSeq);
                                    props.setWorkplaceSeq(department.workplaceSeq);
                                    props.setCompanySeq(department.setCompanySeq);
                                    props.setDetailFlag(true);
                                }} 
                                >
                                <ListItemText
                                    primary={`${department.departmentCode}. ${department.departmentName}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {department.companyName} {department.workplaceName}
                                            </Typography>
                                        </React.Fragment>

                                    }
                                    
                                />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </div>
                    )
                })
            }
        </List>
    );
}
