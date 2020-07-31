const { Pool, Client } = require('pg')
const excel = require('excel4node')

const command = {
  name: 'pg-to-excel',
  run: async toolbox => {

    //Inicializando variáveis

    const { filesystem, print: { info }, prompt } = toolbox

    var sqlString = `SELECT * FROM information_schema.columns
WHERE table_name = $1;`;

    var query = ``;

    var tableName = "";

    var continuar = "Sim";

    const logo = `    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@///////////////////////////////////@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 // //@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 //   ///@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 //      //@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 //        ///@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 //           //@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                 //             ///@@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                  //////////////////@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%     %%%%%%%%     %%%%%%%,,,, ,,,,,,,,,,  ,,,,,,,,,,     //@@@@@@
    @@@@@@@%%%%%%%%%%    %%%%%%    %%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%%%%     %%    %%%%%%%%%%%,,,, ,,,,,,,,,,  ,,,,,,,,,,     //@@@@@@
    @@@@@@@%%%%%%%%%%%%%        %%%%%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%%%%%%%     #%%%%%%%%%%%%%,,,, ,,,,,,,,,,  ,,,,,,,,,,     //@@@@@@
    @@@@@@@%%%%%%%%%%%%,   *    %%%%%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%%%%    %%%     %%%%%%%%%%,,,, ,,,,,,,,,,  ,,,,,,,,,,     //@@@@@@
    @@@@@@@%%%%%%%%%     %%%%%%    %%%%%%%%%                                //@@@@@@
    @@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%,,,, ,,,,,,,,,,  ,,,,,,,,,,     //@@@@@@
    @@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                //@@@@@@
    @@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                                //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@//                                                  //@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`

    //Imprimindo o início do arquivo
    info('Criando arquivo .xslx')
    info(logo)
    info('')

    //Pedindo as informações do banco de dados para o usuário
    const askUser = { type: 'input', name: 'user', message: 'Digite o usuário do banco de dados PostgreSQL' }
    const { user } = await prompt.ask(askUser);
    info('')

    const askUrl = { type: 'input', name: 'url', message: 'Digite a url do banco de dados PostgreSQL (EX.: localhost, 192.168.0.2)' }
    const { url } = await prompt.ask(askUrl);
    info('')

    const askDB = { type: 'input', name: 'db', message: 'Digite o nome do banco de dados' }
    const { db } = await prompt.ask(askDB);
    info('')

    const askPassword = { type: 'password', name: 'password', message: 'Digite a senha do banco de dados PostgreSQL' }
    const { password } = await prompt.ask(askPassword);
    info('')

    const askPort = { type: 'input', name: 'port', message: 'Digite a porta do banco de dados PostgreSQL (EX.: 5432, 1921)' }
    const { port } = await prompt.ask(askPort);
    info('')

    //Conectando com o banco de dados
    const client = new Client({
      user: user,
      host: url,
      database: db,
      password: password,
      port: Number(port),
    })
    client.connect()

    /*const askTabQuant = { type: 'input', name: 'quantity', message: 'Digite a quantidade de tabelas que serão utilizadas' }
    const { quantity } = await prompt.ask(askTabQuant);
    info('')

    async function arquivoTabelaUnica(column_name) {

    }*/

    //Criando diretório reports
    filesystem.dir('reports/');

    //Verificando se a quantidade de tabelas é 1
    //if (Number(quantity) === 1) {
    const sqlStringA = `SELECT * FROM information_schema.columns
      WHERE table_name = $1;`;

    //Pedindo nome da tabela do banco de dados
    const askTabOne = { type: 'input', name: 'tabela', message: 'Digite o nome da tabela a ser inserida como .xlsx' }
    const { tabela } = await prompt.ask(askTabOne);
    tableName = tabela;
    info('')

    await client.query(sqlStringA, [tableName], async (sqlErr, res) => {
      //Inicializando o novo workbook do excel
      var worksheet = new excel.Workbook();

      //Inicializando o worksheet com o nome lista
      var ws1 = worksheet.addWorksheet('Lista');

      await res.rows.forEach(async function (value, indexColumn) {

        ws1.cell(1, indexColumn + 1).string(value.column_name)

        //Fazendo a query no banco de dados
        const sqlString = `SELECT ${value.column_name} FROM ${tableName};`;

        try {
          const response = await client.query(sqlString)
          if (!response.rows) {

          } else {
            response.rows.forEach((valueRow, indexRow) => {
              ws1.cell(indexRow + 2, indexColumn + 1).string(JSON.stringify(valueRow))

              
            })
          }

          ws1.cell(2, res.rows.length + 2).string(`Quantidade de valores: ${response.rows.length}`)
          worksheet.write('reports/Reporte.xlsx')
        } catch (err) {
          console.log(err.stack)
        }
      })
    })

    /*} else {
      let tabelas = []
      const askTabName = { type: 'input', name: 'tabelasName', message: 'Digite o nome da tabela a ser inserida no .xlsx' }
      const { tabelasName } = await prompt.ask(askTabName);
      info('')

      tabelas.push(tabelasName)

      while (continuar === "Sim") {
        const askContinuar = { type: 'select', name: 'tabelasContinuar', message: 'Deseja continuar a inserir mais tabelas?', choices: ["Sim", "Não"] }
        const { tabelasContinuar } = await prompt.ask(askContinuar);
        info('')

        const askTabWhile = { type: 'input', name: 'tabelasName', message: 'Digite a quantidade de tabelas que serão utilizadas' }
        const { tabelasName } = await prompt.ask(askTabWhile);
        info('')

        tabelas.push(tabelasName)

        info(tabelas)

        continuar = tabelasContinuar
      }

      const askTab = { type: 'input', name: 'tabelasName', message: 'Digite a quantidade de tabelas que serão utilizadas' }
      const { tabela } = await prompt.ask(askTab);
      info('')

      tabelas.forEach(function (tab, indice) {
        client.query(`SELECT * from ${tab}`, (err, res) => {

          var worksheet = new excel.Workbook();

          var ws1 = worksheet.addWorksheet('Lista');
          res.fields.forEach(function (item, index) {

            ws1.cell(index + 1, 1)
              .string(item.name);

            worksheet.write('reports/ExcelFile.xlsx');

          })
          console.log()
          client.end()
        })
      })

    }*/

  }
}

module.exports = command
