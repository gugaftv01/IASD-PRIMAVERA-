# Firebase do formulário "Ouvindo a Voz de Deus"

Os pedidos de estudo bíblico ficam guardados no Firebase, no projeto **iasd-primavera**
(banco Firestore em São Paulo). O console fica em https://console.firebase.google.com/project/iasd-primavera.

## Segurança
- **Login anônimo:** quando alguém se cadastra, o Firebase cria um login invisível para aquele aparelho.
  O cadastro fica ligado a ele: só o mesmo aparelho consegue ver e alterar o próprio cadastro.
- **Ninguém descobre quem está cadastrado:** de outro aparelho, um telefone cadastrado e um não cadastrado
  dão a mesma resposta. Se a pessoa tentar cadastrar um número que já existe, vê "fale com a igreja".
- **Só administradores** listam, marcam e apagam os pedidos (regras no arquivo `firestore.rules`).
- **Chave do Firebase travada:** só funciona a partir de `gugaftv01.github.io` e dos endereços do próprio
  Firebase, e só para os serviços que o formulário usa (Google Cloud → APIs e serviços → Credenciais).
  Se o site mudar de endereço (domínio próprio), adicione o novo endereço nessa chave.

## Administradores
- **Principal:** `vitinhovenanciodesouza317@gmail.com` (fica no `firestore.rules`).
- **Outros:** o administrador principal adiciona e remove na Área do administrador, botão **Administradores**.
  A pessoa recebe dois e-mails: um para confirmar o e-mail e outro para criar a senha.
  Só depois de confirmar o e-mail ela consegue ver os pedidos.
- **Senha:** na Área do administrador, digite o e-mail e clique em **Esqueci / criar minha senha**.
- **Atalho no celular:** abra `admin.html` no site (ou o botão **Atalho no celular** no painel) e siga as instruções.

## Onde ficam os dados
No console, em **Firestore Database → Dados**:
- `pedidos`: os cadastros. O nome do documento é o telefone.
- `admins`: os administradores extras (o nome do documento é o e-mail).

## Ainda dá para fazer (precisa de você no console)
- **App Check (reCAPTCHA):** barra robôs que tentem encher o banco de cadastros falsos.
  1. Crie uma chave reCAPTCHA v3 em https://www.google.com/recaptcha/admin com o domínio `gugaftv01.github.io`.
  2. No console do Firebase: **App Check → Apps → Site IASD Primavera → reCAPTCHA**, cole a chave secreta.
  3. Mande a chave do site para ligar o App Check no formulário.
- **Aviso por e-mail de cadastro novo:** precisa do plano pago do Firebase (Blaze). Hoje o aviso aparece como
  um número vermelho no botão **Área do administrador**, para quem já entrou como admin naquele aparelho.
