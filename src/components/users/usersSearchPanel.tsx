import React, {FC} from 'react';
import {
  AdminUser__searchIcon,
  AdminUser__searchInput,
  AdminUser__searchPanel_leftSide,
  AdminUser__searchPanel_rightSide,
  AdminUser__searchPanel_wrapperFlexRow
} from '../../styles/AdminUser.module';
import { ButtonGreen } from '../../styles/Globals.module';

interface SearchPanelProps {
  changeSearch: any,
  listUsersGroupDental: any
}

const UsersSearchPanel: FC<SearchPanelProps> = ({ changeSearch, listUsersGroupDental }) => {

  return (
    <AdminUser__searchPanel_wrapperFlexRow>
      <AdminUser__searchPanel_leftSide>
        <AdminUser__searchIcon className='search-button' src='../../../images/search.svg' alt='search' />
        <AdminUser__searchInput
          type='search'
          id='search'
          name='search'
          onChange={changeSearch}
          placeholder='Search users' />
      </AdminUser__searchPanel_leftSide>
      <AdminUser__searchPanel_rightSide>
        <ButtonGreen onClick={listUsersGroupDental}>Reset all filters</ButtonGreen>
      </AdminUser__searchPanel_rightSide>
    </AdminUser__searchPanel_wrapperFlexRow>
  );
};

export default UsersSearchPanel;

