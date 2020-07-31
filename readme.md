# PG-TO-EXCEL

## SOBRE

pg-to-excel é uma cli escrita em JavaScript utilizando nodeJS que tem como objetivo auxiliar o registro dos dados de uma tabela em um arquivo .xlsx (extensão lida por programas de planinhas como o Excel)

**ATUALMENTE A CLI AINDA SE ENCONTRA EM FASE ALFA E, POR ESTE MOTIVO, APENAS CONTÉM A FUNÇÃO DE EXTRAIR TODOS OS DADOS DE UMA TABELA E ENVIAR PARA UM ARQUIVO .XLSX**

INÍCIO DA CLI
![Main-Screen-Print](https://github.com/Fukubi/pg-to-excel/blob/master/PrintMainScreen.PNG)

EXEMPLO DE UM ARQUIVO CRIADO PELA CLI
![Arquivo-Criado-Print](https://github.com/Fukubi/pg-to-excel/blob/master/PrintArquivoCriado.PNG)

## INSTALAÇÃO

Por utilizar o NodeJS e ter algumas bibliotecas necessárias, é necessário instalar o NodeJS e o Yarn para o programa funcionar corretamente, ambos tem uma instalação por instalador e podem ser encontradas nesses links abaixo(**É NECESSÁRIO QUE SEJA FEITA A INSTALAÇÃO DO NODEJS PRIMEIRO E DEPOIS SEJA FEITO A DO YARN**):  
-[NODEJS](https://nodejs.org/en/download/)  
-[YARN](https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable)  

Após ter instalado os dois abra o CMD (O prompt de comando só estará disponivel no windows, caso esteja no windows pode ser utilizado o windows terminal ou o PowerShell) ou o Terminal(Linux ou MacOS), clone o repositório (git clone https://github.com/Fukubi/pg-to-excel.git) e utilize o CMD ou Terminal para se mover para a pasta de clone:  
```
Caso esteja no windows
cd C:\caminho\do\clone

Caso esteja no Linux ou MacOS
cd /home/seuUsuario/caminho/do/clone
```

Após estar na pasta do clone execute os seguintes comandos:

```
yarn install
yarn link pg-to-excel
```

Após isso o comando pg-to-excel estará disponivel e poderá ser executado utilizando o comando **pg-to-excel no Terminal ou CMD**.

## EXECUÇÃO E UTILIZAÇÃO

Utilize o comando pg-to-excel no Terminal ou no CMD para iniciar a CLI (Importante verificar se o caminho do CMD ou do Terminal está na pasta onde você quer salvar o arquivo .xslx, pode-se fazer isso utilizando o comando pwd), digite o que será pedido, e entre na pasta reports criada pelo programa, lá dentro estará o arquivo com os dados preenchidos.
