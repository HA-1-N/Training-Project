import React, { useEffect, useRef, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { USER_FILTER_ROLE } from '../../data/user_filter_role';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CheckBox } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setInfoUser } from '../../redux/InfoReducer';
import { USER_LIST_DATA } from '../../data/user_list_data';
import { fetchThunk } from '../../../common/redux/thunk';

const FilterMembership = [
  {
    value: 'M_4',
    name: 'General',
  },
];

const FilterMembershipPending = [
  {
    value: 'P_4',
    name: 'General',
  },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Form = styled.form``;

const InputSearch = styled.input`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.425rem 1rem;
  color: #fff;
  background-color: #252547;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #13132b;
  outline: none;

  &:hover {
    background-color: #1b1b38;
    border: 1px solid #13132b;
  }

  &:focus {
    background-color: #323259;
    border: 1px solid #a16eff;
  }
`;

const Input = styled.input`
  height: 15px;
  width: 15px;
  margin-right: 15px;
`;

const UserFilterContainer = styled.div`
  background: #323259;
  padding: 2rem;
`;

const ButtonSearch = styled.button`
  color: #fff;
  background-color: #b18aff;
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.6rem;

  &:hover {
    color: #1b1b38;
    cursor: pointer;
  }
`;

const DropDown = styled.div`
  position: relative;
  width: 100%;
`;

const DropDownBtn = styled.button`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #252547;
  border: 1px solid #13132b;
  border-radius: 0.25rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  height: 40px;
  text-align: left;

  &:hover {
    background-color: #1b1b38;
    border: 1px solid #13132b;
  }

  &:focus {
    background-color: #323259;
    border: 1px solid #a16eff;
  }
`;

const DropDownContent = styled.div`
  width: 100%;
  height: 300px;
  background: #323259;
  position: absolute;
  top: 50px;
  z-index: 10;
  border: 1px solid #13132b;
  overflow: auto;
`;

const DropDownItem = styled.div`
  width: 100%;
  background: #323259;
  padding: 0.4rem 1rem;
  fontsize: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  text-align: left;
  border: none;
  // border-bottom: 1px solid #13132b;

  &:hover {
    background-color: rgba(180, 180, 219, 0.16);
    color: #fff;
  }
`;

const UserFilter = ({ handleFormFilter, handleFilterListChange, valueFilterList }: any) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const userData: any = useSelector((storeUser: any) => storeUser?.infoUser?.infoUser);

  const filterRoleData = USER_FILTER_ROLE?.data;
  const filterRoleMembership = filterRoleData?.administrator;
  const filterRoleMembershipPending = filterRoleData?.customer;

  const [memberships, setMemberships] = React.useState<string[]>([]);
  const [userType, setUserType] = React.useState<string[]>([]);

  const [status, setStatus] = React.useState('');
  const [isActiveUserType, setIsActiveUserType] = useState(false);
  const [isActiveMembership, setIsActiveMembership] = useState(false);

  const handleActiveUserType = () => {
    setIsActiveUserType(!isActiveUserType);
  };

  const handleActiveMembership = () => {
    setIsActiveMembership(!isActiveMembership);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleSearchFilter = () => {
    handleFormFilter();
  };

  const onChangeForm = (fieldName?: string, fieldValue?: string) => (e?: any) => {
    handleFilterListChange(fieldName, fieldValue || e?.target?.value || '', e);
  };

  // const handleSubmitSearch = () => {
  //     if (searchTerms || userType.length) {
  //         const newUserDatas = userDataList?.filter((user: any) => {
  //             const matchName = !searchTerms ? true : user?.vendor?.toLowerCase().indexOf(searchTerms.toLowerCase()) !== -1;
  //             const matchAccessLvl = !userType.length ? true : userType.includes(user?.access_level);
  //             return matchName && matchAccessLvl;
  //         });
  //         dispatch(setInfoUser(newUserDatas));
  //     } else {
  //         dispatch(setInfoUser(userDataList));
  //     }
  // };

  useEffect(() => {
    dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post'));
    dispatch(setInfoUser(userData));
  }, [dispatch]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <UserFilterContainer>
          <div className="wide">
            <div className="row">
              <div className="col l-6">
                <div className="row">
                  <div className="col l-6">
                    <div style={{ width: '100%' }}>
                      <InputSearch
                        type="text"
                        name="search"
                        placeholder="Search keywords"
                        value={valueFilterList.search}
                        onChange={onChangeForm('search')}
                      />
                    </div>
                  </div>

                  <div className="col l-6">
                    <DropDown>
                      <DropDownBtn onClick={handleActiveMembership}>
                        {memberships.length === 0 ? 'All memberships' : memberships}
                        <span style={{ float: 'right' }}>{!isActiveMembership ? <FaAngleDown /> : <FaAngleUp />}</span>
                      </DropDownBtn>

                      {isActiveMembership && (
                        <DropDownContent
                          style={{
                            height: '160px',
                          }}
                        >
                          <span
                            style={{
                              width: '100%',
                              border: 'none',
                              color: '#b4b4db',
                              padding: '0.5rem 1rem',
                              display: 'block',
                              fontSize: '1rem',
                              fontWeight: '600',
                            }}
                          >
                            Membership
                          </span>
                          {FilterMembership?.map((membershipItem: any, index: number) => (
                            <DropDownItem key={index}>
                              <Input
                                type="checkbox"
                                checked={memberships?.includes(membershipItem.name)}
                                onClick={(e) => {
                                  if (memberships?.includes(membershipItem.name)) {
                                    setMemberships(
                                      memberships?.filter((membership) => membership !== membershipItem.name),
                                    );
                                  } else {
                                    const newMembership: any = [...memberships, membershipItem.name];
                                    setMemberships(newMembership);
                                  }
                                  onChangeForm('memberships', membershipItem.value)(e);
                                }}
                              />
                              {membershipItem.name}
                            </DropDownItem>
                          ))}
                          <span
                            style={{
                              width: '100%',
                              border: 'none',
                              color: '#b4b4db',
                              padding: '0.5rem 1rem',
                              display: 'block',
                              fontSize: '1rem',
                              fontWeight: '600',
                            }}
                          >
                            Pending Membership
                          </span>
                          {FilterMembershipPending?.map((membershipItem: any, index: number) => (
                            <DropDownItem key={index}>
                              <Input
                                type="checkbox"
                                checked={memberships?.includes(membershipItem.name)}
                                onClick={(e) => {
                                  if (memberships?.includes(membershipItem.name)) {
                                    setMemberships(
                                      memberships?.filter((membership) => membership !== membershipItem.name),
                                    );
                                  } else {
                                    const newMembership: any = [...memberships, membershipItem.name];
                                    setMemberships(newMembership);
                                  }
                                  onChangeForm('memberships', membershipItem.value)(e);
                                }}
                              />
                              {membershipItem.name}
                            </DropDownItem>
                          ))}
                        </DropDownContent>
                      )}
                    </DropDown>
                  </div>
                </div>
              </div>

              {/*  */}
              <div className="col l-6">
                <div className="row">
                  <div className="col l-6">
                    <DropDown style={{ height: 'auto' }}>
                      <DropDownBtn style={{ height: 'auto' }} onClick={handleActiveUserType}>
                        {userType.length === 0 ? 'All User Type' : userType.toString()}
                        <span style={{ float: 'right' }}>{!isActiveUserType ? <FaAngleDown /> : <FaAngleUp />}</span>
                      </DropDownBtn>

                      {isActiveUserType && (
                        <DropDownContent>
                          <span
                            style={{
                              width: '100%',
                              border: 'none',
                              color: '#b4b4db',
                              padding: '0.5rem 1rem',
                              display: 'block',
                              fontSize: '1rem',
                              fontWeight: '600',
                            }}
                          >
                            Membership
                          </span>
                          {filterRoleMembership?.map((userTypeItem: any, index: number) => (
                            <DropDownItem key={index}>
                              <Input
                                type="checkbox"
                                // name={userTypeItem.id}
                                // value={userTypeItem.id}
                                checked={userType?.includes(userTypeItem.name)}
                                onClick={(e) => {
                                  if (userType?.includes(userTypeItem.name)) {
                                    setUserType(userType?.filter((userType) => userType !== userTypeItem.name));
                                  } else {
                                    const newUserType: any = [...userType, userTypeItem.name];
                                    setUserType(newUserType);
                                  }
                                  onChangeForm('types', userTypeItem.id)(e);
                                }}
                              />
                              {userTypeItem.name}
                            </DropDownItem>
                          ))}
                          <span
                            style={{
                              width: '100%',
                              border: 'none',
                              color: '#b4b4db',
                              padding: '0.5rem 1rem',
                              display: 'block',
                              fontSize: '1rem',
                              fontWeight: '600',
                            }}
                          >
                            Pending Membership
                          </span>
                          {filterRoleMembershipPending?.map((userTypeItem: any, index: number) => (
                            <DropDownItem key={index}>
                              <Input
                                type="checkbox"
                                checked={userType?.includes(userTypeItem.name)}
                                onClick={(e) => {
                                  if (userType?.includes(userTypeItem.name)) {
                                    setUserType(userType?.filter((userType) => userType !== userTypeItem.name));
                                  } else {
                                    const newUserType: any = [...userType, userTypeItem.name];
                                    setUserType(newUserType);
                                  }
                                  onChangeForm('types', userTypeItem.id)(e);
                                }}
                              />
                              {userTypeItem.name}
                            </DropDownItem>
                          ))}
                        </DropDownContent>
                      )}
                    </DropDown>
                  </div>
                  <div className="col l-4">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Any Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="status"
                          value={valueFilterList.status}
                          label="Status"
                          onChange={onChangeForm('status')}
                        >
                          <MenuItem value={''}>Any Status</MenuItem>
                          <MenuItem value={'E'}>Enable</MenuItem>
                          <MenuItem value={'D'}>Disable</MenuItem>
                          <MenuItem value={'U'}>Unapproved vendor</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col l-2">
                    <ButtonSearch
                      //  onClick={handleSubmitSearch}
                      onClick={handleSearchFilter}
                    >
                      Search
                    </ButtonSearch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserFilterContainer>
      </Form>
    </>
  );
};

export default UserFilter;
