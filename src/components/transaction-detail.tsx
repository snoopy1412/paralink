import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

// ... existing code ...
function ChainTransactionArrow() {
  return (
    <div
      className="chain-arrow-container hidden w-[180px] md:flex"
      style={{
        marginLeft: '-20px',
        marginRight: '-10px',
        marginTop: '15px'
      }}
    >
      <div className="chain-arrow">
        <svg
          viewBox="0 0 200 24"
          className="chain-arrow-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <line x1="0" y1="12" x2="190" y2="12" className="chain-arrow-line" />
        </svg>
      </div>
    </div>
  );
}

// ... existing code ...
interface TransactionDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetail({ isOpen, onClose }: TransactionDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-20px)] gap-0 rounded-[10px] p-0 md:w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-[20px] text-[14px] font-bold leading-normal text-[#121619]">
            Transaction Detail
          </DialogTitle>
        </DialogHeader>
        <div className="px-[20px] pb-[20px]">
          <div className="mb-[20px] flex h-[1px] w-full items-center gap-[10px] rounded-[10px] bg-[#F2F3F5]" />

          <div className="flex w-full flex-col gap-[20px] text-[14px]">
            <div className="flex flex-1 flex-col gap-[20px]">
              <div className="flex items-center">
                <span className="w-[100px] font-bold">Timestamp</span>
                <span className="flex-1">2024-01-01 12:00:00</span>
              </div>
              <div className="flex items-center">
                <span className="w-[100px] font-bold">From</span>
                <span className="flex-1">0x1234567890abcdef</span>
              </div>
            </div>
            <div className="grid-col-1 grid h-auto w-full gap-[100px] rounded-[10px] bg-[#F2F3F5] p-[40px] md:h-[216px] md:grid-cols-3 md:gap-0">
              <div className="flex flex-col items-center justify-center gap-[10px]">
                <Image
                  src="/images/test1.svg"
                  alt="logo"
                  width={80}
                  height={80}
                />
                <h4 className="text-[16px] font-bold leading-normal text-[#19293B]">
                  0x092..bb41
                </h4>
                <a
                  href="Tx: 0x092..bb41"
                  className="text-[12px] font-normal leading-normal text-[#0085FF]"
                >
                  Tx: 0x092..bb41
                </a>
              </div>
              {/* Arrow Animation */}
              <ChainTransactionArrow />

              <div className="flex flex-col items-center justify-center gap-[10px]">
                <Image
                  src="/images/test1.svg"
                  alt="logo"
                  width={80}
                  height={80}
                />
                <h4 className="text-[16px] font-bold leading-normal text-[#19293B]">
                  0x092..bb41
                </h4>
                <a
                  href="Tx: 0x092..bb41"
                  className="text-[12px] font-normal leading-normal text-[#0085FF]"
                >
                  Tx: 0x092..bb41
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
