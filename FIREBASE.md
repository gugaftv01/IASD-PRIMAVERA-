# Firebase do formulário "Ouvindo a Voz de Deus"

Os pedidos de estudo bíblico ficam guardados no Firebase, no projeto **iasd-primavera**
(banco Firestore em São Paulo). O console fica em https://console.firebase.google.com/project/iasd-primavera.

## O que já está configurado
- Projeto **IASD Primavera** (`iasd-primavera`) e o app Web do site.
- **Firestore** em `southamerica-east1` (São Paulo), com as regras do arquivo `firestore.rules`.
- **Login por e-mail e senha** ativado, com o admin `vitinhovenanciodesouza317@gmail.com`.
- A configuração do site (`var FIREBASE = {...}` no `index.html`). Ela não é segredo.

## Regras de segurança (`firestore.rules`)
- Qualquer pessoa pode **enviar** um pedido ou **atualizar** o próprio cadastro (pelo telefone).
- Só o admin pode **ler**, **marcar como contatado** e **apagar**.
- Um cadastro por telefone: a mesma pessoa não fica como "dar" e "receber" ao mesmo tempo.

## Senha do admin
Na **Área do administrador** do site, digite o e-mail e clique em **Esqueci / criar minha senha**.
O Firebase manda um e-mail com o link para criar uma senha nova.

## Ter mais de um admin
1. No console: **Authentication → Usuários → Adicionar usuário** e cadastre o e-mail.
2. No `firestore.rules`, coloque o e-mail na lista: `['admin1@gmail.com', 'admin2@gmail.com']`.
3. Publique as regras: no console, **Firestore → Regras**, cole o arquivo e clique em **Publicar**.
4. A pessoa usa **Esqueci / criar minha senha** no site para criar a própria senha.

## Onde ficam os dados
No console, em **Firestore Database → Dados**:
- `pedidos`: os cadastros (nome, telefone, tipo, dias, horários, data, contatado). O nome do documento é o telefone.
- `telefones`: só os telefones já usados e o tipo, para avisar quando alguém tenta se cadastrar de novo.
