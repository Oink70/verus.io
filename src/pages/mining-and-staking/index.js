import Link from 'next/link';
import Menu from '../../components/Menu';
import SlugMenu from '../../components/SlugMenu';
import { miningStakingLinks } from '../../constants/miningStaking';

const MiningOverview = () => {
  const nextRoute = miningStakingLinks[0];

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-12 ">
        <div className="md:col-start-2 md:col-span-3 lg:col-span-2 lg:col-start-3">
          <Menu pathList={miningStakingLinks} href="/mining-and-staking" />
        </div>
        <div className="p-6 sm:col-span-2 md:col-span-8 lg:col-span-7">
          <h1 className="p-0 m-0 text-4xl font-normal text-bluebutton">
            Mining and Staking
          </h1>
          <p className="font-light font-p">
            Anyone can earn VRSC by participating in the network economy. Use
            your computer power to help secure the network, or simply put your
            VRSC holdings to work by staking.
          </p>
          <h5 className="mb-0 text-2xl font-normal">Network Economy</h5>
          <p className="font-light font-p">
            By securing the network one can earn more than just block rewards.
            There are a number of fees collected in each found block, such as
            when a VerusID is created and conversions fees to and from reserve
            currencies.
          </p>
          <SlugMenu pathList={miningStakingLinks} href="/mining-and-staking" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-end p-2 md:hidden">
        <Link
          href="/mining-and-staking/[slug]"
          as={`/mining-and-staking/${nextRoute.slug}`}
        >
          <a className="items-center py-2 text-sm no-underline md:text-baseLink text-navlink hover:text-navlink-hover ">
            {nextRoute.slug}&nbsp;{' '}
            <svg
              width="8"
              height="18"
              viewBox="0 0 6 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
                stroke="#999"
                strokeLinecap="square"
              ></path>
            </svg>{' '}
          </a>
        </Link>
      </div>
    </>
  );
};

export default MiningOverview;
