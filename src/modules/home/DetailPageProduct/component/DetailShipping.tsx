import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styled from 'styled-components';
import { LOCATION_LIST_DATA } from '../../data/location_list_data';

const SpanStar = styled.span`
    color: red;
    margin-left: 0.2rem;
`;

const Text = styled.span`
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: end;
`;

const Container = styled.div`

`;

const Wrap = styled.div`
    margin-bottom: 2.4rem;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
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

const Span = styled.span`
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
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

const DropDownItem = styled.button`
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

const DetailShipping = ({ infoProduct, setInfoProduct, stateInfoProduct }: any) => {

    const locationData = LOCATION_LIST_DATA?.data;

    const [isActiveLocation, setIsActiveLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Select new zone");

    const getPrice = stateInfoProduct?.shipping?.map((item: any) => item?.price);

    const handleActiveLocation = () => {
        setIsActiveLocation(!isActiveLocation);
    }

    return (
        <>
            <Container>

                <Title>Shipping</Title>

                <Wrap>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <Text>Continental U.S. <SpanStar> *</SpanStar></Text>
                                </div>
                                <div className='col l-6'>
                                    <WrapInp>
                                        <Button>$</Button>
                                        <Input
                                            placeholder='0.00'
                                            defaultValue={getPrice}
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
                        <div className='col l-3'></div>
                        <div className='col l-3'>
                            <DropDown>
                                <DropDownBtn
                                    onClick={handleActiveLocation}
                                >
                                    {selectedLocation}
                                    <span style={{ float: 'right', }}><FaAngleDown /></span>
                                </DropDownBtn>
                                {isActiveLocation && (
                                    <DropDownContent>
                                        {locationData?.map((location: any, index: number) => (
                                            <DropDownItem
                                                key={index}
                                                onClick={(e) => {
                                                    setSelectedLocation(location.name);
                                                    setIsActiveLocation(false);
                                                }}
                                            >
                                                {location.name}
                                            </DropDownItem>
                                        ))}
                                    </DropDownContent>
                                )}

                            </DropDown>
                        </div>
                        <div className='col l-3'>
                            <Span>Add Shipping Location</Span>
                        </div>
                        <div className='col l-3'></div>
                    </div>
                </Wrap>
            </Container>

        </>
    );
};

export default DetailShipping;