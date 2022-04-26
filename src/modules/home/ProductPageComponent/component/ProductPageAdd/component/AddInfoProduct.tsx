import { FormGroup, Grid, InputLabel, Stack, Switch, TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Editor } from '@tinymce/tinymce-react';

import { BRAND_LIST_DATA } from '../../../../data/brand_list_data';
import { InfoState } from '../../../../redux/InfoReducer';

const conditionUsed = [
    {
        id: '262',
        name: 'Used',
    },
];

const Input = styled.input`
    width: 50%;
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
    width: 50%;
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

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme?.palette?.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme?.transitions?.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme?.palette?.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const initialFValues = {
    id: '',
    vendor: '',
    name: '',
    brand_id: '',
    condition: '',
    sku: '',
    image: '',
    category: '',
    description: '',
}

const SpanStar = styled.span`
    color: red;
`;

const AddInfoProduct = ({ validate, formValues, handleAddFormChange, totalVendors, }: any) => {

    const brandData = useSelector((store: any) => store?.productBrand?.productBrand);

    const categoryData = useSelector((store: any) => store?.filterCategory?.filterCategory);
    const { infoProduct }: any = useSelector((state: InfoState) => state.infoProduct);

    const avatarInputRef = useRef<HTMLInputElement>(null);

    const [profileImage, setProfileImage] = useState('https://www.google.com/imgres?imgurl=https%3A%2F%2Fthuvienplus.com%2Fthemes%2Fcynoebook%2Fpublic%2Fimages%2Fdefault-user-image.png&imgrefurl=https%3A%2F%2Fthuvienplus.com%2Fusers%3Fsort%3Dlatest%26page%3D2&tbnid=38C4s6EocJi3wM&vet=12ahUKEwi35MCOq9_2AhXfZWwGHYpbA98QMygEegUIARC_AQ..i&docid=y-G3tFRX0jf7NM&w=512&h=512&q=user&ved=2ahUKEwi35MCOq9_2AhXfZWwGHYpbA98QMygEegUIARC_AQ');
    const [image, setImage] = useState(infoProduct?.avatar);

    const [values, setValues] = useState(initialFValues);
    const [searchTermBrand, setSearchTermBrand] = useState('');

    const [isActiveVendor, setIsActiveVendor] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState('');

    const [isActiveBrand, setIsActiveBrand] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');

    const [isActiveCondition, setIsActiveCondition] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState('');

    const [isActiveConditionUsed, setIsActiveConditionUsed] = useState(false);
    const [selectedConditionUsed, setSelectedConditionUsed] = useState('');

    const [searchTermCategory, setSearchTermCategory] = useState('');
    const [isActiveCategory, setIsActiveCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [selectedImages, setSelectedImages] = useState([]);

    const editorRef = useRef(null);

    const handleActiveVendor = () => {
        setIsActiveVendor(!isActiveVendor);
    }

    const handleActiveBrand = () => {
        setIsActiveBrand(!isActiveBrand);
    }

    const handleInputConditionChange = (e: any) => {
        setIsActiveCondition(true);
    };

    const handleActiveCondition = () => {
        setIsActiveCondition(!isActiveCondition);
    }

    const handleInputConditionUsedChange = (e: any) => {
        setIsActiveConditionUsed(true);
    };

    const handleActiveConditionUsed = () => {
        setIsActiveConditionUsed(!isActiveConditionUsed);
    }

    const handleCategoryChange = (e: any) => {
        setSearchTermCategory(e.target.value);
        setIsActiveCategory(true);
    };

    const handleActiveCategory = () => {
        setIsActiveCategory(!isActiveCategory);
    }

    const changeAvatar = () => {
        if (avatarInputRef.current !== null) avatarInputRef.current.click();
    }

    const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files;
        console.log(files);

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result as any);
        };

        if (files !== null && files.length) reader.readAsDataURL(files[0]);
    }

    const onChangeForm = (fieldName: string, fieldValue?: string | number) => {
        handleAddFormChange(fieldName, fieldValue ?? '');
    }

    const handleChangeImage = (e: any) => {
        console.log(e.target.files);
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file: any) => URL.createObjectURL(file));
            setSelectedImages((prevImages: any) => prevImages.concat(fileArray));
            Array.from(e.target.files).map(
                (file: any) => {
                    formValues.imagesOrder.push(file.name)
                    return URL.revokeObjectURL(file)
                }
            )
        }

        console.log('formValues.imagesOrder: ', formValues.imagesOrder)
    }

    const renderPhotos = (source: any) => {
        return source.map((photo: any) => (
            <img src={photo} key={photo} style={{ width: '40px', height: '40px' }} />
        ))
    }

    return (
        <>
            <Grid sx={{ marginBottom: '2.4rem' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="vendor_id" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Vendor <SpanStar>*</SpanStar>
                    </InputLabel>
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
                                value={formValues.vendor.name}
                                onChange={(e: any) => {
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
                                {totalVendors
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
                </Grid>
                <Grid item xs={6}>
                    <div className='row'>
                        <div className='col l-6'></div>
                        <div className='col l-6' style={{ padding: '0' }}>
                            {!!validate?.vendor && (
                                <small className='text-danger' style={{ textAlign: 'center' }}>{validate.vendor}</small>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="name" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Product Title <SpanStar>*</SpanStar>
                    </InputLabel>
                    <Input
                        id="name"
                        name='name'
                        value={formValues.name}
                        onChange={(e) => onChangeForm('name', e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div className='row'>
                        <div className='col l-6'></div>
                        <div className='col l-6' style={{ padding: '0' }}>
                            {
                                !!validate?.name && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.name}</small>
                                )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="brand_id" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Brand <SpanStar>*</SpanStar>
                    </InputLabel>
                    <DropDown>
                        <DropDownBtn onClick={handleActiveBrand}>
                            <Input
                                autoComplete='off'
                                type='text'
                                name='brand'
                                value={formValues.brand.name}
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
                </Grid>

                <Grid item xs={6}>
                    <div className='row'>
                        <div className='col l-6'></div>
                        <div className='col l-6' style={{ padding: '0' }}>
                            {
                                !!validate?.brand && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.brand}</small>
                                )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>


            <Grid sx={{ marginBottom: '2.4rem' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="brand" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Condition <SpanStar>*</SpanStar>
                    </InputLabel>
                    <DropDown>
                        <DropDownBtn
                            onClick={handleActiveCondition}
                        >
                            <Input
                                type='hidden'
                                name='condition_id'
                                value={formValues.condition_id}
                                onChange={() => onChangeForm('condition_id')}
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
                </Grid>
            </Grid>

            {
                selectedCondition
                    ? (
                        <Grid sx={{ marginBottom: '2.4rem' }}>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <InputLabel htmlFor="brand" sx={{ color: '#fff', marginRight: '2rem', }}>
                                    Used Condition
                                </InputLabel>
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
                            </Grid>
                        </Grid>
                    ) : null
            }


            <Grid sx={{ marginBottom: '2.4rem' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="sku" sx={{ color: '#fff', marginRight: '2rem', }}>
                        SKU
                    </InputLabel>
                    <Input
                        id="sku"
                        name='sku'
                        placeholder=''
                        value={formValues.sku}
                        onChange={(e) => onChangeForm('sku', e.target.value)}
                    />
                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem', display: 'flex' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel sx={{ color: '#fff', marginRight: '2rem', }}>
                        Image <SpanStar>*</SpanStar>
                    </InputLabel>

                    <div>
                        {/* <div>
                            <img src={profileImage} alt="avataURl" />
                        </div> */}
                        <div onClick={changeAvatar}>
                            <Input
                                multiple
                                id='inputImage'
                                type='file'
                                name='image_upload'
                                placeholder=''
                                accept='image/*'
                                // onChange={onChooseAvatar}
                                onChange={handleChangeImage}
                                style={{ width: '100%' }}
                            />
                            {/* <span>Upload Avatar</span> */}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='row'>
                        <div className='col l-6'></div>
                        <div className='col l-6' style={{ padding: '0' }}>
                            {
                                !!validate?.name && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.image}</small>
                                )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem', display: 'flex' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <div>
                        {renderPhotos(selectedImages)}
                    </div>
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem', display: 'flex' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="categories" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Category <SpanStar>*</SpanStar>
                    </InputLabel>
                    <DropDown>
                        <DropDownBtn onClick={handleActiveCategory} style={{}}>
                            {selectedCategory}
                            <span style={{ float: 'right', zIndex: '10' }}>{!isActiveCategory ? <FaAngleDown /> : <FaAngleUp />}</span>
                        </DropDownBtn>

                        {isActiveCategory && (
                            <DropDownContent
                                style={{
                                    height: '200px',
                                }}
                            >
                                {categoryData?.filter((categoryItem: any) => {
                                    if (searchTermCategory == '') {
                                        return categoryItem?.name;
                                    } else if (categoryItem?.name?.toLowerCase()?.includes(searchTermCategory?.toLowerCase())) {
                                        return categoryItem?.name;
                                    }
                                })?.map((category: any, index: number) => (
                                    <DropDownItem
                                        key={index}
                                        onClick={() => {
                                            setSelectedCategory(category?.name);
                                            setIsActiveCategory(false);
                                            onChangeForm('categories', category.id);
                                        }}
                                    >
                                        -----{category.name}
                                    </DropDownItem>
                                ))}
                            </DropDownContent>
                        )}
                    </DropDown>
                </Grid>
                <Grid item xs={6}>
                    <div className='row'>
                        <div className='col l-6'></div>
                        <div className='col l-6' style={{ padding: '0' }}>
                            {
                                !!validate?.name && (
                                    <small className='text-danger' style={{ textAlign: 'center' }}>{validate.category}</small>
                                )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid sx={{ marginBottom: '2.4rem', display: 'flex' }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <InputLabel htmlFor="brand" sx={{ color: '#fff', marginRight: '2rem', }}>
                        Description <SpanStar>*</SpanStar>
                    </InputLabel>

                    <div style={{ width: '50%', zIndex: 0, }}>
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
                            value={formValues.description}
                            onEditorChange={(e) => onChangeForm("description", e)}
                        />
                    </div>
                </Grid>
            </Grid>

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
                                            checked={formValues?.enabled}
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
        </>
    );
};

export default AddInfoProduct;