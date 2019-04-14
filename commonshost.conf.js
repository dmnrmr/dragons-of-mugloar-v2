module.exports = {
  hosts: [{
    domain: 'https://dom2.commons.host',
    root: './dist',
    fallback: {
      200: './index.html',
      404: './index.html'
    }
  }]
};
