import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  Check as CheckIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import ProfileListContainer from './ProfileListContainer';

export interface ProfileHeaderProps {
  onAddProfileClick: () => void;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { onAddProfileClick } = props;
  const {
    editable,
    isShowRetireMember,
    setIsShowRetireMember,
    visibleColumns,
    setVisibleColumns,
    searchText,
    setSearchText,
  } = ProfileListContainer.useContainer();
  const [menuAnchor, setMenuAnchor] = useState<Element | null>(null);
  const [selectRowOpen, setSelectRowOpen] = useState(false);

  return (
    <Box style={{display: 'flex'}}>
      <TextField
        label='検索'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        variant='standard'
        fullWidth
      />
      { editable && (
        <IconButton size='large' onClick={onAddProfileClick}>
          <AddCircleIcon color='primary' fontSize='large' />
        </IconButton>
      )}
      <IconButton size='large' onClick={(event) => setMenuAnchor(event.currentTarget)}>
        <MoreVertIcon fontSize='large' />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={menuAnchor !== null}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => setIsShowRetireMember(!isShowRetireMember)}>
          <ListItemIcon>
            {isShowRetireMember &&
              <CheckIcon fontSize='small'/>
            }
          </ListItemIcon>
          退所したメンバーも表示する
        </MenuItem>
        <Divider />
        <ListItemButton onClick={() => setSelectRowOpen(!selectRowOpen)}>
          <ListItemText primary='表示する列の選択' />
          {selectRowOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={selectRowOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {
              [
                {id: 'name', name: '名前'},
                {id: 'furigana', name: 'ふりがな'},
                {id: 'dateOfBirth', name: '生年月日'},
                {id: 'age', name: '年齢'},
                {id: 'bloodType', name: '血液型'},
                {id: 'enter', name: '入所日'},
                {id: 'retire', name: '退所日'},
              ].map((item) => (
                <ListItem sx={{pl: 4}} key={`item-${item.id}`}>
                  <ListItemIcon>
                    <Checkbox
                      onChange={(event) => {
                        const checked = event.target.checked;
                        if (checked) {
                          setVisibleColumns([...visibleColumns, item.id]);
                        } else {
                          setVisibleColumns(visibleColumns.filter(value => value !== item.id));
                        }
                      }}
                      checked={visibleColumns.find(value => value === item.id) !== undefined}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))
            }
          </List>
        </Collapse>
      </Menu>
    </Box>
  );
};

export default ProfileHeader;
