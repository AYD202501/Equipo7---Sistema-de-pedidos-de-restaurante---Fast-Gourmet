import React from 'react'
import Layout from '@/components/layouts/layout'
import MenuItems from '@/components/organisms/menuItems'

const sandwichs = [
    {
        title: 'Sanduche de carne',
        image: 'sandwichs/sanduche_de_carne.webp',
        description: 'El favorito de los carnívoros: carne de res a la parrilla, marinada con especias caseras, servida en pan baguette crocante. Lleva queso cheddar fundido, cebolla morada, pimientos salteados y un toque de mostaza Dijon y mayonesa casera. Ideal para los que disfrutan de un sabor intenso y reconfortante.'
    },
    {
        title: 'Sanduche de pollo',
        image: 'sandwichs/sanduche_de_pollo.webp',
        description: 'Una opción deliciosa y ligera: pechuga de pollo marinada con hierbas finas y asada al punto perfecto. Servida en pan integral, con hojas de espinaca fresca, tomate, aguacate en láminas y un aderezo cremoso de yogur con limón y ajo. Perfecto para una comida balanceada sin sacrificar el sabor.'
    },
    {
        title: 'Sanduche especial',
        image: 'sandwichs/sanduche_especial.webp',
        description: 'Pan artesanal tostado con pollo a la parrilla, carne desmechada y panceta crujiente, acompañado de queso fundido, vegetales frescos y una salsa especial de la casa. ¡Una combinación jugosa y llena de sabor!'
    }
]

const Sandwichs = () => {
  return (
    <Layout>
        <MenuItems cardDescriptions={sandwichs}/>
    </Layout>
  )
}

export default Sandwichs