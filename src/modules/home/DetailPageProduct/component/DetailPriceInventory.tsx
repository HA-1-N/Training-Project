import React, { useState } from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import { FaAngleDown, FaCalendar } from 'react-icons/fa';

const general = [
    {
        value: 4,
        name: 'General',
    },
];
const checkedPrice = ['$', '%'];

const SpanStar = styled.span`
    color: red;
    margin-left: 4px;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 2.4rem;
`;

const Text = styled.span`
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: 1rem;
    margin-left: -1rem;
`;

const SelectOption = styled.select`

`;

const Option = styled.option`

`;

const Span = styled.span`
    color: #fff;
`;

const Container = styled.div`

`;

const Wrap = styled.div`
    margin-bottom: 2.4rem;
`;

const WrapInp = styled.div`
    width: 100%;
    display: flex;
`;

const Input = styled.input`
    width: 100%;
    background-color: #323259;
    border-radius: 0.25rem;
    font-size: .9375rem;
    font-weight: 600;
    line-height: 1.5rem;
    padding: 0.4375rem 1rem;
    color: #fff;
    outline: none;
    border: 1px solid #a16eff;

    &:hover{
        background-color: #1b1b38;
        border: 1px solid #a16eff;
    }
`;

const CheckBox = styled.input`

`;

const Button = styled.button`
    background-color: rgba(180,180,219,.24);
    color: rgba(180,180,219,.48);
    border: none;
    box-shadow: 0 0 0 0 #7b51db, 0 0 0 0 #5a37b8, 0 0 transparent;  
    padding: 0.75rem 1.1875rem;
    font-size: .875rem;
    font-weight: 700;
    line-height: 1rem;
    cursor: default;
    border-radius: 5px 0 0 5px;
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

    &:hover{
        background-color: #1b1b38;
        border: 1px solid #13132b;
    }

    &:focus{
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
    fontSize: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    text-align: left;
    border: none;
    // border-bottom: 1px solid #13132b;

    &:hover{
        background-color: rgba(180,180,219,.16);
        color: #fff;
    }
`;

const DetailPriceInventory = ({ infoProduct, setInfoProduct, detailProductChange }: any) => {

    const [isActiveMembership, setIsActiveMembership] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState<string[]>([]);

    const [isActiveCheckedPrice, setIsActiveCheckedPrice] = useState(false);
    const [selectedCheckedPrice, setSelectedCheckedPrice] = useState('$');

    const handleActiveMembership = () => {
        setIsActiveMembership(!isActiveMembership);
    };

    const handleCheckedPrice = () => {
        setIsActiveCheckedPrice(!isActiveCheckedPrice);
    };

    const onChangeForm = (fieldName: string, fieldValue?: string | number) => {
        detailProductChange(fieldName, fieldValue ?? '');
    }

    return (
        <>
            <Container>
                <Grid>
                    <Title>Prices & Inventory</Title>
                </Grid>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <Text>Membership</Text>
                                </div>
                                <div className='col l-6'>
                                    <DropDown>
                                        <DropDownBtn
                                            onClick={handleActiveMembership}
                                        >
                                            {selectedMembership}
                                            <span style={{ float: 'right', }}><FaAngleDown /></span>
                                        </DropDownBtn>

                                        {isActiveMembership && (
                                            <DropDownContent style={{ height: 'auto' }}>
                                                {general.map((generalItem: any, index: number) => (
                                                    <DropDownItem
                                                        key={index}
                                                        style={{ display: 'flex', alignItems: 'center', }}
                                                    // onClick={() => {
                                                    //     onChangeForm('memberships', generalItem.value)();
                                                    // }}
                                                    >
                                                        <Input
                                                            type='checkbox'
                                                            style={{
                                                                width: '15px',
                                                                height: '15px',
                                                                marginRight: '1rem',
                                                            }}
                                                            checked={selectedMembership?.includes(generalItem.name)}
                                                            onClick={() => {
                                                                if (selectedMembership?.includes(generalItem.name)) {
                                                                    setSelectedMembership(selectedMembership?.filter((selected) => selected !== generalItem.name));
                                                                } else {
                                                                    const newMembership: any = [...selectedMembership, generalItem.name];
                                                                    setSelectedMembership(newMembership);
                                                                }
                                                                // onChangeForm('memberships', generalItem.value)();
                                                            }}
                                                        />
                                                        {generalItem.name}
                                                    </DropDownItem>
                                                ))}
                                            </DropDownContent>
                                        )}
                                    </DropDown>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </Wrap>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <Text>Tax class</Text>
                                </div>
                                <div className='col l-6'>
                                    <div className='row'>
                                        <div className='col l-6'>
                                            <Text style={{ justifyContent: 'start', margin: '0', }}>Default</Text>
                                        </div>
                                        <div className='col l-6'>
                                            <CheckBox
                                                type='checkbox'
                                                name=''
                                                className='form-check-input'
                                                defaultChecked={infoProduct?.tax_exempt}
                                                onChange={(e) => onChangeForm('tax_exempt', e.target.checked ? 1 : 0)}
                                            />
                                            <Span style={{ marginLeft: '0.6rem' }}>Tax Exempt</Span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </Wrap>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <WrapInp>
                                        <Text>Price</Text>
                                        <SpanStar>*</SpanStar>
                                    </WrapInp>
                                </div>
                                <div className='col l-6'>
                                    <div className='row'>
                                        <div className='col l-6'>
                                            <WrapInp>
                                                <Button>$</Button>
                                                <Input
                                                    type='number'
                                                    name='price'
                                                    placeholder='0.00'
                                                    pattern='none'
                                                    defaultValue={infoProduct?.price}
                                                    onChange={(e) => onChangeForm('price', e.target.value)}
                                                />
                                            </WrapInp>
                                        </div>
                                        <div className='col l-6'>
                                            <CheckBox
                                                color='primary'
                                                type='checkbox'
                                                name='participate_sale'
                                                defaultChecked={infoProduct?.participate_sale}
                                                onChange={(e) => onChangeForm('participate_sale', e.target.checked ? 1 : 0)}
                                                className='form-check-input'
                                            />
                                            <Span style={{ marginLeft: '0.6rem' }}>Sale</Span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {infoProduct?.participate_sale
                            ?
                            (
                                <div className='col l-6'>
                                    <div style={{ display: 'flex' }}>
                                        <DropDown style={{ width: '15%', border: '1px solid #a16eff', borderRadius: '4px' }}>
                                            <DropDownBtn onClick={handleCheckedPrice}>
                                                <Input
                                                    type='hidden'
                                                    name='sale_price_type'
                                                    id='sale_price_type'
                                                    value={infoProduct?.sale_price_type}
                                                    onChange={() => onChangeForm('sale_price_type')}
                                                />
                                                {selectedCheckedPrice}
                                                <span style={{ float: 'right', }}><FaAngleDown /></span>
                                            </DropDownBtn>

                                            {isActiveCheckedPrice && (
                                                <DropDownContent style={{ height: 'auto' }}>
                                                    {checkedPrice.map((price: any, index: number) => (
                                                        <DropDownItem
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedCheckedPrice(price);
                                                                setIsActiveCheckedPrice(false);
                                                                onChangeForm('sale_price_type', price);
                                                            }}
                                                        >
                                                            {price}
                                                        </DropDownItem>
                                                    ))}
                                                </DropDownContent>
                                            )}
                                        </DropDown>
                                        <div>
                                            <Input
                                                type="number"
                                                name="sale_price"
                                                id=""
                                                defaultValue={infoProduct?.sale_price}
                                                onChange={() => onChangeForm('sale_price')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                            : null}
                    </div>
                </Wrap>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <Text>Arrival Date <SpanStar> *</SpanStar></Text>
                                </div>
                                <div className='col l-6'>
                                    <WrapInp>
                                        <Button>
                                            <FaCalendar />
                                        </Button>
                                        <Input
                                            type='date'
                                            name='arrival_date'
                                            value={infoProduct?.arrival_date}
                                        // onChange={onChangeForm('arrival_date')}
                                        />
                                    </WrapInp>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </Wrap>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <Text>Quantity in stock <SpanStar> *</SpanStar></Text>
                                </div>
                                <div className='col l-6'>
                                    <WrapInp>
                                        <Input
                                            style={{ width: '50%', }}
                                            type="number"
                                            value={infoProduct?.quantity}
                                        // onChange={onChangeForm('quantity')}
                                        />
                                    </WrapInp>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </Wrap>
            </Container>
        </>
    );
};

export default DetailPriceInventory;