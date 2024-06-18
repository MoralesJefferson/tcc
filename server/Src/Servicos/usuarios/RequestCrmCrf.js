const puppeteer = require('puppeteer');

async function buscarMedico(crm, uf) {
  
  console.log('Iniciando busca...');

  const url = `https://portal.cfm.org.br/busca-medicos/`;

  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector('form#buscaForm');
  await page.type('form#buscaForm .col-md-3 .form-group .form-control[name="crm"]', crm);
  
  

  await page.select('form#buscaForm .col-md-3 .form-group #uf', uf);
 
  

  await page.evaluate(() => {
    document.querySelector('form#buscaForm button[type="submit"]').click();
  });

  await page.waitForSelector('.card-body');

  const medico = await page.evaluate(() => {
    const nome = document.querySelector('.card-body h4').textContent;

    const crmData = {};
    document.querySelectorAll('.card-body .row .col-md-4').forEach((item) => {
      const [chave, valor] = item.textContent.split(':');
      crmData[chave.trim()] = valor.trim();
    });

    let especialidade;
    document.querySelectorAll('.card-body .row .col-md-12').forEach((item, i) => {
      if ("Especialidades/Áreas de Atuação:".trim().toLowerCase() === item.textContent.trim().toLowerCase()) {
        especialidade = document.querySelectorAll('.card-body .row .col-md-12')[i + 1].textContent;
      }
    });

    const [chave, valor] = document.querySelector('.card-body .row .col-md').textContent.split(':');
    const situacao = valor.trim();

    return {
      msg:"nova",
      nome:nome,
      crm: crmData,
      'Especialidades/Áreas de Atuação': especialidade,
      situacao,
    };
  });

  
  await browser.close();

  return medico;
}

// Exemplo de uso


module.exports = buscarMedico;
