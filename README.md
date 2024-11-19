```markdown
# fast-feet-api :truck:

A `fast-feet-api` é uma API RESTful para gerenciar entregadores, recebedores e encomendas, construída com **NestJS**, **TypeScript** e **Prisma**. 

Com ela, você pode realizar operações CRUD completas em cada entidade e fazer upload de fotos para confirmar as entregas. :camera:

A aplicação é testada com **Jest** e containerizada com **Docker** para facilitar o desenvolvimento e a implantação. :whale:

---

## :rocket: Funcionalidades

* **Gerenciamento de entregadores:** Cadastro, consulta, atualização e exclusão de entregadores.
* **Gerenciamento de recebedores:** Cadastro, consulta, atualização e exclusão de recebedores.
* **Gerenciamento de encomendas:** Cadastro, consulta, atualização e exclusão de encomendas.
* **Upload de fotos:** Permite o upload de fotos para confirmar a entrega das encomendas. :camera:
* **Confirmação de entrega:** As encomendas só podem ser marcadas como "entregue" após o envio da foto comprovando a entrega. :white_check_mark:

---

## :computer: Tecnologias utilizadas

* **NestJS:** Framework para construção de aplicações escaláveis e testáveis no Node.js.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática e outros recursos.
* **Prisma:** ORM para comunicação com o banco de dados PostgreSQL.
* **PostgreSQL:** Banco de dados relacional.
* **Jest:** Framework de testes.
* **Docker:** Para containerizar a aplicação.

---

## :wrench: Como usar

### :arrow_down: Instalação

**Requisitos:**

* Docker
* Node.js (versão >= 16.x.x recomendada)
* npm ou yarn

**Passo 1:** Clone o repositório:

```bash
git clone [https://github.com/seu-usuario/fast-feet-api.git](https://github.com/seu-usuario/fast-feet-api.git)
cd fast-feet-api
```

**Passo 2:** Configure o ambiente:

* **2.1 Docker:**

```bash
docker-compose up --build
```

* **2.2 Banco de dados (Prisma):**

```bash
docker-compose exec backend npx prisma migrate dev
```

* **2.3 Dependências:**

```bash
npm install
# ou
yarn install
```

**Passo 3:** Rode a aplicação:

```bash
npm run start:dev
# ou
yarn start:dev
```

Acesse a API em `http://localhost:3333` ou no endereço configurado no `docker-compose.yml`.

---

## :test_tube: Testes

```bash
npm test
# ou
yarn test
```

---

## :handshake: Contribuindo

* Faça um fork do repositório.
* Crie uma branch para suas alterações (`git checkout -b minha-branch`).
* Faça commit das suas alterações (`git commit -am 'Adiciona uma nova funcionalidade'`).
* Envie para o repositório remoto (`git push origin minha-branch`).
* Abra um pull request explicando suas alterações.

---

## :scroll: Licença

Este projeto está sob a licença MIT.
```

**Melhorias:**

* Adicionei emojis para ilustrar as funcionalidades e seções.
* Usei títulos e subtítulos para organizar o conteúdo.
* Incluí links para as tecnologias utilizadas.
* Melhorei a formatação do código.
* Adicionei badges (se desejar, crie badges personalizados no [Shields.io](https://shields.io/) para o seu projeto).

Lembre-se de substituir `seu-usuario` pelo seu nome de usuário do GitHub. :wink:
