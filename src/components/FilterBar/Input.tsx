const Input = (props: any) => {
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const { onEnter } = props;
      onEnter(event);
    }
  };

  return <input type="text" onKeyUp={handleKeyUp} {...props} />;
};

export default Input;
