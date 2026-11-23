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
- **Principal:** a sua conta, identificada no `firestore.rules` pelo código da conta (UID), sem o e-mail aparecer no código.
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

## Senha errada na Área do administrador
- Toda senha errada fica no painel, botão **Tentativas de login** (coleção `tentativas` no Firestore).
- O relatório por e-mail (FormSubmit) está **desligado** para o seu e-mail não aparecer no código do site.
  Para ligar sem expor o e-mail: ative o FormSubmit e use o **código (alias)** que ele manda no e-mail de confirmação
  em `var AVISO_EMAIL='...'` no `index.html`.

## Aviso de cadastro novo no WhatsApp
- No final do cadastro, a pessoa tem o botão **Enviar meus dados pelo WhatsApp**, que abre o WhatsApp dela com a mensagem pronta para o número 55 61 99889-8416.
- Envio automático (opcional, quando o CallMeBot tiver vagas):
- Cada cadastro novo (ou atualizado) manda uma mensagem organizada para o WhatsApp **55 61 99889-8416**, pelo serviço gratuito **CallMeBot**.
- Para ligar: o dono desse WhatsApp ativa o CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/)
  e coloca a chave recebida em `var WHATS_AVISO={telefone:'5561998898416',apikey:'...'}` no `index.html`.
- Sem a chave, nada é enviado (o painel continua mostrando tudo).

## Proteções do OWASP Top 10 (2025)
- **A01/A10 – Anti-robô (App Check + reCAPTCHA):** o banco só aceita pedidos que vêm do site depois da verificação do
  Google reCAPTCHA. Programas e robôs que tentam gravar direto são recusados. O selo do reCAPTCHA fica escondido e o aviso
  aparece em texto na primeira tela e na Política de privacidade.
- **A02 – Regra de segurança (CSP):** a página só carrega código e se conecta aos endereços do Firebase, do Google e do WhatsApp.
- **A03/A08 – Impressão digital (SRI):** as bibliotecas do Firebase só rodam se forem exatamente as originais.
- **A05/A08 – Dados conferidos no servidor:** nome só com letras, telefone no formato `(61) 99999-9999`, dias e horários
  só da lista do formulário, horário escrito à mão curto e sem fórmulas. A planilha do Excel também neutraliza fórmulas.
- **A07 – Login:** senha com no mínimo 8 caracteres, letra e número (o Firebase exige); senhas comuns são recusadas no
  "Alterar senha"; as mensagens não revelam se um e-mail tem conta; o admin sai sozinho depois de 1 hora sem uso.
- **A09 – Registro:** o painel **🔒 Segurança** mostra as últimas entradas no admin e cada senha errada.
- **A10 – Sem travar:** se a internet, o Firebase ou o reCAPTCHA não responderem, o formulário avisa em vez de ficar parado.
