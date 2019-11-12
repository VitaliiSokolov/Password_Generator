const sender = ([a,b,c], status) => {
  const response = Object.assign({}, [a,b,c]);
  console.log(response);
};

sender();

module.exports= sender;
