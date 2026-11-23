# Ligar o formulário "Ouvindo a Voz de Deus" ao Firebase

Os pedidos de estudo bíblico ficam guardados no Firebase (banco de dados Firestore).
A "Área do administrador" do site lê esses pedidos depois que você entra com e-mail e senha.

Leva uns 10 minutos e é feito uma vez só. O plano gratuito do Firebase (Spark) é suficiente.

## 1. Criar o projeto
1. Entre em https://console.firebase.google.com com a conta Google da igreja.
2. Clique em **Criar um projeto** (ex.: `iasd-primavera`). O Google Analytics pode ficar desligado.

## 2. Criar o banco de dados
1. No menu da esquerda: **Criação → Firestore Database → Criar banco de dados**.
2. Local: `southamerica-east1 (São Paulo)`.
3. Escolha **Iniciar no modo de produção**.
4. Abra a aba **Regras**, apague tudo, cole todo o conteúdo do arquivo `firestore.rules` e
   troque `SEU-EMAIL-DE-ADMIN@gmail.com` pelo seu e-mail de admin. Clique em **Publicar**.

## 3. Criar o login do admin
1. No menu: **Criação → Authentication → Vamos começar**.
2. Em **Método de login**, ative **E-mail/senha**.
3. Na aba **Usuários**, clique em **Adicionar usuário** e cadastre o e-mail de admin
   (o mesmo das regras) e uma senha.
   Para ter mais de um admin, cadastre outros usuários e coloque todos os e-mails na lista das regras:
   `['admin1@gmail.com', 'admin2@gmail.com']`.

## 4. Pegar a configuração do site
1. Clique na engrenagem ⚙️ → **Configurações do projeto**.
2. Em **Seus apps**, clique no ícone **</>** (Web), dê um nome (ex.: `site`) e clique em **Registrar app**.
3. Vai aparecer um código com `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
   Copie esse bloco. Ele não é segredo, pode ir no site.

## 5. Colocar no site
No `index.html`, procure a linha:

```js
var FIREBASE = null;
```

e troque pelo bloco copiado, assim:

```js
var FIREBASE = {
  apiKey: "...",
  authDomain: "iasd-primavera.firebaseapp.com",
  projectId: "iasd-primavera",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## 6. Permitir o endereço do site no login
Em **Authentication → Configurações → Domínios autorizados**, clique em **Adicionar domínio** e coloque
`gugaftv01.github.io`.

## Usar a Área do administrador
- No fim do site, clique em **Área do administrador** (ou abra o site com `#admin` no final do endereço).
- Entre com o e-mail e a senha do passo 3.
- Você vê quem quer **receber** estudo e os **voluntários**, com botão de WhatsApp, busca, filtro
  "A contatar / Já contatados" e um botão para baixar tudo numa planilha do Excel.

## Onde ficam os dados
No Firebase, em **Firestore Database → Dados**:
- `pedidos`: os cadastros (nome, telefone, dias, horários, data, contatado).
- `telefones`: só a lista de telefones já usados, para avisar quando alguém tenta se cadastrar de novo.

Para liberar um telefone (por exemplo, se a pessoa errou algo e quer mandar de novo), apague o documento dele
nas duas coleções, `pedidos` e `telefones`.
