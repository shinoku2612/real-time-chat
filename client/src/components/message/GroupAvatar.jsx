const GroupAvatar = ({ img1, img2, w1, h1, w2, h2 }) => {
  const classes =
    'object-center object-cover rounded-full border-2 border-white border-solid';
  return (
    <div className="relative w-full h-full">
      <img
        className={`${classes} translate-x-[-20%] ${w1 ?? 'w-8'} ${h1 ?? 'h-8'
          }`}
        src={img1}
        alt="avatar-chat"
      />
      <img
        className={`${classes} absolute left-[15%] top-0 ${w2 ?? 'w-7'} ${h2 ?? 'h-7'
          }`}
        src={img2}
        alt="avatar-chat"
      />
    </div>
  );
};

export default GroupAvatar;
