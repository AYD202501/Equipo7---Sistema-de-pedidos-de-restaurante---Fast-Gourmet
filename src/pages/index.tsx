import { HeroTitle } from '@/components/atoms/titles';
import Nav from '@/components/organisms/nav';
import Hero from '@/components/organisms/hero';

const Index = () => {
	return (
		<div className='min-h-screen bg-[#040404]'>
			<Nav/>
			<Hero/>
		</div>
	);
};

export default Index;