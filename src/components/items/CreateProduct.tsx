import { useState } from "react";
import { IProduct } from "../../types/Types";
import { LocalStorageKeys, useLocalStorage } from "../../utils/useLocalStorage";
import styles from './CreateProduct.module.scss';
import classNames from "classnames/bind";
import Modal from 'react-modal'
import Input from "antd/es/input/Input";
import { Button } from "antd";


Modal.setAppElement('#root');

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CreateProduct = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState<IProduct>({
        id: Number(''),
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0
    });

    const generateNewId = () => {
        if (shopProducts) {
            const maxId = Math.max(...shopProducts.map(product => product.id));
            return maxId + 1;
        } else {
            return 1;
        }
    };

    const addNewProductToList = () => {
        const newId = generateNewId();
        const temporaryShopProducts = [...shopProducts || [], { ...newProduct, id: newId }];
        setShopProducts(temporaryShopProducts);
        setShowAddProductForm(false);
    };



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', paddingRight: 30, marginTop: 16 }}>
                <Button className={cx("button-new")} onClick={() => setShowAddProductForm(!showAddProductForm)}
                    type='primary'
                >
                    {"Thêm sản phẩm mới"}
                </Button>
            </div>

            <Modal
                isOpen={showAddProductForm}
                onRequestClose={() => { setShowAddProductForm(false) }}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={cx('form-wrapper')}>
                    <h3>Thêm sản phẩm mới</h3>
                    <div className={cx('row')}>
                        <label>
                            Tên sản phẩm:
                        </label>
                        <Input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </div>
                    <div className={cx('row')}>
                        <label>
                            Giá:
                        </label>
                        <Input
                            type="text"
                            value={newProduct.price}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d*$/.test(value)) { // Kiểm tra xem giá trị nhập vào có phải là số không
                                    const price = value === '' ? 0 : parseInt(value); // Chuyển đổi giá trị thành số nguyên
                                    setNewProduct({ ...newProduct, price });
                                }
                            }}
                        />
                    </div>
                    <div className={cx('row')}>
                        <label>
                            Mô tả:
                        </label>
                        <Input
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                    </div>
                    <div className={cx('row')}>
                        <label>
                            Đường dẫn hình ảnh:
                        </label>
                        <Input
                            type="text"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                    </div>
                    <div className={cx('row')}>
                        <label>
                            Số lượng:
                        </label>
                        <Input
                            type="text"
                            value={newProduct.quantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d*$/.test(value)) { // Kiểm tra xem giá trị nhập vào có phải là số không
                                    const quantity = value === '' ? 0 : parseInt(value); // Chuyển đổi giá trị thành số nguyên
                                    setNewProduct({ ...newProduct, quantity });
                                }
                            }}
                        />
                    </div>

                    {/* <Button onClick={() => addNewProductToList()} type="button">Thêm sản phẩm</Button> */}
                    <Button
                        onClick={addNewProductToList}
                        type="primary"
                    >Thêm sản phẩm</Button>
                </div>
            </Modal >
        </>

    );
}

export default CreateProduct;
