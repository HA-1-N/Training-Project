import { InfoUserValidation } from './../../models/infouser';
import { InfoUser } from "../../models/infouser";
import { validEmailRegex } from '../../utils';
import { IProductFormAdd, IProductFormAddValidation } from '../../models/product';


const validateFirstName = (firstName: string) => {
    if (!firstName) {
        return 'First Name is required';
    }
    return '';
}

const validateLastName = (lastName: string) => {
    if (!lastName) {
        return 'Last Name is required';
    }
    return '';
}

const validateEmail = (email: string) => {
    if (!email) {
        return 'Email is required';
    }

    if (!validEmailRegex.test(email)) {
        return 'Email is invalid';
    }
    return '';
}

const validatePassword = (password: string) => {
    if (!password) {
        return 'Password is required';
    }

    if (password.length < 6) {
        return 'Min password is invalid';
    }

    return '';
}

const validateConfirmPassword = (password: string, confirm_password: string) => {
    if (!confirm_password) {
        return 'Required Confirm Password';
    }

    if (password !== confirm_password) {
        return 'Math Password Invalid';
    }
    return '';
}

const validateVendor = (vendor: string) => {
    if (!vendor) {
        return 'The field is required';
    }
    return '';
}

const validateName = (name: string) => {
    if (!name) {
        return 'The field is required';
    }
    return '';
}

const validateBrand = (brand: string) => {
    if (!brand) {
        return 'The field is required';
    }
    return '';
}

const validateImage = (imagesOrder: any) => {
    if (!imagesOrder) {
        return 'Image is required';
    }
    return '';
}

const validateCategory = (categories: string) => {
    if (!categories) {
        return 'The field is required';
    }
    return '';
}

const validateDescription = (description: string) => {
    if (!description) {
        return 'The field is required';
    }
    return '';
}

export const validateFormAddUser = (values: InfoUser): InfoUserValidation => {
    return {
        firstName: validateFirstName(values.firstName),
        lastName: validateLastName(values.lastName),
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirm_password: validateConfirmPassword(values.password, values.confirm_password),
    }
}

export const validFormAddUser = (values: InfoUserValidation) => {
    return !values.firstName
        && !values.lastName
        && !values.email
        && !values.password
        && !values.confirm_password;
}

export const validateFormAddProduct = (values: IProductFormAdd): IProductFormAddValidation => {
    return {
        vendor: validateVendor(values.vendor.id),
        name: validateName(values.name),
        brand: validateBrand(values.brand.id),
        imagesOrder: validateImage(values.imagesOrder),
        categories: validateCategory(values.categories),
        description: validateDescription(values.description),
    }
}

export const validFormAddProduct = (values: IProductFormAddValidation) => {
    return !values.vendor.id
        && !values.name
        && !values.brand.id
        && !values.imagesOrder
        && !values.categories
        && !values.description;
}