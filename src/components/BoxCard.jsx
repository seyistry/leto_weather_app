function BoxCard() {
  return (
    <div className="bg-[#ECF3F8] rounded-3xl">
      <div className="flex p-6 justify-between items-center ">
        <div className="">
          <p className="text-black text-xl">Wind</p>
          <p className="text-[#A6B6BF] text-sm">Today wind speed</p>
        </div>
        <p className="text-black text-xl font-thin">12Km/h</p>
      </div>
    </div>
  );
}

export default BoxCard;
