import Image from "next/image";

export default function Shoe({
  item,
  selectItem,
}: {
  item: any;
  selectItem: (item: any) => void;
}) {
  return (
    <div
      onClick={() => {
        selectItem(item);
      }}
      className="flex flex-row w-full mt-2 py-1 px-5 hover:bg-red-300 cursor-pointer transition-all duration-150 ease-out"
    >
      <div className="relative h-[120px] w-[150px]">
        <Image
          loader={() =>
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          src={
            item[3].includes(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/`)
              ? item[3]
              : "/placeHolderShoe.jpg"
          }
          fill
          alt={`Shoe ${item[0]} picture`}
        />
      </div>
      <div className="text-sm ml-2 my-auto">
        <p>{`Shoe ${item[0]}`}</p>
        <p>{`Name: ${item[1]}`}</p>
        <p>{`Company: ${item[2]}`}</p>
        <p>{`Price: ${item[4]}`}</p>
        <p>{`RB_Factor: ${item[5]}`}</p>
      </div>
    </div>
  );
}