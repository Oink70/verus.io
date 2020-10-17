import { useState } from 'react';

import Menu from '../../components/Menu';
import { walletLinks } from '../../constants/wallet';
import { formatDateFromString, date_diff_indays } from '../../utils/helpers';
import MarkdownModal from '../../components/MarkdownModal';
import FooterMenu from '../../components/FooterMenu';

const PaperWallet = () => {
  const [modalShow, setModalShow] = useState(false);
  const _handleModal = (value) => {
    setModalShow(value);
  };

  return (
    <>
      <div className="container grid max-w-5xl grid-cols-1 gap-6 mb-40 md:grid-cols-4">
        <div className="">
          <Menu pathList={walletLinks} href="/wallet" />
        </div>

        <div className="max-w-5xl p-6 md:col-span-3">
          <h1 className="p-0 m-0 text-4xl font-normal ">Paper Wallet</h1>
          <p className="my-8">
            Wallets not developed by the Verus Community that can hold VRSC.
          </p>
          <p className="my-8">Content</p>
          <h2 className="mt-16 text-2xl font-normal">H2</h2>
        </div>
      </div>

      <FooterMenu hrefLocation="/wallet" pathList={walletLinks} />
    </>
  );
};

export default PaperWallet;

//https://paperwallet.veruscoin.io/
