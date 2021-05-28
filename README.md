# HealthMap API
API criada utilizando Clean Architecture em NodeJS

## Clean Architecture
O projeto está estrturado de forma a contemplar os conceitos de Clean Architecture
[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
![The Clean Architecture diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Multi Tenancy
![Multi Tenancy](multi_tenant.png)

## Pastas do Projeto
- Client: pasta para inserir os arquivos da sua aplicação cliente (web, desktop ou mobile)
- Server: Projeto na arquitetura clean

### Falando mais da hierarquia da pasta SERVER

- config: arquivo de configuração da aplicação
  - Note que nesse arquivo tem a configuração do common_tenant, eu montei em Postgres, mas basta alterar o client para o banco que desejar
  - A chave mongo é pra configurar como conectar no mongo (lebrando que só implementei multi tenant para bancos SQL nesse projeto)
  - PORT a porta que o webserver irá executar
  - ENV para setar o enviroment da aplicação (Essa chave pode ser usada para fazer alguma condicional no código afim de executar somente em PRD um trecho  específico de código, por exemplo)
  - JWT chave do jwt
- data-access: essa pasta contém a lógica de conexão de cada entidade com o reespectivo banco
  - users-db: acesso aos usuários da aplicação
    - memory: como ler/adicionar/remover/atualizar dados na memória
    - mongod: como ler/adicionar/remover/atualizar dados no banco mongo
    - sql: como ler/adicionar/remover/atualizar dados em bancos SQL
  - farms...: apenas exemplos de como conectar com o mongo
- db: Lógica para conexão com o client específico do banco. Aqui vc terá como abrir a conexão com o banco (totalmente desacoplada do layer de acesso aos dados)
- drivers: Coloquei dois exemplos de drivers: console e webserver. Os drivers são as formas de consumir consumir a sua arquitetura. Vc pode listar os usuarios atraves de um restapi (webserver) ou somente listar eles através de um prompt de comando (cli)
- models: models da aplicação juntamente com suas reespectivas regras de validação

OBS: O que define qual banco usar é o arquivo index de cada pasta da data-access. Ou seja, se users-db\index.js estiver usando memory TODA sua aplicação estará lendo os users da memória... Isso permite vc ter entidades sendo acessadas em diferentes fontes de dados... Olha que foda... Totalmente invísivel pela camada de bussiness...


## Como adicionar uma rota...

1. Primeiro crie um modelo na pasta models (para ser usado no seu 'controller')
2. Na pasta drivers/webserver/routes crie uma pasta com o nome que desejar (isso seria o Controller comparando com o MVC)
3. Crie 2 arquivos nomequedesejar.js e route.js
4. No arquivo nomequedesejar.js vc coloccará sua lógica
5. No arquivo route.js vc irá configurar suas rotas (get, post, put... além da documentação swagger)
6. siga o exemplo das rotas de login ja existentes!

##  Executando a aplicação
O docker-compose criado cria os banco de dados. A aplicação (cli o u web) deverá rodar na sua máquina!

1. Iniciar containers no docker:
     - abra o prompt de commando na pasta do projeto
     - docker-compose up --build -d
2. Executar aplicação node (Aguarde uns minutos antes de subir a aplicação pois o banco de dados leva algum tempo para subir)
     - abra o prompt de commando na pasta do projeto
     - Para executar o webserver: node .\server\drivers\webserver\server.js
     - Para executar o cli: node .\server\drivers\cli\index.js
4. Be happy

Pausar os containers no docker:
docker-compose down

## API está disponibilizada através do SWAGGER
Inicie o docker e entre em http://localhost:5000/ usando o seu navegador

## Autenticar SWAGGER
A API possui duas autenticações implementadas:
     - JWT
     - Keycloak

### Para autenticar o swagger com JWT siga os passos:
 - Faça a request /login passando email e password
 - Copie o token gerado
 - Clique no botão Authorize no topo do site
 -  Digite "Bearer " e cole "[token]" 
      - exemplo: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhbmRyZUBnbWFpbC5jb20iLCJuYW1lIjoiQW5kcsOpIiwiaWF0IjoxNTkxMzk2MDIyfQ.GQNw5SPlluVc-ZLPTbf8n0OjsccziD7mfHb_6pmDpDQ"
 - Agora qualquer request realizada terá o token "Authorization" adicionado no header do request HTTP

### Para autenticar o swagger com KEYCLOAK siga os passos:
 - O docker-compose sobe uma instância "vazia" do keycloak. Desta forma é preciso criar um client para testarmos nossa autenticação.
 - Acesse http://localhost:8989
 - Keycloak console > Logue com admin/admin
 - Entre no menu "clients" e crie um novo cliente conforme a figura abaixo
     ![Keycloak client creation](keycloak_client.png)
- Salve e edite conforme a figura abaixo
     ![Keycloak client creation](keycloak_client1.png)
 - Configure o arquivo config/index.js (chave KEYCLOAK_CONFIG) com os valores do client criado anteriormente
 - Clique no cadeado no canto superior direito da request e faça login no keycloak com algum usuario
 - Execute a request...

### Requests
1. farms (obrigatório estar previamente autenticado via JWT)
2. farmndvis (obrigatório estar previamente autenticado JWT)
3. farmprecipitations (obrigatório estar previamente autenticado via JWT)
4. login
   - register (criar usuário)
   - login (retorna o token JWT de acesso) [Não precisa de autenticação]
   - auth (valida o token JWT de acesso) [É preciso existir um token no header da request para ser validado]
5. test_auth (rota para testar autenticação com keycloak)

OBS1: Hoje a aplicação não está validando se o email já existe na base... é somente um exemplo... Leve isso em consideração na hora de efetuar login pois pode dar erro se existirem dois usuários com o mesmo email!

OBS2: As requests de login obrigam a ter um header chamado "slug" que é o tenant que vc irá se conectar. As requests de farm estão em uma lista para serem ignoradas. Qualquer outra request adicionada, automaticamente, será validada com a presença do header slug.

OBS3: A documentação do swagger não é gerada automaticamente, portanto o desenvolvedor deverá adicioná-la conforme os exemplos dos arquivos routes.js já existentes.

## Conectores de Banco
A aplicação possui arquivos de conexão para 3 bancos atualmente:
- Mongo
- Memória (array em memória)
- Knex para bancos SQL (eu testei com Postgres e SQLServer...)

A conexão com o tenant_common fica no arquivo de configuração na pasta config. Essa conexão é feita para recuperar as conexões ds demais tenants.
Caso vc deseje adicionar/alterar um tenant vc precisa atualizar o banco common.

### Migrations
Execute na raiz da pasta "server" para aplicar as migrações usando knex

npm run knex "migrate:latest" "knexfile.js"

npm run knex seed:run

### Logviewer
A aplicação possui 3 "transportes de log":
- console
- file
- fluentd

O fluentd é uma ferramenta para "centralizar" logs (escalável). O fluxo de logs é:

```
app -> fluentd -> loki -> grafana
```

A visualização dos logs está sendo feita através do loki + grafana. Ambos configurados no docker-compose. Para visualizar os logs:
- Acesse o grafana http://localhost:3000
     - login/senha = admin/admin
     - configuration > datasources
     - Adicione o datasource do Loki e salve (veja imagens abaixo)
     ![Loki datasource](datasource_loki.png)
     ![Loki datasource](datasource_loki_save.png)
     - Para visualizar entre no menu "explore" e use a seguinte query {agent="fluentd"} |= "HTTP Access Log" | logfmt | url = "/boom"
     ![Grafana explore](explore_query.png)
     - Exemplos de query = https://grafana.com/docs/loki/latest/logql/


### Considerações finais
- Os bancos sqlserver e postgres demoram um pouco para ficar on no docker
- A aplicação permite que os tenant possam ser em diferentes tipos da base dados... Ou seja, vc pode ter um tenant1 rodando em Postgres um Tenant2 rodando em SqlServer... divirta-se...
- O multi tenant só está disponível para banco de dados relacionais. Fica o dever de casa para vc implementar em outros bancos...
- Feito com entusiasmo por André de Mattos Ferraz