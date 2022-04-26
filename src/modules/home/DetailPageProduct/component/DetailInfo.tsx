
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const conditionUsed = [
    {
        id: '262',
        name: 'Used',
    },
];

const Input = styled.input`
    width: 100%;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #252547;
    border: 1px solid #13132b;
    color: #fff;
    outline:none;

    &:hover{
        background-color: #1b1b38;
        border: 1px solid #13132b;
    }

    &:focus{
        border: 1px solid #a16eff;
        background-color: #323259;
    }
`;

const DropDown = styled.div`
    position: relative;
    width: 100%;
`;

const DropDownBtn = styled.div`
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: #252547;
    border: 1px solid #13132b;
    border-radius: 0.25rem;
    padding: 0.4rem 1rem;
    // cursor: pointer;
    height: 40px;
    text-align: left;  
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
    background: #fff;
    padding: 0.4rem 1rem;
    fontSize: 1rem;
    font-weight: 600;
    color: #000;
    cursor: pointer;

    &:hover{
        background-color: rgba(180,180,219,.16);
        color: #fff;
    }
`;

const DetailInfo = ({ infoProduct, setInfoProduct, totalVendor, detailProductChange, stateInfoProduct }: any) => {

    const editorRef = useRef(null);
    const categoryData = useSelector((store: any) => store?.filterCategory?.filterCategory);
    const brandData = useSelector((store: any) => store?.productBrand?.productBrand);

    const getCondition = conditionUsed?.find((item: any) => item?.id === infoProduct?.condition_id);

    const [searchTerm, setSearchTerm] = useState('');

    const [isActiveVendor, setIsActiveVendor] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState('');

    const [isActiveBrand, setIsActiveBrand] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');

    const [isActiveCondition, setIsActiveCondition] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(getCondition?.name);

    const [isActiveConditionUsed, setIsActiveConditionUsed] = useState(false);
    const [selectedConditionUsed, setSelectedConditionUsed] = useState('');

    const handleActiveVendor = () => {
        setIsActiveVendor(!isActiveVendor);
    }

    const handleActiveBrand = () => {
        setIsActiveBrand(!isActiveBrand);
    }

    const handleActiveCondition = () => {
        setIsActiveCondition(!isActiveCondition);
    }

    const handleActiveConditionUsed = () => {
        setIsActiveConditionUsed(!isActiveConditionUsed);
    }

    const onChangeForm = (fieldName: string, fieldValue?: string | number) => {
        detailProductChange(fieldName, fieldValue ?? '');
    }

    useEffect(() => {
        setSelectedCondition(getCondition?.name);
    }, [getCondition]);

    return (
        <>
            <div>
                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Vendor <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <DropDown>
                                        <DropDownBtn
                                            onClick={handleActiveVendor}
                                        >
                                            <Input
                                                autoComplete='off'
                                                type='text'
                                                id="vendor"
                                                name='vendor'
                                                placeholder='Type Vendor name to select'
                                                value={stateInfoProduct?.vendor?.name}
                                                onChange={(e) => {
                                                    onChangeForm('vendor', e.target.value);
                                                    setSearchTerm(e?.target?.value);
                                                    setIsActiveVendor(true);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    background: 'none transparent',
                                                    border: '0',
                                                    outline: 'none',
                                                    cursor: 'default',
                                                    color: '#fff',
                                                    fontWeight: '600',
                                                }}
                                            />

                                            <span style={{ float: 'right', zIndex: '10' }}>{!isActiveVendor ? <FaAngleDown /> : <FaAngleUp />}</span>
                                        </DropDownBtn>

                                        {isActiveVendor && (
                                            <DropDownContent>
                                                {totalVendor
                                                    ?.filter((vendorItem: any) => {
                                                        if (searchTerm == '') {
                                                            return vendorItem?.name;
                                                        } else if (vendorItem?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
                                                            return vendorItem?.name;
                                                        }
                                                    })
                                                    ?.map((vendor: any, index: number) => (
                                                        <DropDownItem
                                                            key={index}
                                                            onClick={() => {
                                                                setSelectedVendor(vendor.name);
                                                                setIsActiveVendor(false);
                                                                onChangeForm('vendor', vendor);
                                                            }}
                                                        >
                                                            {vendor.name}
                                                        </DropDownItem>
                                                    ))}
                                            </DropDownContent>
                                        )}
                                    </DropDown>
                                </div >
                            </div >
                        </div >
                        <div className='col l-6'></div>
                    </div >
                </div >

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Product title <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='name'
                                        defaultValue={infoProduct?.name}
                                        onChange={(e) => onChangeForm('name', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div >

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Brand <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <DropDown>
                                        <DropDownBtn onClick={handleActiveBrand}>
                                            <Input
                                                autoComplete='off'
                                                type='text'
                                                name='brand'
                                                value={stateInfoProduct?.brand?.name}
                                                onChange={(e: any) => {
                                                    onChangeForm('brand', e.target.value);
                                                    setSearchTerm(e?.target?.value);
                                                    setIsActiveBrand(true);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    background: 'none transparent',
                                                    border: '0',
                                                    outline: 'none',
                                                    cursor: 'default',
                                                    color: '#fff',
                                                    fontWeight: '600',
                                                }}
                                            />
                                            <span style={{ float: 'right', zIndex: '10' }}>{!isActiveBrand ? <FaAngleDown /> : <FaAngleUp />}</span>
                                        </DropDownBtn>

                                        {isActiveBrand && (
                                            <DropDownContent
                                                style={{
                                                    height: '200px',
                                                }}
                                            >
                                                {brandData?.filter((brandItem: any) => {
                                                    if (searchTerm == '') {
                                                        return brandItem?.name;
                                                    } else if (brandItem?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
                                                        return brandItem?.name;
                                                    }
                                                })?.map((brand: any, index: number) => (
                                                    <DropDownItem
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedBrand(brand.name);
                                                            setIsActiveBrand(false);
                                                            onChangeForm('brand', brand);
                                                        }}
                                                    >
                                                        {brand.name}
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
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Condition <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <DropDown>
                                        <DropDownBtn
                                            onClick={handleActiveCondition}
                                        >
                                            {selectedCondition}
                                            <span style={{ float: 'right', zIndex: '10' }}>{!isActiveCondition ? <FaAngleDown /> : <FaAngleUp />}</span>
                                        </DropDownBtn>

                                        {isActiveCondition && (
                                            <DropDownContent
                                                style={{
                                                    display: 'inline-block',
                                                    height: '40px',
                                                    background: '#323259',
                                                    border: '1px solid #13132b',
                                                }}
                                            >
                                                {conditionUsed?.map((conditionItem: any) => (
                                                    <DropDownItem
                                                        key={conditionItem.id}
                                                        style={{
                                                            // background: '#323259',
                                                            // color: '#fff',
                                                        }}
                                                        onClick={() => {
                                                            setSelectedCondition(conditionItem.name);
                                                            setIsActiveCondition(false);
                                                            onChangeForm('condition_id', conditionItem.id);
                                                        }}
                                                    >
                                                        {conditionItem.name}
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
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Used Condition
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <DropDown>
                                        <DropDownBtn style={{}}
                                            onClick={handleActiveConditionUsed}
                                        >
                                            {selectedConditionUsed}
                                            <span style={{ float: 'right', zIndex: '10' }}><FaAngleDown /></span>
                                        </DropDownBtn>

                                        {isActiveConditionUsed && (
                                            <DropDownContent
                                                style={{
                                                    display: 'inline-block',
                                                    height: '2px',
                                                    background: '#323259',
                                                    border: '1px solid #13132b',
                                                }}
                                            >
                                                <DropDownItem
                                                    style={{
                                                        cursor: 'default'
                                                    }}
                                                >
                                                    {''}
                                                </DropDownItem>
                                            </DropDownContent>
                                        )}
                                    </DropDown>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        SKU <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='sku'
                                        defaultValue={infoProduct?.sku}
                                        onChange={(e) => onChangeForm('sku', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Image <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='images'
                                        defaultValue={infoProduct?.images}
                                    // onChange={onChangeForm('images')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Category <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Input
                                        type='text'
                                        name='categories'
                                        defaultValue={infoProduct?.categories}
                                    // onChange={onChangeForm('categories')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Description <span style={{ fontSize: '1.2rem', marginLeft: '4px', color: 'red' }}> * </span>
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <Editor
                                        onInit={(evt: any, editor: any) => editorRef.current = editor}
                                        initialValue="<p>This is the initial content of the editor.</p>"
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        tagName='description'
                                        value={stateInfoProduct?.description}
                                        onEditorChange={(e) => onChangeForm("description", e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>

                <div style={{ marginBottom: '2.4rem' }}>
                    <div className='row'>
                        <div className='col l-6'>
                            <div className='row'>
                                <div className='col l-6'>
                                    <label
                                        style={{
                                            float: 'right',
                                            fontSize: '1.1rem',
                                            fontWeight: '400',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                        }}>
                                        Available for sale
                                    </label>
                                </div>
                                <div className='col l-6'>
                                    <div style={{ display: 'flex' }}>
                                        <span style={{ color: '#fff', marginRight: '1rem' }}>Yes</span>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="flexSwitchCheckChecked"
                                                name='enabled'
                                                checked={stateInfoProduct?.enabled}
                                                onChange={(e) => onChangeForm('enabled', e.target.checked ? 1 : 0)}
                                            />
                                        </div>
                                        <span style={{ color: '#fff', marginLeft: '1rem' }}>No</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6'></div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default DetailInfo;