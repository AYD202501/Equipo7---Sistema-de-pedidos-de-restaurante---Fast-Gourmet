import React from 'react'
import Layout from '@/components/layouts/layout'
import MenuItems from '@/components/organisms/menuItems'

const meats = [
    {
        title: 'Punta de anca',
        image: 'meats/punta_de_anca.webp',
        description: 'Un corte clásico y jugoso, sazonado con sal gruesa y especias seleccionadas. Se cocina lentamente al carbón para conservar su suavidad y darle un sabor ahumado irresistible. La textura tierna y su punto de cocción perfecto hacen de esta punta de anca una opción infaltable para los amantes de la carne bien preparada.'
    },
    {
        title: 'Solomito',
        image: 'meats/solomito.webp',
        description: 'El favorito de los carnívoros: carne de res a la parrilla, marinada con especias caseras, servida en pan baguette crocante. Lleva queso cheddar fundido, cebolla morada, pimientos salteados y un toque de mostaza Dijon y mayonesa casera. Ideal para los que disfrutan de un sabor intenso y reconfortante.'
    },
    {
        title: 'Costillas BBQ',
        image: 'meats/costillas_bbq.webp',
        description: 'Costillas de cerdo cocidas a fuego lento hasta quedar extremadamente tiernas, bañadas en una salsa BBQ casera con un balance perfecto de dulce y ahumado. Luego, se doran a la parrilla para caramelizar la salsa y darle un acabado crujiente y sabroso.'
    }
]

const Meats = () => {
  return (
      <Layout>
        <MenuItems cardDescriptions={meats}/>
      </Layout>
  )
}

export default Meats