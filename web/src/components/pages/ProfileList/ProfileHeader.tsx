import React, { useState } from 'react';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  Check as CheckIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import ProfileListContainer from './ProfileListContainer';

export interface ProfileHeaderProps {
  onAddProfileClick: () => void;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { onAddProfileClick } = props;
  const { editable, isShowRetireMember, setIsShowRetireMember } = ProfileListContainer.useContainer();
  const [menuAnchor, setMenuAnchor] = useState<Element | null>(null);

  return (
    <Box style={{display: 'flex'}}>
      <TextField
        label='検索'
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
      </Menu>
    </Box>
  );
};

export default ProfileHeader;
