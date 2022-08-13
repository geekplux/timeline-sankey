export const LeftButton = (props: any) => (
  <button className="w-14" {...props}>
    <i
      style={{
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 8.6px 5px 0',
        borderColor: 'transparent #fff transparent transparent'
      }}
    />
  </button>
);

export const RightButton = (props: any) => (
  <button className="w-14" {...props}>
    <i
      style={{
        display: 'block',
        float: 'right',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8.6px',
        borderColor: 'transparent transparent transparent #fff'
      }}
    />
  </button>
);
