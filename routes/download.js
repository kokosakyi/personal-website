

const path = require('path'); // NodeJS Package for file paths

module.exports = (router) => {

  /* ===============================================================
     DOWNLOAD PFA 2D PRO
  =============================================================== */
  router.get('/pfa', (req, res) => {
   res.download(path.join(__dirname, '..', '/downloads/PFA-Pro Setup.zip'), 'PFA-Pro Setup.zip');  
  });
  /* ===============================================================
     DOWNLOAD UNGERGRAD PDF
  =============================================================== */
  router.get('/undergradReport', (req, res) => {
    res.download(path.join(__dirname, '..', '/downloads/Undergrad report.zip'), 'Undergrad report.zip');
  });
  return router;
}