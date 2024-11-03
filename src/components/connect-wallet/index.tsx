import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ConnectWallet() {
  return (
    <Button className="gap-[5px] bg-white text-black">
      <Image
        src="/images/connect-wallet.svg"
        alt="wallet"
        width={18.64}
        height={18}
      />
      <span className="text-[14px] font-normal leading-[24px]">
        Connect Wallet
      </span>
    </Button>
  );
}
