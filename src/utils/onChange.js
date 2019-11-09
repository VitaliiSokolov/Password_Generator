// setState inputs onChange
function handleOnChangeMin(e, fnx){
  const min = Number(e);
  fnx(min);
}
function handleOnChangeMax(e, fnx){
  const max = Number(e);
  fnx(max);
}
function handleOnChangeSpecial(e, fnx){
  fnx(e);
}
function handleOnChangeTitle(e, fnx){
  const title = e.toString();
  fnx(title);
}
function handleOnChangeValue(e, fnx){
  const value = e.toString();
  fnx(value);
}

module.exports = { handleOnChangeMin, handleOnChangeMax, handleOnChangeSpecial, handleOnChangeTitle, handleOnChangeValue };
