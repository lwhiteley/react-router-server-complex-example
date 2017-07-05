export default (app, type, hash) => {
  const port = parseInt(app.get('port'), 10);
  const portTxt = port === 80 ? '' : `:${port}`;
  const host = app.get('host');
  const protocol = app.get('protocol');
  return `${protocol}://${host}${portTxt}/auth/${type}/${hash}`;
};
