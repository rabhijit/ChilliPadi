import PhoneStorageManager from "./phoneStorageManager";

const TempCartKey = "tempCartKey";
const InitialCart = [];

function _getTempCartKey() {
    return TempCartKey;
}

function _getInitialCart() {
    return InitialCart;
}

function _storeCartItem(data) {
    PhoneStorageManager._storeData(TempCartKey, data);
}

function _retrieveCartItem() {
    return PhoneStorageManager._getData(TempCartKey);
}

function _resetCart() {
    PhoneStorageManager._deleteData(TempCartKey);
    PhoneStorageManager._storeData(TempCartKey, InitialCart);
}

export default {
    _getTempCartKey,
    _getInitialCart,
    _retrieveCartItem,
    _resetCart,
    _storeCartItem
};