import React from 'react';

const categories = [
    {
        title: 'HAMBURGUESAS',
        link: '/burgers',
    },
    {
        title: 'SANDWICHS',
        link: '/sandwichs',
    },
    {
        title: 'CARNES',
        link: '/meats',
    },
];

const Sidebar = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  return (
    <div className={`sidebar h-fit w-36 z-2 cursor-pointer transition-transform duration-250 ease-in- ${isVisible ? 'translate-x-0' : '-translate-x-[200px]'}`} onClick={onClose}>
        <ul className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
          {categories.map((cat) => (
            <li key={cat.title} className="text-white">
              <a href={cat.link} className="block transition-transform duration-200 ease-in-out hover:scale-110 origin-bottom-left hover:text-[#EF4343]">{cat.title}</a>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Sidebar;