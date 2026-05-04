# UniMatrícula

Sistema web desenvolvido para otimizar o processo de matrícula e rematrícula da Universidade de Fortaleza (Unifor), oferecendo uma experiência mais intuitiva e eficiente para alunos e professores.

---

## Sobre o Projeto

O UniMatrícula é uma proposta de melhoria do sistema de matrícula acadêmica, permitindo a visualização das disciplinas e horários por meio de uma interface organizada em formato de grade. O sistema busca facilitar tanto a escolha de disciplinas pelos alunos quanto o gerenciamento de turmas pelos professores.

---

## Objetivos

- Melhorar a usabilidade do sistema de matrícula
- Facilitar a visualização de horários
- Otimizar o gerenciamento de turmas
- Tornar o processo mais eficiente e intuitivo

---

## Público-Alvo

- Alunos
- Professores
- Coordenação acadêmica

---

## Funcionalidades

- Visualização de horários em tabela (6x8)
- Seleção de disciplinas com base na disponibilidade de horários
- Exibição de vagas disponíveis por turma
- Bloqueio de horários já ocupados
- Sistema de autenticação (login e recuperação de senha)
- Dashboard com informações do usuário
- Seções de avisos e mensagens
- Interface responsiva para desktop e dispositivos móveis

---

## Estrutura da Interface

A interface principal é composta por uma tabela onde:

- As colunas representam os horários (MAB até NCD)
- As linhas representam os dias da semana (segunda a sábado)

Cada célula corresponde a uma aula, permitindo acesso a informações detalhadas.

---

## Tecnologias Utilizadas

### Front-end

- HTML
- CSS
- React

### Back-end

- JavaScript (Node.js)
- MongoDB

---

## Equipe

- Lucas — Back-end
- Camile — Front-end
- Rayssa — Gerente do Projeto

---

## Requisitos Funcionais

O sistema deve:

- Exibir o curso do usuário
- Listar disciplinas obrigatórias e optativas
- Permitir escolha de disciplinas por preferência de horário
- Bloquear horários totalmente ocupados
- Informar períodos do dia (manhã, tarde e noite)
- Exibir tabela com horários
- Garantir matrícula em disciplinas obrigatórias
- Informar vagas disponíveis por turma
- Permitir adicionar disciplinas à grade
- Permitir salvar e cancelar matrícula
- Exibir tela de login com recuperação de senha
- Exibir mensagens de erro quando necessário
- Disponibilizar navegação por menu
- Exibir dashboard com avisos, mensagens e disciplinas
- Manter sessão ativa e segura
- Oferecer suporte a interface mobile (menu e accordion)

---

## Requisitos Não Funcionais

- Armazenamento de dados em banco de dados
- Suporte a pelo menos 700 usuários simultâneos
- Interface amigável e responsiva
- Compatibilidade com principais navegadores
- Segurança de dados conforme LGPD
- Autenticação com criptografia
- Tempo de resposta de até 2 segundos para operações CRUD
- Validação de login em até 3 segundos
- Código limpo e de fácil manutenção

---

## Modelagem do Sistema

O sistema foi estruturado com base em um Modelo Entidade-Relacionamento (MER), contemplando entidades como:

- Aluno
- Professor
- Curso
- Disciplina
- Turma

Essa modelagem garante consistência e organização dos dados.

---

## Metodologia

O projeto utiliza a metodologia ágil Kanban, permitindo a organização e acompanhamento das atividades por meio de um fluxo visual, facilitando a identificação de gargalos e a melhoria contínua do processo de desenvolvimento.

---

## Status do Projeto

Em desenvolvimento

> > > > > > > 07f8647b2605ec3d71493cb5bfe052100bce7767
