import { useEffect } from "react"
import { LocalStorageKeys, useLocalStorage } from "../utils/useLocalStorage"
import { IProduct } from "../types/Types"
import bulbasaur from '../assets/images/bulbasaur.png'
import charmander from '../assets/images/charmander.png'
import lvysaur from '../assets/images/lvysaur.png'
import squirtle from '../assets/images/squirtle.png'
import venusaur from '../assets/images/venusaur.png'

const ShopController = () => {
    const [shopProducts, setShopProducts] = useLocalStorage(LocalStorageKeys.SHOP_PRODUCTS)

    useEffect(() => {
        if (shopProducts != null && shopProducts.length == 0) {
            const itemProductData: IProduct[] = [
                {
                    id: 1,
                    image: bulbasaur,
                    name: 'Bulbasaur',
                    description: "Bulbasaur là một Pokémon bậc tiến (Bulbasaur là Pokémon đầu tiên trong Pokédex) nổi tiếng với nụ cười trên lưng.",
                    price: 21.00,
                    quantity: 5
                },
                {
                    id: 2,
                    image: charmander,
                    name: 'Charmander',
                    description: "Charmander là một loài Pokémon hỏa. Nó có dạng con trai có hình dáng giống như con rồng nhỏ.",
                    price: 18.00,
                    quantity: 3
                },
                {
                    id: 3,
                    image: lvysaur,
                    name: 'Ivysaur',
                    description: "Ivysaur là một Pokémon cây cỏ hậu bậc tiến từ Bulbasaur. Khi phát triển, cánh hoa trên lưng của Ivysaur sẽ mở ra và nở thành một bông hoa lớn hơn.",
                    price: 22.00,
                    quantity: 0
                },
                {
                    id: 4,
                    image: squirtle,
                    name: 'Squirtle',
                    description: "Squirtle là một loài Pokémon nước. Nó giống như một con rùa có vỏ cứng và cánh tay mạnh mẽ.",
                    price: 15.00,
                    quantity: 7
                },
                {
                    id: 5,
                    image: venusaur,
                    name: 'Venusaur',
                    description: "Venusaur là dạng tiến hóa cuối cùng của Bulbasaur. Nó có một bông hoa lớn trên lưng và là một trong những Pokémon mạnh mẽ nhất trong thế giới Pokémon.",
                    price: 19.00,
                    quantity: 3
                }
            ];
            setShopProducts(itemProductData)
        }
    }, [shopProducts])
    console.log(shopProducts);
    

    return <></>
}

export default ShopController