'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RecipientModal } from './recipient-modal';
import { cn } from '@/lib/utils';

interface AddressInputProps {
  value: string;
  onChange: (address: string) => void;
  onEdit: () => void;
}

export function AddressInput({ value, onEdit }: AddressInputProps) {
  const [address, setAddress] = useState(
    '1MTL5H3zHv2FqWuaEqi42W1MTL5H3zHv2FqWu1MTL5H3zHv2FqWuaEqi42W1MTL5H3zHv2FqWu'
  );
  const [isOpen, setIsOpen] = useState(false);
  function handleEdit() {
    setIsOpen(true);
  }
  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-between gap-[10px] rounded-[10px] bg-[#F2F3F5] p-[10px] transition-opacity hover:opacity-80"
        onClick={handleEdit}
      >
        <span
          title={address}
          className={cn(
            'truncate font-mono text-[14px] font-normal tabular-nums text-[#12161950]',
            address && 'text-[#242A2E]',
            address && 'font-bold',
            address && 'font-mono tabular-nums'
          )}
        >
          {address ? address : 'Enter Recipient Address'}
        </span>
        <span className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center">
          <Image src="/images/edit.svg" alt="edit" width={16} height={16} />
        </span>
      </div>
      <RecipientModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={() => {}}
      />
    </>
  );
}
