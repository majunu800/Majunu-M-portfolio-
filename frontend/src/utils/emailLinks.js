export const getGmailComposeUrl = (email) => {
  const address = email.replace(/^mailto:/i, '');
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
};
