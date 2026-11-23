# Ligar o formulário "Ouvindo a Voz de Deus" à Planilha Google

O site é estático (GitHub Pages) e não consegue guardar dados sozinho. Os pedidos de estudo bíblico
ficam guardados numa Planilha Google sua. A "Área do administrador" do site lê essa planilha.

Leva uns 5 minutos e é feito uma vez só.

## 1. Criar a planilha
1. Entre em https://sheets.google.com com a conta Google da igreja.
2. Crie uma planilha em branco, com o nome que quiser (ex.: **Estudos Bíblicos – IASD Primavera**).

## 2. Colar o código
1. Na planilha, clique em **Extensões → Apps Script**.
2. Apague tudo o que estiver no editor e cole todo o conteúdo do arquivo `google-apps-script.gs`.
3. Na linha `const SENHA = 'troque-esta-senha';`, troque pela senha do admin (guarde-a).
4. Clique no ícone de **disquete (Salvar)**.

## 3. Publicar
1. Clique em **Implantar → Nova implantação**.
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web**.
3. Preencha:
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e autorize com sua conta Google
   (se aparecer "O Google não verificou este app", clique em **Avançado → Acessar (não seguro)** — o app é seu).
5. Copie o **URL do app da Web** (termina com `/exec`).

## 4. Colocar o endereço no site
No `index.html`, procure a linha:

```js
var API = '';
```

e cole o endereço entre as aspas:

```js
var API = 'https://script.google.com/macros/s/XXXXXXXX/exec';
```

Pronto. As abas **Querem dar estudo** e **Querem receber estudo** são criadas sozinhas na planilha
no primeiro envio.

## Usar a Área do administrador
- No fim do site, clique em **Área do administrador** (ou abra o site com `#admin` no final do endereço).
- Digite a senha que você colocou no código.
- Você vê quem quer **receber** e quem quer **dar** estudo, com botão de WhatsApp, busca, filtro
  "A contatar / Já contatados" e botão para baixar em planilha do Excel.

## Se mudar o código depois
Depois de editar o código no Apps Script, vá em **Implantar → Gerenciar implantações → ✏️ editar →
Versão: Nova versão → Implantar**. Assim o endereço continua o mesmo.
