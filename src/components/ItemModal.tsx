"use client";

import { MouseEvent, useEffect } from "react";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import abi from "../../contract_abis/MarketPlace.json";
import CONTRACT_ADDRESSES from "../constants/Addresses.json";
import { Address } from "viem";
import TxPopup from "./TxPopup";
import CircleLoading from "@/ui/CircleLoading";

export default function ItemModal({
  item,
  showModal,
  setShowModal,
}: {
  item: any;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}) {
  const close = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal") {
      setShowModal(false);
    }
  };

  const {
    status: buyStatus,
    data: buyHash,
    isPending: buyPending,
    writeContract: buyShoe,
  } = useWriteContract();

  const handleBuy = () => {
    try {
      buyShoe({
        abi: abi,
        address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
        functionName: "buy",
        args: [item[0]],
        value: item[4],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (buyStatus === "success") {
      setTimeout(() => {
        setShowModal(false);
      }, 10000);
    }
  }, [buyStatus]);

  return (
    <>
      {showModal ? (
        <div
          id="modal"
          className="fixed inset-0 bg-opacity backdrop-blur-sm flex justify-center items-center"
          onClick={close}
        >
          <div className="relative w-[700px] h-[450px] flex flex-row p-5 rounded-lg bg-black justify-around items-center">
            <div className="w-[300px] h-[270px] relative border-white border-2">
              <Image
                loader={() =>
                  item[3].includes(
                    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                  )
                    ? item[3]
                    : "/placeHolderShoe.jpg"
                }
                src={
                  item[3].includes(
                    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`
                  )
                    ? item[3]
                    : "/placeHolderShoe.jpg"
                }
                alt="Image from IPFS"
                fill
              />
            </div>
            <div className="w-1/3 text-white space-y-3">
              <p className="text-xl">{`Shoe ${item[0]}`}</p>
              <p>{`Name: ${item[1]}`}</p>
              <p>{`Company: ${item[2]}`}</p>
              <p>{`Price: ${Number(item[4]) / 10 ** 18} ETH`}</p>
              <p>{`RB_Factor: ${Number(item[5]) / 10 ** 18}`}</p>
              <p>{`Quantity: ${item[6]}`}</p>
              <button className="buyButton" onClick={handleBuy}>
                {buyPending ? (
                  <div className="flex justify-center items-center h-6 w-full">
                    <CircleLoading />
                  </div>
                ) : (
                  "BUY ITEM"
                )}
              </button>
            </div>
            <div
              className="absolute right-3 top-0 text-white text-2xl cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            >
              x
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <TxPopup hash={buyHash} status={buyStatus} />
    </>
  );
}
