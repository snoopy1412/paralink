import { Copy, LogOut } from 'lucide-react';
import Image from 'next/image';

export const Wallets = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/wallet/metamask.png"
            alt="wallet"
            width={20}
            height={20}
          />
          <span className="text-[14px] font-bold leading-normal text-[#242A2E]">
            EVM
          </span>
        </div>
        <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
          <div className="flex items-center gap-[5px]">
            <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
              0xe592...f1e5
            </span>
            <Copy
              size={14}
              color="#121619"
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
          <LogOut
            size={14}
            color="#121619"
            className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
          />
        </div>
        <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
          <div className="flex items-center gap-[5px]">
            <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
              0xe592...f1e5
            </span>
            <Copy
              size={14}
              color="#121619"
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
          <LogOut
            size={14}
            color="#121619"
            className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/wallet/polkadot.png"
            alt="wallet"
            width={20}
            height={20}
          />
          <span className="text-[14px] font-bold leading-normal text-[#242A2E]">
            POLKADOT
          </span>
        </div>
        <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
          <div className="flex items-center gap-[5px]">
            <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
              0xe592...f1e5
            </span>
            <Copy
              size={14}
              color="#121619"
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
          <LogOut
            size={14}
            color="#121619"
            className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
          />
        </div>
        <div className="flex w-full items-center justify-between rounded-[10px] bg-[#F2F3F5] px-[10px] py-[5px] text-[12px] font-normal leading-normal">
          <div className="flex items-center gap-[5px]">
            <span className="font-mono text-[12px] font-normal tabular-nums leading-normal text-[#242A2E]">
              0xe592...f1e5
            </span>
            <Copy
              size={14}
              color="#121619"
              className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
            />
          </div>
          <LogOut
            size={14}
            color="#121619"
            className="cursor-pointer opacity-50 transition-opacity hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};
