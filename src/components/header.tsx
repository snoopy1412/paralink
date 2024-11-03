import Image from 'next/image';
// import ConnectWallet from './connect-wallet';
import Link from 'next/link';
import { Connected } from './connect-wallet/connected';

export default function Header() {
  return (
    <div className="container flex h-full items-center justify-between">
      <Link href="/">
        <Image src="/images/logo.svg" alt="logo" width={80} height={24} />
      </Link>
      {/* <ConnectWallet /> */}
      <Connected />
    </div>
  );
}
