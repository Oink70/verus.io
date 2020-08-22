import { useState } from 'react';
import Link from 'next/link';
import Menu from '../../components/Menu';
import { useRouter } from 'next/router';
import { walletLinks } from '../../constants/wallet';
import { formatDateFromString, date_diff_indays } from '../../utils/helpers';
import MarkdownModal from '../../components/MarkdownModal';

const MobileWallet = ({ latestAndroid }) => {
  const path = useRouter();
  const pathIndex = walletLinks.findIndex((e) => e.slug === path.query.slug);
  const prevPath = walletLinks[pathIndex - 1] || [];
  const nextPath = walletLinks[pathIndex + 1] || [];
  const [modalShow, setModalShow] = useState(false);
  const _handleModal = (value) => {
    setModalShow(value);
  };

  return (
    <div className="modalBody modal-active">
      <div className="grid w-full grid-cols-1 gap-4 mb-40 md:grid-cols-12">
        <div className="md:col-start-2 md:col-span-3 lg:col-span-2 lg:col-start-3">
          <Menu pathList={walletLinks} href="/wallet" />
        </div>

        <div className="grid grid-cols-1 p-6 sm:grid-cols-12 sm:col-span-2 md:col-span-7 lg:col-span-7">
          <div className="p-6 text-center sm:text-left sm:col-span-6">
            <h2 className="p-0 m-0 text-5xl font-normal text-bluebutton">
              Verus for Mobile
            </h2>
            <p className="mb-0 font-light font-p">
              Latest version: {latestAndroid.name} <br />
              Latest release: {formatDateFromString(
                latestAndroid.published_at
              )}{' '}
              <br />
              {date_diff_indays(latestAndroid.published_at) < 7 ? (
                <span className="px-6 py-1 mx-4 font-bold whitespace-no-wrap bg-red-600 rounded-full ">
                  New Update
                </span>
              ) : null}
            </p>
          </div>
          <div className="left-0 p-6 sm:col-span-6">
            <img
              src="/images/VerusDesktopImg3.png"
              className="w-full"
              srcSet="/images/VerusDesktopImg3-p-500.png 500w, /images/VerusDesktopImg3-p-800.png 800w, /images/VerusDesktopImg3-p-1080.png 1080w, /images/VerusDesktopImg3.png 1600w"
              sizes="(max-width: 479px) 43vw, (max-width: 767px) 51vw, (max-width: 991px) 54vw, 56vw"
              alt=""
            />
          </div>
          <div className="items-center justify-center md:col-span-12 lg:col-span-12 sm:col-span-12">
            <a href="https://testflight.apple.com/join/ZS43lYcw">
              <button className="w-full px-6 py-4 m-2 text-lg text-white border-0 rounded-full sm:w-auto focus:outline-none bg-bluebutton hover:bg-bluebutton-hover">
                Verus Mobile for iOS
              </button>
            </a>
            <a href="https://github.com/VerusCoin/Verus-Mobile/releases">
              <button className="w-full px-6 py-4 m-2 text-lg text-white border-0 rounded-full sm:w-auto focus:outline-none bg-bluebutton hover:bg-bluebutton-hover">
                Verus Mobile for Android
              </button>
            </a>
          </div>

          <div className="p-6 space-y-20 text-center sm:text-left sm:col-span-5">
            <div>
              <h3 className="mb-2 text-2xl font-normal">Easy and Safe</h3>
              <p className="font-light text-md font-p">
                Verus Mobile is created for beginners and exports in mind.
                Anyone can get started, no matter previous cryptocurrency
                experiences.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal">VerusID</h3>
              <p className="font-light text-md font-p">
                Create and manage self-sovereign identities on the blockchain.
                With user-friendly names as addresses, and more.
              </p>
            </div>
          </div>
          <div className="p-6 space-y-2 text-sm bg-gray-200 rounded-lg sm:col-start-8 sm:col-span-4 sm:text-left">
            <div className="space-y-0">
              <p className="font-light font-p">System requirements:</p>
              <p className="font-light text-navlink-hover font-p">
                Operating Systems: Android, iOS
              </p>
            </div>
            <div>
              <p className="font-light font-p">Release Notes</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => _handleModal(true)}
                className="w-1/2 py-3 mb-4 text-sm border-0 rounded-full cursor-pointer focus:outline-none bg-gray-105 md:w-full border-bluetrans-defualt hover:border-bluebutton text-bluebutton hover:bg-bluetrans-alter"
              >
                Release Notes
              </button>
            </div>
            <div>
              <p className="m-0 font-light font-p">Supported Coins:</p>
              <p className="m-0 font-light font-p">
                VRSC, BTC, KMD, LTC, ETH, .........
              </p>
            </div>
            <div>
              <p className="text-xs font-light font-p">
                This is experimental and unfinished software. Use at your own
                risk! No warranty for any kind of damage!Permission is hereby
                granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the "Software"), to
                deal in the Software without restriction, including without
                limitation the rights to use, copy, modify, merge, publish,
                distribute, sublicense, and/or sell copies of the Software, and
                to permit persons to whom the Software is furnished to do so,
                subject to the following conditions:The enclosed copyright
                notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              <p className="text-xs font-light font-p">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MarkdownModal
        modalTitle="Release Notes"
        modalShow={modalShow}
        modalToggle={_handleModal}
        modalBody={latestAndroid.body}
      />

      <div className="flex flex-row items-center justify-between p-2 md:hidden">
        {prevPath.slug ? (
          <Link href="/wallet/[slug]" as={`/wallet/${prevPath.slug}`}>
            <a className="items-center py-2 text-sm no-underline md:text-baseLink text-navlink hover:text-navlink-hover active:bg-blue-200 active:text-bluebutton">
              {' '}
              <svg
                width="8"
                height="10"
                className="rotate-180"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
                  stroke="#999"
                  strokeLinecap="square"
                ></path>
              </svg>{' '}
              &nbsp;{prevPath.name}
            </a>
          </Link>
        ) : (
          <Link href="/wallet">
            <a className="items-center py-2 text-sm no-underline md:text-baseLink text-navlink hover:text-navlink-hover active:bg-blue-200 active:text-bluebutton">
              {' '}
              <svg
                width="8"
                height="10"
                className="rotate-180"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
                  stroke="#999"
                  strokeLinecap="square"
                ></path>
              </svg>{' '}
              &nbsp;wallet Overview
            </a>
          </Link>
        )}
        {nextPath.slug ? (
          <Link href="/wallet/[slug]" as={`/wallet/${nextPath.slug}`}>
            <a className="items-center py-2 text-sm no-underline md:text-baseLink text-navlink hover:text-navlink-hover active:bg-blue-200 active:text-bluebutton">
              {nextPath.name}&nbsp;{' '}
              <svg
                width="8"
                height="10"
                viewBox="0 0 6 10"
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
        ) : null}
      </div>
    </div>
  );
};

export default MobileWallet;

export async function getServerSideProps(context) {
  let result = await fetch(
    'https://api.github.com/repos/VerusCoin/Verus-Mobile/releases'
  );
  let latestAndroid = await result.json();

  return {
    props: { latestAndroid: latestAndroid[0] },
  };
}
