import React from 'react'
import Layout from '@/components/layouts/layout'
import MenuItems from '@/components/organisms/menuItems'

const burgers = [
    {
        title: 'Hamburguesa Sencilla',
        image: 'burgers/hamburguesa_sencilla.webp',
        description: 'La clásica que nunca falla: una carne 100% de res, jugosa y bien sazonada, acompañada de queso cheddar, lechuga, tomate y mayonesa, servida en un suave pan brioche. Sencilla, pero llena de sabor.',
    },
    {
        title: 'Hamburguesa Doble',
        image: 'burgers/hamburguesa_doble.webp',
        description: 'Una explosión de sabor con dos jugosas carnes de res a la parrilla, cubiertas con queso derretido, tocino crujiente, lechuga fresca, tomate, cebolla morada y pepinillos, todo dentro de un pan artesanal dorado al momento. ¡Para los verdaderos amantes de la carne!'
    },
    {
        title: 'Hamburguesa de Pollo Crujiente',
        image: 'burgers/hamburguesa_pollo.webp',
        description: 'Una explosión de sabor con dos jugosas carnes de res a la parrilla, cubiertas con queso derretido, tocino crujiente, lechuga fresca, tomate, cebolla morada y pepinillos, todo dentro de un pan artesanal dorado al momento. ¡Para los verdaderos amantes de la carne!'
    }
]

const Burgers = () => {
  return (
    <Layout>
        <MenuItems cardDescriptions={burgers}/>
    </Layout>
  )
}

export default Burgers